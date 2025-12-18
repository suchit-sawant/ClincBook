package com.healthcare.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.ApiException;
import com.healthcare.custom_exceptions.InvalidInputException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.AppointmentRespDTO;
import com.healthcare.dto.AppointmentmentRequest;
import com.healthcare.dto.MarkCompleteDTO;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.Doctor;
import com.healthcare.entities.Patient;
import com.healthcare.entities.Status;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
	// dependency
	private final AppointmentRepository appointmentRepository;
	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;
	

	@Override
	public AppointmentRespDTO bookAppointment(AppointmentmentRequest dto) {
		// 1. Get Doctor ref from its doc id (validate)
		Doctor doctor = doctorRepository.findById(dto.getDoctorId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor ID!!!!!"));
		// 2. Check if appointment TS available
		// assumption : TS=30mins
		LocalDateTime start = dto.getAppointmentDateTime().minusMinutes(30);
		LocalDateTime end = dto.getAppointmentDateTime().plusMinutes(30);
		if (!appointmentRepository.existsByMyDoctorIdAndAppointmentDateTimeBetweenAndStatus(dto.getDoctorId(), start,
				end, Status.SCHEDULED)) {
			// =>TS available
			// 3. Get Patient ref from its patient id
			Patient patient = patientRepository.findById(dto.getPatientId())
					.orElseThrow(() -> new ResourceNotFoundException("Invalid Patient ID!!!!!"));
			// 4. Create appointment entity -> establish associations -> save the entity
			Appointment appointment = new Appointment();
			appointment.setAppointmentDateTime(dto.getAppointmentDateTime());
			appointment.setReason(dto.getReason());
			// Appointment * ------> 1 Doctor (uni dir association)
			appointment.setMyDoctor(doctor);
			// Appointment * ------> 1 Patient (uni dir association)
			appointment.setMyPatient(patient);
			// appointment - TRANSIENT
			Appointment persistentEntity = appointmentRepository.save(appointment);
			// 5. Create & return DTO resp
			AppointmentRespDTO respDTO = new AppointmentRespDTO();
			respDTO.setId(persistentEntity.getId());
			respDTO.setAppointmentDateTime(persistentEntity.getAppointmentDateTime());
			respDTO.setDoctorName(doctor.getUserDetails().getFirstName() + " " + doctor.getUserDetails().getLastName());
			respDTO.setSpeciality(doctor.getSpeciality());
			respDTO.setStatus(persistentEntity.getStatus().toString());
			respDTO.setReason(dto.getReason());
			respDTO.setFees(doctor.getFees());
			return respDTO;
		}
		throw new ApiException("Appointment un available!!!!!");

	}

	@Override
	public List<AppointmentRespDTO> getPatientUpcomingAppointments(Long userId) {
		// 1. invoke dao's method & return list of DTOs to the caller.
		List<Appointment> appointments = appointmentRepository.listPatientsAppointments(userId);
		return appointments.stream().map(apt -> {
			AppointmentRespDTO dto = new AppointmentRespDTO();
			dto.setId(apt.getId());
			dto.setAppointmentDateTime(apt.getAppointmentDateTime());
			dto.setDoctorName(apt.getMyDoctor().getUserDetails().getFirstName() + " " + apt.getMyDoctor().getUserDetails().getLastName());
			dto.setSpeciality(apt.getMyDoctor().getSpeciality());
			dto.setStatus(apt.getStatus().toString());
			dto.setReason(apt.getReason());
			dto.setFees(apt.getMyDoctor().getFees());
			return dto;
		}).toList();
	}

	@Override
	public ApiResponse markComplete(Long appointmentId, MarkCompleteDTO dto) {
		// 1. validate appointment id & status-SCHEDULED (only scheduled appointments can be marked a completed !)
		Appointment appointment=appointmentRepository.findById(appointmentId).orElseThrow(() -> new ResourceNotFoundException("Invalid appointment ID !"));
		//appointment : PERSISTENT
		//2. validate status
		if(appointment.getStatus() != Status.SCHEDULED)
			throw new InvalidInputException("Only Scheduled appointments can be marked as complete !!!!");
		//3. Validate doctor id
		Doctor doctor = doctorRepository.findById(dto.getPrescribedByDoctorId())
				.orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor ID!!!!!"));
		//4. all valid inputs  - mark appointment status - complete
		appointment.setStatus(Status.COMPLETED);
		//5 . Add patient tests - many-many 
				
		return new ApiResponse("Appointment ID "+appointmentId+"  Completed & tests prescribed ", "Success");
	}

	@Override
	public ApiResponse cancelAppointment(Long appointmentId) {
		Appointment appointment = appointmentRepository.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid appointment ID!"));
		if (appointment.getStatus() != Status.SCHEDULED)
			throw new InvalidInputException("Only scheduled appointments can be cancelled!");
		appointment.setStatus(Status.CANCELLED);
		return new ApiResponse("Appointment cancelled successfully", "Success");
	}

	@Override
	@Transactional
	public ApiResponse rescheduleAppointment(Long appointmentId, AppointmentmentRequest dto) {
		Appointment appointment = appointmentRepository.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid appointment ID!"));
		if (appointment.getStatus() != Status.SCHEDULED)
			throw new InvalidInputException("Only scheduled appointments can be rescheduled!");
		LocalDateTime start = dto.getAppointmentDateTime().minusMinutes(30);
		LocalDateTime end = dto.getAppointmentDateTime().plusMinutes(30);
		long conflictCount = appointmentRepository.findAll().stream()
				.filter(apt -> apt.getMyDoctor().getId().equals(appointment.getMyDoctor().getId()))
				.filter(apt -> apt.getStatus() == Status.SCHEDULED)
				.filter(apt -> !apt.getId().equals(appointmentId))
				.filter(apt -> !apt.getAppointmentDateTime().isBefore(start) && !apt.getAppointmentDateTime().isAfter(end))
				.count();
		if (conflictCount == 0) {
			appointment.setAppointmentDateTime(dto.getAppointmentDateTime());
			return new ApiResponse("Appointment rescheduled successfully", "Success");
		}
		throw new ApiException("New time slot is not available!");
	}

	@Override
	public List<AppointmentRespDTO> getDoctorAppointments(Long userId) {
		try {
			Doctor doctor = doctorRepository.findByUserDetailsId(userId)
					.orElseThrow(() -> new ResourceNotFoundException("Doctor not found for user ID: " + userId));
			List<Appointment> appointments = appointmentRepository.findAll().stream()
					.filter(apt -> apt.getMyDoctor() != null && apt.getMyDoctor().getId().equals(doctor.getId()))
					.toList();
			return appointments.stream()
					.filter(apt -> apt.getMyPatient() != null && apt.getMyPatient().getUserDetails() != null)
					.map(apt -> {
						AppointmentRespDTO dto = new AppointmentRespDTO();
						dto.setId(apt.getId());
						dto.setAppointmentDateTime(apt.getAppointmentDateTime());
						dto.setPatientName(apt.getMyPatient().getUserDetails().getFirstName() + " " + apt.getMyPatient().getUserDetails().getLastName());
						dto.setStatus(apt.getStatus().toString());
						dto.setReason(apt.getReason());
						return dto;
					}).toList();
		} catch (Exception e) {
			e.printStackTrace();
			throw new ApiException("Error fetching doctor appointments: " + e.getMessage());
		}
	}

	@Override
	public ApiResponse completeAppointment(Long appointmentId) {
		Appointment appointment = appointmentRepository.findById(appointmentId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid appointment ID!"));
		if (appointment.getStatus() != Status.SCHEDULED)
			throw new InvalidInputException("Only scheduled appointments can be marked as complete!");
		appointment.setStatus(Status.COMPLETED);
		return new ApiResponse("Appointment marked as completed", "Success");
	}

}
