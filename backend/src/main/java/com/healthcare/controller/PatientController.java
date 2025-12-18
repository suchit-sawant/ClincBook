package com.healthcare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.dto.PatientDTO;
import com.healthcare.dto.PatientRegDTO;
import com.healthcare.security.JwtUtils;
import com.healthcare.service.PatientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
@RequiredArgsConstructor
public class PatientController {
	private final JwtUtils jwtUtils;
	private final PatientService patientService;

	@PostMapping("/signup")
	public ResponseEntity<?> registerPatient(@RequestBody @Valid
			PatientRegDTO dto) {
		System.out.println("in patient reg " + dto);
		
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(patientService.registerNewPatient(dto));		
		
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getPatientById(@PathVariable Long id) {
		
		return ResponseEntity.ok(patientService.getPatientById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updatePatient(@PathVariable Long id, @RequestBody PatientDTO dto) {
		return ResponseEntity.ok(patientService.updatePatient(id, dto));
	}

}
