//package com.example.demo.exception;
//
//import com.example.demo.response.ApiResponse;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(ResourceNotFoundException.class)
//    public ApiResponse handleNotFound(ResourceNotFoundException ex) {
//
//        return new ApiResponse(false, ex.getMessage());
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ApiResponse handleGeneric(Exception ex) {
//
//        return new ApiResponse(false, "Something went wrong");
//    }
//
//}


//package com.example.demo.exception;
//
//import com.example.demo.response.ApiResponse;
//import org.springframework.web.bind.annotation.*;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    @ExceptionHandler(ResourceNotFoundException.class)
//    public ApiResponse handleNotFound(ResourceNotFoundException ex) {
//
//        return new ApiResponse(false, ex.getMessage());
//    }
//
//    @ExceptionHandler(Exception.class)
//    public ApiResponse handleGeneric(Exception ex) {
//
//        // print error in console
//        ex.printStackTrace();
//
//        return new ApiResponse(false, ex.getMessage());
//    }
//}
package com.example.demo.exception;

import com.example.demo.response.ApiResponse;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleUserNotFound(UserNotFoundException ex) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .data(null)
                        .build());
    }

    @ExceptionHandler(org.springframework.security.authentication.BadCredentialsException.class)
    public ResponseEntity<ApiResponse<?>> handleBadCredentials(org.springframework.security.authentication.BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .data(null)
                        .build());
    }

    @ExceptionHandler(EventNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleEventNotFound(EventNotFoundException ex) {

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .data(null)
                        .build());
    }

    @ExceptionHandler(RegistrationException.class)
    public ResponseEntity<ApiResponse<?>> handleRegistrationException(RegistrationException ex) {

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponse.builder()
                        .success(false)
                        .message(ex.getMessage())
                        .data(null)
                        .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleGenericException(Exception ex) {

        ex.printStackTrace();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.builder()
                        .success(false)
                        .message("Internal Server Error")
                        .data(null)
                        .build());
    }
}