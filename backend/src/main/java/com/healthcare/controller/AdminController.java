package com.healthcare.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.healthcare.custom_exceptions.ApiException;
import com.healthcare.dto.AdminStatsDTO;
import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.UserReqDTO;
import com.healthcare.entities.UserEntity;
import com.healthcare.entities.UserRole;
import com.healthcare.repository.AppointmentRepository;
import com.healthcare.repository.DoctorRepository;
import com.healthcare.repository.PatientRepository;
import com.healthcare.repository.UserRepository;
import com.healthcare.service.DoctorService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
@RequiredArgsConstructor
public class AdminController {
	
	private final UserRepository userRepository;
	private final DoctorRepository doctorRepository;
	private final PatientRepository patientRepository;
	private final AppointmentRepository appointmentRepository;
	private final PasswordEncoder passwordEncoder;
	private final DoctorService doctorService;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerAdmin(@RequestBody UserReqDTO dto) {
		if(userRepository.existsByEmail(dto.getEmail()))
			throw new ApiException("Email already exists!");
		
		UserEntity admin = new UserEntity();
		admin.setFirstName(dto.getFirstName());
		admin.setLastName(dto.getLastName());
		admin.setEmail(dto.getEmail());
		admin.setPassword(passwordEncoder.encode(dto.getPassword()));
		admin.setPhone(dto.getPhone());
		admin.setDob(dto.getDob());
		admin.setRole(UserRole.ROLE_ADMIN);
		admin.setRegAmount(0);
		
		userRepository.save(admin);
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ApiResponse("Admin registered successfully", "Success"));
	}
	
	@GetMapping("/profile/{userId}")
	public ResponseEntity<?> getAdminProfile(@PathVariable Long userId) {
		UserEntity admin = userRepository.findById(userId)
				.orElseThrow(() -> new ApiException("Admin not found"));
		java.util.Map<String, Object> profile = new java.util.HashMap<>();
		profile.put("id", admin.getId());
		profile.put("firstName", admin.getFirstName());
		profile.put("lastName", admin.getLastName());
		profile.put("email", admin.getEmail());
		profile.put("phone", admin.getPhone());
		profile.put("dob", admin.getDob());
		profile.put("role", admin.getRole().toString());
		if (admin.getImage() != null) {
			profile.put("image", java.util.Base64.getEncoder().encodeToString(admin.getImage()));
		}
		return ResponseEntity.ok(profile);
	}
	
	@GetMapping("/stats")
	public ResponseEntity<?> getAdminStats() {
		AdminStatsDTO stats = new AdminStatsDTO();
		stats.setTotalUsers(userRepository.count());
		stats.setTotalDoctors(doctorRepository.count());
		stats.setTotalPatients(patientRepository.count());
		stats.setTotalAppointments(appointmentRepository.count());
		return ResponseEntity.ok(stats);
	}
	
	@GetMapping("/appointments")
	public ResponseEntity<?> getAllAppointments() {
		try {
			java.util.List<java.util.Map<String, Object>> appointments = appointmentRepository.findAll().stream()
					.filter(apt -> apt.getMyDoctor() != null && apt.getMyPatient() != null)
					.filter(apt -> apt.getMyDoctor().getUserDetails() != null && apt.getMyPatient().getUserDetails() != null)
					.sorted((a, b) -> b.getAppointmentDateTime().compareTo(a.getAppointmentDateTime()))
					.map(apt -> {
						java.util.Map<String, Object> map = new java.util.HashMap<>();
						map.put("id", apt.getId());
						map.put("appointmentDateTime", apt.getAppointmentDateTime());
						map.put("patientName", apt.getMyPatient().getUserDetails().getFirstName() + " " + apt.getMyPatient().getUserDetails().getLastName());
						map.put("doctorName", apt.getMyDoctor().getUserDetails().getFirstName() + " " + apt.getMyDoctor().getUserDetails().getLastName());
						map.put("status", apt.getStatus().toString());
						map.put("reason", apt.getReason());
						return map;
					})
					.toList();
			return ResponseEntity.ok(appointments);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok(java.util.Collections.emptyList());
		}
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers() {
		try {
			return ResponseEntity.ok(userRepository.findAll().stream()
					.map(user -> {
						java.util.Map<String, Object> map = new java.util.HashMap<>();
						map.put("id", user.getId());
						map.put("firstName", user.getFirstName());
						map.put("lastName", user.getLastName());
						map.put("email", user.getEmail());
						map.put("phone", user.getPhone());
						map.put("role", user.getRole().toString());
						if (user.getImage() != null) {
							map.put("image", java.util.Base64.getEncoder().encodeToString(user.getImage()));
						}
						if (user.getRole() == UserRole.ROLE_DOCTOR) {
							doctorRepository.findByUserDetailsId(user.getId())
								.ifPresent(doctor -> map.put("isVerified", doctor.isVerified()));
						}
						return map;
					})
					.toList());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok(java.util.Collections.emptyList());
		}
	}
	
	@PutMapping("/users/{userId}/verify")
	public ResponseEntity<?> verifyDoctor(@PathVariable Long userId) {
		doctorRepository.findByUserDetailsId(userId).ifPresent(doctor -> {
			doctor.setVerified(true);
			doctorRepository.save(doctor);
		});
		return ResponseEntity.ok(new ApiResponse("Doctor verified successfully", "Success"));
	}
	
	@PutMapping("/users/{userId}")
	public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody UserReqDTO dto) {
		UserEntity user = userRepository.findById(userId)
				.orElseThrow(() -> new ApiException("User not found"));
		if (dto.getFirstName() != null) user.setFirstName(dto.getFirstName());
		if (dto.getLastName() != null) user.setLastName(dto.getLastName());
		if (dto.getPhone() != null) user.setPhone(dto.getPhone());
		if (dto.getImage() != null && !dto.getImage().trim().isEmpty()) {
			try {
				user.setImage(java.util.Base64.getDecoder().decode(dto.getImage()));
			} catch (IllegalArgumentException e) {
				System.err.println("Invalid base64 image: " + e.getMessage());
			}
		}
		userRepository.save(user);
		return ResponseEntity.ok(new ApiResponse("User updated successfully", "Success"));
	}
	
	@jakarta.transaction.Transactional
	@org.springframework.web.bind.annotation.DeleteMapping("/users/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
		UserEntity user = userRepository.findById(userId)
				.orElseThrow(() -> new ApiException("User not found"));
		
		if (user.getRole() == UserRole.ROLE_DOCTOR) {
			doctorRepository.findByUserDetailsId(userId).ifPresent(doctor -> {
				appointmentRepository.deleteAll(appointmentRepository.findByMyDoctor(doctor));
				doctorRepository.delete(doctor);
			});
		} else if (user.getRole() == UserRole.ROLE_PATIENT) {
			patientRepository.findByUserDetailsId(userId).ifPresent(patient -> {
				appointmentRepository.deleteAll(appointmentRepository.findByMyPatient(patient));
				patientRepository.delete(patient);
			});
		}
		
		userRepository.deleteById(userId);
		return ResponseEntity.ok(new ApiResponse("User deleted successfully", "Success"));
	}
	
	@PostMapping("/doctors")
	public ResponseEntity<?> addDoctor(@RequestBody com.healthcare.dto.DoctorRegDTO dto) {
		doctorService.registerNewDoctor(dto);
		com.healthcare.entities.Doctor doctor = doctorRepository.findByUserDetailsId(
				userRepository.findByEmail(dto.getUserDetails().getEmail()).get().getId()
		).orElseThrow(() -> new ApiException("Doctor not found"));
		doctor.setVerified(true);
		doctorRepository.save(doctor);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ApiResponse("Doctor added successfully", "Success"));
	}
	
	@GetMapping("/doctors")
	public ResponseEntity<?> getAllDoctorsForAdmin() {
		try {
			return ResponseEntity.ok(doctorRepository.findAll().stream()
					.map(doctor -> {
						java.util.Map<String, Object> map = new java.util.HashMap<>();
						map.put("id", doctor.getId());
						map.put("userId", doctor.getUserDetails().getId());
						map.put("firstName", doctor.getUserDetails().getFirstName());
						map.put("lastName", doctor.getUserDetails().getLastName());
						map.put("email", doctor.getUserDetails().getEmail());
						map.put("phone", doctor.getUserDetails().getPhone());
						map.put("speciality", doctor.getSpeciality());
						map.put("experienceInYears", doctor.getExperienceInYears());
						map.put("qualifications", doctor.getQualifications());
						map.put("fees", doctor.getFees());
						map.put("isVerified", doctor.isVerified());
						if (doctor.getUserDetails().getImage() != null) {
							map.put("image", java.util.Base64.getEncoder().encodeToString(doctor.getUserDetails().getImage()));
						}
						return map;
					})
					.toList());
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok(java.util.Collections.emptyList());
		}
	}
}
