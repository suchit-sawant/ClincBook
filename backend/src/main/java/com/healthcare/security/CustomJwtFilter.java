package com.healthcare.security;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.healthcare.dto.JwtDTO;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
//This filter will be called exactly once / request
public class CustomJwtFilter extends OncePerRequestFilter {
	private final JwtUtils jwtUtils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// Skip JWT processing for OPTIONS requests
		if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
			filterChain.doFilter(request, response);
			return;
		}
		// 1. check request header -"Authorization" for jwt
		String headerValue=request.getHeader("Authorization");
		if(headerValue != null && headerValue.startsWith("Bearer "))
		{
			log.info("JWT found .....");
			String jwt=headerValue.substring(7);
			//validate JWT - jwt utils
			Claims claims = jwtUtils.validateToken(jwt);
			//extract user_id & role & add them in authentication
			Long userId=claims.get("user_id", Long.class);
			String role=claims.get("role", String.class);			
			//user id , email & role
			JwtDTO dto=new JwtDTO(userId, claims.getSubject(), role);
			//create Authentication object
			UsernamePasswordAuthenticationToken token=
					new UsernamePasswordAuthenticationToken(dto, 
							null, List.of(new SimpleGrantedAuthority(role)));			
			log.info("authetication {}", token);
			//set this under sec ctx
			SecurityContextHolder.getContext().setAuthentication(token);			
		}
		//continue with next filter in the filter chain
		filterChain.doFilter(request, response);

	}

}
