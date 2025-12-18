package com.healthcare.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorDTO {
	private Long doctorId;
	private String speciality;
	private int experienceInYears;
	private String qualifications;
	private int fees;
	private String address;
	private UserReqDTO userDetails;
}
