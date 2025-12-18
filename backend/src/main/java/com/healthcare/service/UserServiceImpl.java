package com.healthcare.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.AuthenticationException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.AuthRequest;
import com.healthcare.dto.AuthResponse;
import com.healthcare.entities.UserEntity;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor //to create a parameterized ctor using final fields
public class UserServiceImpl implements UserService {
	//ctor based D.I
	private final UserRepository userRepository;
	private final ModelMapper modelMapper;
	private final PasswordEncoder passwordEncoder;

	@Override
	public AuthResponse authenticate(AuthRequest dto) {
		// 1. validate for user with give email & password
		UserEntity user=userRepository.findByEmailAndPassword(dto.getEmail(), dto.getPassword()) //Optional<User>
				.orElseThrow(() -> new AuthenticationException("Invalid Email or password !!!!!!!"));
		//2. => auth success -> convert User entity -> auth resp dto , containing only necessary info
		//Create resp dto - def ctor , call entity's getters & dto's setters | use paramterized ctor OR use model mapper's API
		/*
		 * API of ModelMapper
		 * public D map(Object src , Class<D> destination)
		 * - based on Reflection (java.lang.reflect) API
		 */
		 AuthResponse respDTO = modelMapper.map(user, AuthResponse.class);
		 respDTO.setMessage("Login Successful!");
		 return respDTO;
	}

	@Override
	public ApiResponse encryptPassword(Long userId) {
		//get user details by id
		UserEntity user=userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID !!!"));
		//user - persistent
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return new ApiResponse("Password encrypted", "Success");
	}
	

}
