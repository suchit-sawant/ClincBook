package com.healthcare.entities;
//users table -column - id(PK) , first name , last name, email ,password , phone , dob:date , role:enum,image :blob

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity // to declare the class as Entity - so that Hibernate can manage it's life cycle
		// - mandatory annotation
@Table(name = "users") // to specify table name
@AttributeOverride(name = "id", column = @Column(name = "user_id"))

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true,   exclude = { "password", "image" })
public class UserEntity extends BaseEntity implements UserDetails{

	@Column(name = "first_name", length = 30) // col name , varchar size
	private String firstName;
	@Column(name = "last_name", length = 40)
	private String lastName;
	@Column(length = 50, unique = true) // col : unique constraint
	private String email;
	
	@Column(length = 300, nullable = false)
	private String password;
	@Column(unique = true, length = 14)

	private String phone;

	private LocalDate dob;
	@Enumerated(EnumType.STRING) // col type - varchar | enum
	private UserRole role;
	@Lob // large object , Mysql col type - longblob
	private byte[] image;
	@Column(name = "reg_amount", columnDefinition = "INT DEFAULT 500")
	private Integer regAmount = 500;

	public UserEntity(String firstName, String lastName, String email, String password, String phone, LocalDate dob,
			Integer amount) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.dob = dob;		
		this.regAmount = amount;
	}

	public UserEntity(String firstName, String lastName, LocalDate dob) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.dob = dob;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		//return Collection<GrantedAuthority>
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}
	
}
