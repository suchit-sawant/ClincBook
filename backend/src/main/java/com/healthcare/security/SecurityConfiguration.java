package com.healthcare.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

import lombok.RequiredArgsConstructor;

@Configuration //to declare spring configuration class (equivalent to bean config xml)
@EnableWebSecurity //enables spring security
@EnableMethodSecurity //enables method level authorization rules(finer control)
@RequiredArgsConstructor
public class SecurityConfiguration {
	//depcy
	private final PasswordEncoder passwordEncoder;
	private final CustomJwtFilter customJwtFilter;
	/*Configure spring bean , to build Spring security filter chain
	 *  - to disable form login
	 *  - to retain Basic Auth scheme
	 *  - Disable CSRF protection
	 *  - Disable session creation
	 *  - add authorization rules
	 *   - public end points : permitAll
	 *   - protected end points : needs authentication
	 *    - role based authorization rules (using URL | method)
	 *    Use HttpSecurity class as builder (configuration provider) to create 
	 *    spring sec filter chain
	 *    
	 */
@Bean
 SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
 {
	http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
	.csrf(csrf -> csrf.disable())
	.sessionManagement(sessionMgr -> 
	sessionMgr.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	.authorizeHttpRequests(auth -> 
	auth.requestMatchers(HttpMethod.OPTIONS).permitAll()
	.requestMatchers("/v3/api-docs/**","/swagger-ui/**","/users/**","/patients/signup","/doctors/signup","/doctors").permitAll()
	.requestMatchers(HttpMethod.POST,"/admin/register").permitAll()
	.requestMatchers("/admin/**").hasRole("ADMIN")
	.requestMatchers(HttpMethod.POST,"/appointments").hasRole("PATIENT")
	.requestMatchers(HttpMethod.PUT,"/patients/*","/appointments/*/cancel","/appointments/*/reschedule").hasRole("PATIENT")
	.requestMatchers(HttpMethod.PUT,"/doctors/*","/appointments/*/cancel","/appointments/*/reschedule").hasRole("DOCTOR")
	.requestMatchers(HttpMethod.GET,"/doctors/*/patients","/appointments/doctors/*").hasRole("DOCTOR")
	.requestMatchers(HttpMethod.PUT,"/appointments/*/complete").hasRole("DOCTOR")
	.requestMatchers(HttpMethod.GET,"/doctors/*","/patients/*","/appointments/**").authenticated()
	.requestMatchers(HttpMethod.POST,"/appointments/*/mark-complete-with-tests").hasRole("DOCTOR")
	.anyRequest().authenticated())
	.addFilterBefore(customJwtFilter, UsernamePasswordAuthenticationFilter.class);
	return http.build();
 }
@Bean
CorsConfigurationSource corsConfigurationSource() {
	CorsConfiguration configuration = new CorsConfiguration();
	configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
	configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
	configuration.setExposedHeaders(Arrays.asList("Authorization"));
	configuration.setAllowCredentials(true);
	configuration.setMaxAge(3600L);
	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	source.registerCorsConfiguration("/**", configuration);
	return source;
}

@Bean
AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception
{
	return config.getAuthenticationManager();
}
}
