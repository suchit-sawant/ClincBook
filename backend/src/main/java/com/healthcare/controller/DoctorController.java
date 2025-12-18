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

import com.healthcare.dto.DoctorDTO;
import com.healthcare.dto.DoctorRegDTO;
import com.healthcare.service.DoctorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
@RequiredArgsConstructor
public class DoctorController {

	private final DoctorService doctorService;

	@PostMapping("/signup")
	public ResponseEntity<?> registerDoctor(@RequestBody @Valid DoctorRegDTO dto) {
		System.out.println("in doctor reg " + dto);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(doctorService.registerNewDoctor(dto));
	}

	@GetMapping
	public ResponseEntity<?> getAllDoctors() {
		return ResponseEntity.ok(doctorService.getAllDoctors());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
		return ResponseEntity.ok(doctorService.getDoctorById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> updateDoctor(@PathVariable Long id, @RequestBody DoctorDTO dto) {
		return ResponseEntity.ok(doctorService.updateDoctor(id, dto));
	}

	@GetMapping("/{id}/patients")
	public ResponseEntity<?> getDoctorPatients(@PathVariable Long id) {
		return ResponseEntity.ok(doctorService.getDoctorPatients(id));
	}
}
