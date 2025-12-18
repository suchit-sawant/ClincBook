package com.healthcare.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dto.AuthRequest;
import com.healthcare.dto.AuthResponse;
import com.healthcare.security.JwtUtils;
import com.healthcare.service.DoctorServiceImpl;
import com.healthcare.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/users") // base url-pattern
@RequiredArgsConstructor
@Slf4j
public class UserController {
   private final UserService userService;
	private final AuthenticationManager authenticationManager;	
	private final JwtUtils jwtUtils;

	/*
	 * Desc - User signin i/p - email & password - request body (@RequestBody - Auth
	 * Request DTO) URL - http://host:port/users/signin Method - POST (security)
	 * Success Resp -SC 200, Auth Resp DTO (user id , name , role , message -
	 * success) Error Resp - SC 401 , Api resp DTO - TS , message , status - failed
	 */
	@PostMapping("/signin")
	public ResponseEntity<?> userAuthentication(@RequestBody @Valid AuthRequest dto) {
		System.out.println("in sign in " + dto);

		// invoke AuthMgr's authenticate method
		//public Authentication authenticate(Authentication auth) throws AuthenticationExc
		/*1. Create Authentication object - class UserNamePasswordAuthToken
		 * - email & password
		 */
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword());
		System.out.println("is auth "+authToken.isAuthenticated());//false
		Authentication fullyAuth = authenticationManager.authenticate(authToken);
		//2. authentication success
		System.out.println("is auth "+fullyAuth.isAuthenticated());//true
		System.out.println(fullyAuth.getClass());
		System.out.println(fullyAuth.getPrincipal().getClass());//user details : user entity
		return ResponseEntity.ok
				(new AuthResponse(jwtUtils.generateToken(fullyAuth.getPrincipal()),"Succees"));

	}

	/*
	 * Encrypt Password i/p - user id o/p -ApiResp (encrypted!) DB Action - store
	 * encrypted password in the DB URL -
	 * http://host:port/users/{userId}/pwd-encryption Method - PATCH
	 */
	@PatchMapping("/{userId}/pwd-encryption")
	public ResponseEntity<?> encryptUserPassword(@PathVariable Long userId) {
		log.info("encrypting user pwd {} ", userId);
		//invoke service layer method
		return ResponseEntity.ok(userService.encryptPassword(userId)
				);

	}

}
