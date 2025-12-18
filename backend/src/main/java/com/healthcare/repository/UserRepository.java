package com.healthcare.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthcare.entities.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
//derived query for signin - select u from User u where u.email=:em and u.password=:pass
	Optional<UserEntity> findByEmailAndPassword(String em,String pass);
//derived query - JPQL will be derived by Spring Data Frmwork(SDF)
	boolean existsByEmail(String email);
	//derived query - findBy
	Optional<UserEntity> findByEmail(String email);
}
