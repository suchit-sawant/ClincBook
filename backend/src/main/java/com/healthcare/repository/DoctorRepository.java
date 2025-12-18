package com.healthcare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor,Long> {
	Optional<Doctor> findByUserDetailsId(Long userId);
}
