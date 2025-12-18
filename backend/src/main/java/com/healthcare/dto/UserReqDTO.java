package com.healthcare.dto;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;

/*
 *  "firstName": "string",
    "lastName": "string",
    "email": "string",
    "password": "string",
    "phone": "string",
    "dob": "string",
    "regAmount": 0
 */
@Getter
@Setter
public class UserReqDTO {
	@NotBlank(message = "FirstName is required")
	@Length(min=3,max=20,message="first name must min 3 chars and max 20 chars")
	private String firstName;	
	private String lastName;
	private String email;	
	private String password;
	private String phone;
	@Past
	private LocalDate dob;
	@Min(500)
	private Integer regAmount;
	private String image;

}
