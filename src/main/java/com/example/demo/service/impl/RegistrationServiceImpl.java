
package com.example.demo.service.impl;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.entity.User;
import com.example.demo.dto.RegistrationRequest;

import com.example.demo.exception.RegistrationException;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.RegistrationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class RegistrationServiceImpl implements RegistrationService {

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public Registration register(Registration registration) {
        return registrationRepository.save(registration);
    }

    @Override
    public List<Registration> getAllRegistrations() {
        return registrationRepository.findAll();
    }

    @Override
    public Registration getRegistrationById(Long id) {
        return registrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Registration not found"));
    }

    // ADMIN FUNCTIONS

    @Override
    public List<Registration> getUsersByEvent(Long eventId) {

        return registrationRepository.findByEventId(eventId);
    }

    @Override
    public void removeUserFromEvent(Long eventId, Long userId) {

        registrationRepository.deleteByEventIdAndUserId(eventId, userId);
    }

    // @Override
    // public void removeRegistration(Long registrationId) {
    // registrationRepository.deleteById(registrationId);
    // }
    @Override
    public void removeRegistration(Long eventId, Long registrationId) {

        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RegistrationException("Registration not found with ID: " + registrationId));

        if (!registration.getEventId().equals(eventId)) {
            throw new RegistrationException("Registration (Event " + registration.getEventId() + ") does not belong to this event (" + eventId + ")");
        }

        registrationRepository.deleteById(registrationId);
    }

    @Override
    public Registration updateRegistration(Long registrationId, RegistrationRequest request) {
        Registration registration = registrationRepository.findById(registrationId)
                .orElseThrow(() -> new RegistrationException("Registration not found"));

        registration.setName(request.getName());
        registration.setEmailId(request.getEmailId());
        
        if (request.getPhnNumber() != null) {
            registration.setPhnNumber(request.getPhnNumber());
        }

        return registrationRepository.save(registration);
    }

    @Override
    public Registration adminRegisterUser(Long eventId, RegistrationRequest request) {

        Registration registration = new Registration();

        registration.setEventId(eventId);
        registration.setUserId(request.getUserId());
        registration.setName(request.getName());
        registration.setEmailId(request.getEmailId());
        registration.setPhnNumber(request.getPhnNumber());
        registration.setCategoryId(request.getCategoryId());

        // Generate random bib number
        int bibNumber = ThreadLocalRandom.current().nextInt(10000, 99999);

        registration.setBibNumber(bibNumber);

        registration.setPaymentStatus(request.getPaymentStatus());

        Registration savedReg = registrationRepository.save(registration);
        try {
            Event event = eventRepository.findById(eventId).orElse(null);
            emailService.sendRegistrationEmail(savedReg, event);
        } catch (Exception e) {
            System.err.println("Failed to send registration email: " + e.getMessage());
            e.printStackTrace();
        }
        return savedReg;
    }

    @Override
    public Registration registerUser(Long eventId, Long userId, RegistrationRequest request) {
        if (registrationRepository.existsByEventIdAndUserId(eventId, userId)) {
            throw new RegistrationException("User already registered for this event");
        }

        Registration registration = new Registration();

        registration.setEventId(eventId);
        registration.setUserId(userId);

        registration.setName(request.getName());
        registration.setEmailId(request.getEmailId());
        registration.setPhnNumber(request.getPhnNumber());
        registration.setCategoryId(request.getCategoryId());

        int bibNumber = ThreadLocalRandom.current().nextInt(10000, 99999);
        registration.setBibNumber(bibNumber);

        registration.setPaymentStatus("PENDING");

        Registration savedReg = registrationRepository.save(registration);
        try {
            Event event = eventRepository.findById(eventId).orElse(null);
            emailService.sendRegistrationEmail(savedReg, event);
        } catch (Exception e) {
            System.err.println("Failed to send registration email: " + e.getMessage());
            e.printStackTrace();
        }
        return savedReg;
    }

    @Override
    public List<Registration> getUserRegistrations(Long userId) {

        return registrationRepository.findByUserId(userId);
    }
}