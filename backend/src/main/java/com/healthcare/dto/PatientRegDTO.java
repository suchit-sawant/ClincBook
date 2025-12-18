package com.healthcare.dto;
import org.hibernate.validator.constraints.Length;

/*
 * {
  "userDetails": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "dob": "string",
    "regAmount": 0
  },
  "gender": "MALE",
  "bloodGroup": "A_POSITIVE",
  "familyHistory": "string"
}

 */
import com.healthcare.entities.BloodGroup;
import com.healthcare.entities.Gender;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class PatientRegDTO {
	@Valid
	private UserReqDTO userDetails;
	@NotNull
	private Gender gender;
	@NotNull
	private BloodGroup bloodGroup;
	@NotBlank
	@Length(max = 500)
	private String familyHistory;
	@NotBlank
	@Length(max = 200)
	private String address;
}
