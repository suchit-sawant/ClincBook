package com.healthcare.service;

import java.util.List;

import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.DoctorDTO;
import com.healthcare.dto.DoctorRegDTO;
import com.healthcare.dto.PatientDTO;

public interface DoctorService {
	List<DoctorDTO> getAllDoctors();
	ApiResponse registerNewDoctor(DoctorRegDTO dto);
	DoctorDTO getDoctorById(Long userId);
	ApiResponse updateDoctor(Long userId, DoctorDTO dto);
	List<PatientDTO> getDoctorPatients(Long userId);
}
