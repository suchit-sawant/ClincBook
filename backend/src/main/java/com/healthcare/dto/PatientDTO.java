package com.healthcare.dto;

import com.healthcare.entities.BloodGroup;
import com.healthcare.entities.Gender;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientDTO {
	private Long id;
	private Gender gender;
	private BloodGroup bloodGroup;
	private String familyHistory;
	private String address;
	private UserReqDTO userDetails;
}
