package com.healthcare.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthcare.entities.Appointment;
import com.healthcare.entities.Status;
public interface AppointmentRepository extends JpaRepository<Appointment,Long> {
//derived query to find if doctor is available
	boolean existsByMyDoctorIdAndAppointmentDateTimeBetweenAndStatus
	(Long docId,LocalDateTime start,LocalDateTime end,Status status);
	//get all patient's appointments by user id- custom query
	@Query("select a from Appointment a where a.myPatient.userDetails.id = :id order by a.appointmentDateTime desc")
	List<Appointment> listPatientsAppointments(@Param("id") Long id);
	
	@Query("select a from Appointment a where a.myDoctor.id = :doctorId and a.status = :status")
	List<Appointment> findByDoctorIdAndStatus(@Param("doctorId") Long doctorId, @Param("status") Status status);
	
	List<Appointment> findByMyDoctor(com.healthcare.entities.Doctor doctor);
	
	List<Appointment> findByMyPatient(com.healthcare.entities.Patient patient);
	/*
	 * @Param - is used in Custom queries to set named IN params
	 */
	
	
	
}
