package com.healthcare.exception_handler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.healthcare.custom_exceptions.InvalidInputException;
import com.healthcare.custom_exceptions.ResourceNotFoundException;
import com.healthcare.dto.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFoundException(ResourceNotFoundException e) {
		System.out.println("in resource not found exc ");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage(), "Failed"));
	}
	
	@ExceptionHandler(InvalidInputException.class)
	public ResponseEntity<?> handleInvalidInputException(InvalidInputException e) {
		System.out.println("invalid input exc ");
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(new ApiResponse(e.getMessage(), "Failed"));
	}

	// Add exception handling method - equivalent to catch-all block , to catch ANY
	// exception
	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleException(Exception e) {
		System.out.println("in catch-all ");
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage(), "Failed"));
	}

	/*
	 * Handle validation failures - special manner Validation of RequestBody -
	 * MethodArgumentNotValidException
	 */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
		System.out.println("in validation failure - req body ");
		// 1. Get the list of field errors
		List<FieldError> fieldErrors = e.getFieldErrors();
		// 2. Covert List<FieldError> -> Map<Key : fieldName: String , Value- err mesg :
		// String
		/*
		 * Traditional (non FP) - imperative
		 */
//		Map<String, String> errorMap = new HashMap<>();
//		for (FieldError field : fieldErrors) {
//			errorMap.put(field.getField(), field.getDefaultMessage());
//		}
		Map<String, String> errorMap = fieldErrors.stream() //Stream<FieldError>
		.collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST) //SC 400
				.body(errorMap); //rejected field - err mesg
	}

}
