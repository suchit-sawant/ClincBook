package com.healthcare.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/*
 * {
           "testIds": [1, 2, 3],
  		   "prescribedByDoctorId": 3
	}
 */
@Getter
@Setter
@ToString //only during debugging
@AllArgsConstructor
@NoArgsConstructor
public class MarkCompleteDTO {
	private List<Long> testIds;//done by Jackson
	private Long prescribedByDoctorId;
}
