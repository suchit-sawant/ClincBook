package com.healthcare.security;

import java.util.Date;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.healthcare.entities.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component 
public class JwtUtils {
	//injecting value of the property using SpEL (Spring expression Lanuage)
	@Value("${jwt.secret.key}")
	private String secretKey;
	//injecting value of the property using SpEL (Spring expression Lanuage)
	@Value("${jwt.expiration}")
	private long expTime;
	private SecretKey key;
	@PostConstruct
	public void myInit() {
		System.out.println("in init - ");
		System.out.println(expTime);
		System.out.println(secretKey);
		//creates a symmetric secret key for - signing & verification
		key=Keys.hmacShaKeyFor(secretKey.getBytes());
	}
	//generate JWT
	public String generateToken(Object principal) {
		//down cast from Object ---> UserEntity
		Date iat=new Date();
		Date expDate=new Date(iat.getTime()+expTime);
		UserEntity userDetail=(UserEntity) principal;
		return Jwts.builder() //JWTs builder
				.subject(userDetail.getEmail())
				.issuedAt(iat)
				.expiration(expDate)
				.claims(Map.of("user_id", userDetail.getId(), "role", userDetail.getRole().name()))
				.signWith(key)
				.compact();				
	}
	public Claims validateToken(String jwt) {
		return Jwts.parser()			
				.verifyWith(key)
				.build()
				.parseSignedClaims(jwt)
				.getPayload();		
	}
	
	
	

}
