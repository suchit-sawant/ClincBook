package com.healthcare.service;

import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.healthcare.custom_exceptions.ApiException;
import com.healthcare.dto.ApiResponse;
import com.healthcare.dto.PatientDTO;
import com.healthcare.dto.PatientRegDTO;
import com.healthcare.entities.Patient;
import com.healthcare.entities.UserRole;
import com.healthcare.repository.PatientRepository;
import com.healthcare.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor //generates the parameterized constr with - final & @NotNull
public class PatientServiceImpl implements PatientService {
	private final PatientRepository patientRepository;
	private final UserRepository userRepository;
	private final ModelMapper mapper;
	private final PasswordEncoder passwordEncoder;
	

	@Override
	public ApiResponse registerNewPatient(PatientRegDTO reqDTO) {
		
		if(userRepository.existsByEmail(reqDTO.getUserDetails().getEmail()))
			throw new ApiException("Email alread Exists !!!!!");
		
		Patient entity = mapper.map(reqDTO, Patient.class);
		
		entity.getUserDetails().setPassword(passwordEncoder.encode(
				entity.getUserDetails().getPassword()));
		System.out.println("mapped entity "+entity);
		
		entity.getUserDetails().setRole(UserRole.ROLE_PATIENT);
		
		Patient persistentEntity=patientRepository.save(entity);		
		
		return new ApiResponse("New Patient Registered with ID="+persistentEntity.getId(), "Success");
	}

	@Override
	public PatientDTO getPatientById(Long userId) {
		Patient patient = patientRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ApiException("Patient not found for user ID: " + userId));
		PatientDTO dto = mapper.map(patient, PatientDTO.class);
		dto.setId(patient.getId());
		dto.getUserDetails().setPassword(null);
		if (patient.getUserDetails().getImage() != null) {
			dto.getUserDetails().setImage(java.util.Base64.getEncoder().encodeToString(patient.getUserDetails().getImage()));
		}
		return dto;
	}

	@Override
	public ApiResponse updatePatient(Long userId, PatientDTO dto) {
		Patient patient = patientRepository.findByUserDetailsId(userId)
				.orElseThrow(() -> new ApiException("Patient not found for user ID: " + userId));
		patient.setGender(dto.getGender());
		patient.setBloodGroup(dto.getBloodGroup());
		patient.setFamilyHistory(dto.getFamilyHistory());
		patient.setAddress(dto.getAddress());
		patient.getUserDetails().setFirstName(dto.getUserDetails().getFirstName());
		patient.getUserDetails().setLastName(dto.getUserDetails().getLastName());
		patient.getUserDetails().setPhone(dto.getUserDetails().getPhone());
		if (dto.getUserDetails().getImage() != null) {
			patient.getUserDetails().setImage(java.util.Base64.getDecoder().decode(dto.getUserDetails().getImage()));
		}
		return new ApiResponse("Patient profile updated successfully", "Success");
	}

}
