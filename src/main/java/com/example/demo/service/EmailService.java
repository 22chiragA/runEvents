package com.example.demo.service;

import com.example.demo.entity.Registration;
import com.example.demo.entity.Event;
import com.example.demo.entity.User;
import java.util.List;

public interface EmailService {
    void sendRegistrationEmail(Registration registration, Event event);
    void sendOnboardingEmail(User user);
    void sendNewEventEmail(List<User> users, Event event);
    void sendEventUpdateEmail(List<User> participants, Event event);
}
