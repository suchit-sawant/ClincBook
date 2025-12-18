package com.healthcare.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminStatsDTO {
	private long totalUsers;
	private long totalDoctors;
	private long totalPatients;
	private long totalAppointments;
}
