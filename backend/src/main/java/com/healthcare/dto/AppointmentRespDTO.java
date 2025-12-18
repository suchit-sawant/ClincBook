package com.healthcare.dto;
/*Data Transfer object - meant to transfer the data between the layers DAO-> Servlet
 * Later - it will be used to transfer the data REST client & REST server
 * Then it will be used to transfer the data between different MS
 */

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@NoArgsConstructor
@Getter
@Setter
@ToString
public class AppointmentRespDTO {
	private Long id;
	private LocalDateTime appointmentDateTime;
	private String doctorName;
	private String patientName;
	private String speciality;
	private String status;
	private String reason;
	private int fees;
}
