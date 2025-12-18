package com.healthcare.service;

import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.PatientDTO;
import com.healthcare.dto.PatientRegDTO;

public interface PatientService {
//method to sign up
	ApiResponse registerNewPatient(PatientRegDTO reqDTO);
	PatientDTO getPatientById(Long id);
	ApiResponse updatePatient(Long userId, PatientDTO dto);
}
