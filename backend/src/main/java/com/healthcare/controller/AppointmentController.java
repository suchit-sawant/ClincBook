package com.healthcare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dto.AppointmentmentRequest;
import com.healthcare.dto.MarkCompleteDTO;
import com.healthcare.service.AppointmentService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
@Validated
public class AppointmentController {
	// dependency - ctor based D.I
	private final AppointmentService appointmentService;


	@PostMapping
	public ResponseEntity<?> bookPatientAppointment(@RequestBody AppointmentmentRequest dto) {
		System.out.println("book appointment " + dto);
		
			// invoke appointment service layer method
			return ResponseEntity.status(HttpStatus.CREATED) // SC 201
					.body(appointmentService.bookAppointment(dto));
		
	}

	
	@PreAuthorize("hasRole('PATIENT')")
	@GetMapping("/patients/{userId}/upcoming")
	public ResponseEntity<?> listPatientUpcomingAppointmentsByUserId(@PathVariable  @NotNull @Positive  Long userId) {
		System.out.println("in list patient's upcoming appointments "+userId);
		
			//invoke service layer method
			return ResponseEntity.ok //SC 200
					(appointmentService.getPatientUpcomingAppointments(userId));
		
	}

	
	@PostMapping("/{appointmentId}/mark-complete-with-tests")
	public ResponseEntity<?> markAppointmentCompleteWithTestsPrescribed(@PathVariable Long appointmentId,@RequestBody @Valid MarkCompleteDTO dto) {
		System.out.println("in mark complete "+appointmentId+" "+dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(appointmentService.markComplete(appointmentId,dto));
	}
	@PutMapping("/{appointmentId}/cancel")
	public ResponseEntity<?> cancelAppointment(@PathVariable Long appointmentId) {
		return ResponseEntity.ok(appointmentService.cancelAppointment(appointmentId));
	}

	@PutMapping("/{appointmentId}/reschedule")
	public ResponseEntity<?> rescheduleAppointment(@PathVariable Long appointmentId, @RequestBody AppointmentmentRequest dto) {
		return ResponseEntity.ok(appointmentService.rescheduleAppointment(appointmentId, dto));
	}

	@GetMapping("/doctors/{userId}")
	public ResponseEntity<?> getDoctorAppointments(@PathVariable Long userId) {
		return ResponseEntity.ok(appointmentService.getDoctorAppointments(userId));
	}

	@PutMapping("/{appointmentId}/complete")
	public ResponseEntity<?> completeAppointment(@PathVariable Long appointmentId) {
		return ResponseEntity.ok(appointmentService.completeAppointment(appointmentId));
	}

}
