package com.healthcare.dto;
//(user id , name , role , message - success)

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
	private String jwt;
	private String message;
}
