package com.healthcare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.Patient;

public interface PatientRepository extends JpaRepository<Patient,Long> {
	Optional<Patient> findByUserDetailsId(Long userId);
}
