package com.healthcare.entities;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


//gender , blood group , family history
@Entity
@Table(name = "patients")
@AttributeOverride(name="id", column = @Column(name="patient_id"))
//lombok annotations
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true,exclude = "userDetails")
public class Patient  extends BaseEntity{
	
	@Enumerated(EnumType.STRING)
	private Gender gender;
	@Enumerated(EnumType.STRING)
	@Column(name = "blood_group")
	private BloodGroup bloodGroup;
	@Column(name = "family_history", length = 500)
	private String familyHistory;
	@Column(length = 200)
	private String address;
	//user
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER) //mandatory
	@JoinColumn(name="user_id", nullable = false)
	private UserEntity userDetails;
	public Patient(Gender gender, BloodGroup bloodGroup, String familyHistory, String address) {
		super();
		this.gender = gender;
		this.bloodGroup = bloodGroup;
		this.familyHistory = familyHistory;
		this.address = address;
	}
	
	
}
