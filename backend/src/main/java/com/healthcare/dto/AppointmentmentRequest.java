package com.healthcare.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/*Request Payload - 
{
  "patientId": 3,
  "doctorId": 5,
  "appointmentDateTime": "2025-11-05T10:30:00",
  "reason": "Regular checkup"
 }*/
@Getter
@Setter
@ToString
public class AppointmentmentRequest {
	private Long patientId;
	private Long doctorId;
	private LocalDateTime appointmentDateTime;
	private String reason;
}
