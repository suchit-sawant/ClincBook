package com.healthcare.service;

import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.AuthRequest;
import com.healthcare.dto.AuthResponse;

public interface UserService {

	AuthResponse authenticate(AuthRequest dto);

	ApiResponse encryptPassword(Long userId);

}
