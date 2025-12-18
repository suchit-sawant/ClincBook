package com.healthcare.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DoctorRegDTO {
	@Valid
	private UserReqDTO userDetails;
	@NotBlank
	private String speciality;
	@NotNull
	@Min(0)
	private Integer experienceInYears;
	@NotBlank
	private String qualifications;
	@NotNull
	@Min(0)
	private int fees;
	@NotBlank
	@Length(max = 200)
	private String address;
}
