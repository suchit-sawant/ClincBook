package com.healthcare.service;

import java.util.List;

import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.AppointmentRespDTO;
import com.healthcare.dto.AppointmentmentRequest;
import com.healthcare.dto.MarkCompleteDTO;

public interface AppointmentService {

	AppointmentRespDTO bookAppointment(AppointmentmentRequest dto);

	List<AppointmentRespDTO> getPatientUpcomingAppointments(Long patientId);

	ApiResponse markComplete(Long appointmentId, MarkCompleteDTO dto);

	ApiResponse cancelAppointment(Long appointmentId);

	ApiResponse rescheduleAppointment(Long appointmentId, AppointmentmentRequest dto);

	List<AppointmentRespDTO> getDoctorAppointments(Long userId);

	ApiResponse completeAppointment(Long appointmentId);

}
