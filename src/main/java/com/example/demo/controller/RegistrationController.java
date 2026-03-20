

package com.example.demo.controller;

import com.example.demo.dto.RegistrationRequest;
import com.example.demo.entity.Registration;
import com.example.demo.service.RegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    // User registers for event

    @PostMapping("/events/{eventId}/users/{userId}")
    public Registration registerForEvent(@PathVariable("eventId") Long eventId,
                                         @PathVariable("userId") Long userId,
                                         @RequestBody RegistrationRequest request) {

        return registrationService.registerUser(eventId, userId, request);
    }
    // View user's registrations
    @GetMapping("/user/{userId}")
    public List<Registration> getUserRegistrations(@PathVariable("userId") Long userId) {

        return registrationService.getUserRegistrations(userId);
    }


}