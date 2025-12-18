package com.healthcare.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.entities.UserEntity;
import com.healthcare.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomUserDetailsServiceImpl implements UserDetailsService {
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		//call dao's method to fetch user details by email
		UserEntity user=userRepository.findByEmail(email)
				.orElseThrow(() -> 
				new UsernameNotFoundException("User by email doesn't exist jaydeep!!!!"));
		return user;
	}

}
