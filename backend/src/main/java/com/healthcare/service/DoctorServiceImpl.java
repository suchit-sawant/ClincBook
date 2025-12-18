package com.healthcare.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.ApiException;
import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.DoctorDTO;
import com.healthcare.dto.DoctorRegDTO;
import com.healthcare.dto.PatientDTO;
import com.healthcare.dto.UserReqDTO;
import com.healthcare.entities.Appointment;
import com.healthcare.entities.Doctor;
import com.healthcare.entities.Patient;
import com.healthcare.entities.UserRole;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
	private final DoctorRepository doctorRepository;
	private final UserRepository userRepository;
	private final AppointmentRepository appointmentRepository;
	private final ModelMapper mapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public List<DoctorDTO> getAllDoctors() {
		return doctorRepository.findAll().stream()
				.filter(doctor -> doctor.isVerified())
				.map(doctor -> {
					DoctorDTO dto = new DoctorDTO();
					dto.setDoctorId(doctor.getId());
					dto.setSpeciality(doctor.getSpeciality());
					dto.setExperienceInYears(doctor.getExperienceInYears());
					dto.setQualifications(doctor.getQualifications());
					dto.setFees(doctor.getFees());
					UserReqDTO userDTO = new UserReqDTO();
					userDTO.setFirstName(doctor.getUserDetails().getFirstName());
					userDTO.setLastName(doctor.getUserDetails().getLastName());
					if (doctor.getUserDetails().getImage() != null) {
						userDTO.setImage(java.util.Base64.getEncoder().encodeToString(doctor.getUserDetails().getImage()));
					}
					dto.setUserDetails(userDTO);
					return dto;
				})
				.collect(Collectors.toList());
	}

	@Override
	public DoctorDTO getDoctorById(Long userId) {
		Doctor doctor = doctorRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ApiException("Doctor not found for user ID: " + userId));
		DoctorDTO dto = new DoctorDTO();
		dto.setDoctorId(doctor.getId());
		dto.setSpeciality(doctor.getSpeciality());
		dto.setExperienceInYears(doctor.getExperienceInYears());
		dto.setQualifications(doctor.getQualifications());
		dto.setFees(doctor.getFees());
		dto.setAddress(doctor.getAddress());
		UserReqDTO userDTO = new UserReqDTO();
		userDTO.setFirstName(doctor.getUserDetails().getFirstName());
		userDTO.setLastName(doctor.getUserDetails().getLastName());
		userDTO.setEmail(doctor.getUserDetails().getEmail());
		userDTO.setPhone(doctor.getUserDetails().getPhone());
		userDTO.setDob(doctor.getUserDetails().getDob());
		userDTO.setRegAmount(doctor.getUserDetails().getRegAmount());
		userDTO.setPassword(null);
		if (doctor.getUserDetails().getImage() != null) {
			userDTO.setImage(java.util.Base64.getEncoder().encodeToString(doctor.getUserDetails().getImage()));
		}
		dto.setUserDetails(userDTO);
		return dto;
	}

	@Override
	@Transactional
	public ApiResponse registerNewDoctor(DoctorRegDTO reqDTO) {
		if(userRepository.existsByEmail(reqDTO.getUserDetails().getEmail()))
			throw new ApiException("Email already exists!");
		Doctor entity = mapper.map(reqDTO, Doctor.class);
		entity.getUserDetails().setPassword(passwordEncoder.encode(
				entity.getUserDetails().getPassword()));
		entity.getUserDetails().setRole(UserRole.ROLE_DOCTOR);
		Doctor persistentEntity = doctorRepository.save(entity);
		return new ApiResponse("New Doctor Registered with ID=" + persistentEntity.getId(), "Success");
	}

	@Override
	@Transactional
	public ApiResponse updateDoctor(Long userId, DoctorDTO dto) {
		Doctor doctor = doctorRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ApiException("Doctor not found for user ID: " + userId));
		doctor.setSpeciality(dto.getSpeciality());
		doctor.setExperienceInYears(dto.getExperienceInYears());
		doctor.setQualifications(dto.getQualifications());
		doctor.setFees(dto.getFees());
		doctor.setAddress(dto.getAddress());
		doctor.getUserDetails().setFirstName(dto.getUserDetails().getFirstName());
		doctor.getUserDetails().setLastName(dto.getUserDetails().getLastName());
		doctor.getUserDetails().setPhone(dto.getUserDetails().getPhone());
		if (dto.getUserDetails().getImage() != null) {
			doctor.getUserDetails().setImage(java.util.Base64.getDecoder().decode(dto.getUserDetails().getImage()));
		}
		return new ApiResponse("Doctor profile updated successfully", "Success");
	}

	@Override
	public List<PatientDTO> getDoctorPatients(Long userId) {
		try {
			Doctor doctor = doctorRepository.findByUserDetailsId(userId)
					.orElseThrow(() -> new ApiException("Doctor not found for user ID: " + userId));
			List<Appointment> appointments = appointmentRepository.findAll().stream()
					.filter(apt -> apt.getMyDoctor() != null && apt.getMyDoctor().getId().equals(doctor.getId()))
					.toList();
			Map<Long, Patient> uniquePatients = appointments.stream()
					.map(apt -> apt.getMyPatient())
					.filter(patient -> patient != null && patient.getUserDetails() != null)
					.collect(Collectors.toMap(Patient::getId, p -> p, (p1, p2) -> p1));
			return uniquePatients.values().stream()
					.map(patient -> {
						PatientDTO dto = new PatientDTO();
						dto.setId(patient.getId());
						dto.setGender(patient.getGender());
						dto.setBloodGroup(patient.getBloodGroup());
						dto.setAddress(patient.getAddress());
						dto.setFamilyHistory(patient.getFamilyHistory());
						UserReqDTO userDTO = new UserReqDTO();
						userDTO.setFirstName(patient.getUserDetails().getFirstName());
						userDTO.setLastName(patient.getUserDetails().getLastName());
						userDTO.setEmail(patient.getUserDetails().getEmail());
						userDTO.setPhone(patient.getUserDetails().getPhone());
						dto.setUserDetails(userDTO);
						return dto;
					})
					.toList();
		} catch (Exception e) {
			e.printStackTrace();
			throw new ApiException("Error fetching doctor patients: " + e.getMessage());
		}
	}
}
