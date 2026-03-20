package com.example.demo.service;

import com.example.demo.entity.Registration;
import com.example.demo.dto.RegistrationRequest;

import java.util.List;

public interface RegistrationService {

    Registration register(Registration registration);

    List<Registration> getAllRegistrations();

    Registration getRegistrationById(Long id);

    // ADMIN FUNCTIONS

    List<Registration> getUsersByEvent(Long eventId);

    void removeUserFromEvent(Long eventId, Long userId);

    void removeRegistration(Long eventId, Long registrationId);
    
    Registration updateRegistration(Long registrationId, RegistrationRequest request);

    Registration adminRegisterUser(Long eventId, RegistrationRequest request);

    // USER FUNCTION
    Registration registerUser(Long eventId, Long userId, RegistrationRequest request);

    List<Registration> getUserRegistrations(Long userId);

}