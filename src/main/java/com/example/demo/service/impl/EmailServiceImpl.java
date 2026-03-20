package com.example.demo.service.impl;

import com.example.demo.entity.Registration;
import com.example.demo.entity.Event;
import com.example.demo.entity.User;
import java.util.List;
import com.example.demo.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Async
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendRegistrationEmail(Registration registration, Event event) {
        new Thread(() -> {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("caggarwal483@gmail.com");
            message.setTo(registration.getEmailId());
            message.setSubject("Registration Confirmed: " + (event != null ? event.getName() : "Event"));
            
            StringBuilder body = new StringBuilder();
            body.append("Dear ").append(registration.getName()).append(",\n\n");
            body.append("You have successfully registered for the event!\n\n");
            body.append("--- Marathon Details ---\n");
            if (event != null) {
                body.append("Event Name: ").append(event.getName()).append("\n");
                body.append("Location: ").append(event.getLocation()).append("\n");
                body.append("Date: ").append(event.getDate()).append("\n");

                // Safe lookup for registered category
                com.example.demo.entity.EventCategory selectedCat = null;
                if (registration.getCategoryId() != null && event.getCategories() != null) {
                    selectedCat = event.getCategories().stream()
                            .filter(cat -> registration.getCategoryId().equals(cat.getId()))
                            .findFirst().orElse(null);
                }

                if (selectedCat != null) {
                    body.append("Distance: ").append(selectedCat.getDistance()).append(" km\n");
                    body.append("Price: INR ").append(selectedCat.getPrice()).append("\n");
                } else {
                    body.append("Available Distances: ");
                    event.getCategories().forEach(cat -> body.append(cat.getDistance()).append(" km  "));
                    body.append("\n");
                }
            }
            body.append("\n--- Your Registration Details ---\n");
            body.append("Bib Number: ").append(registration.getBibNumber()).append("\n");
            body.append("Payment Status: ").append(registration.getPaymentStatus()).append("\n");
            body.append("\nThank you for participating!\n");
            body.append("Best regards,\nRunEvents Team");

            message.setText(body.toString());

            try {
                mailSender.send(message);
            } catch (Exception e) {
                System.err.println("Failed to send email to " + registration.getEmailId() + ": " + e.getMessage());
                e.printStackTrace();
            }
        }).start();
    }

    @Override
    public void sendOnboardingEmail(User user) {
        new Thread(() -> {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("caggarwal483@gmail.com");
            message.setTo(user.getEmail());
            message.setSubject("Welcome to RunEvents!");
            
            StringBuilder body = new StringBuilder();
            body.append("Dear ").append(user.getName()).append(",\n\n");
            body.append("Welcome to the RunEvents community!\n\n");
            body.append("We are thrilled to have you onboard. You can now explore upcoming marathons, register for events, and manage your running journey easily through your dashboard.\n\n");
            body.append("Happy Running!\n");
            body.append("Best regards,\nRunEvents Team");

            message.setText(body.toString());

            try {
                mailSender.send(message);
            } catch (Exception e) {
                System.err.println("Failed to send onboarding email to " + user.getEmail() + ": " + e.getMessage());
                e.printStackTrace();
            }
        }).start();
    }

    @Override
    public void sendNewEventEmail(List<User> users, Event event) {
        if (users == null || users.isEmpty()) return;

        new Thread(() -> {
            for (User user : users) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("caggarwal483@gmail.com");
                message.setTo(user.getEmail());
                message.setSubject("New Marathon Event Announced: " + event.getName());
                
                StringBuilder body = new StringBuilder();
                body.append("Dear ").append(user.getName()).append(",\n\n");
                body.append("We are excited to announce a new running event!\n\n");
                body.append("--- Event Details ---\n");
                body.append("Event Name: ").append(event.getName()).append("\n");
                body.append("Location: ").append(event.getLocation()).append("\n");
                body.append("Date: ").append(event.getDate()).append("\n");
                
                body.append("Available Categories:\n");
                if (event.getCategories() != null) {
                    for (com.example.demo.entity.EventCategory cat : event.getCategories()) {
                        body.append(" - ").append(cat.getDistance()).append(" km (Price: INR ").append(cat.getPrice()).append(")\n");
                    }
                }
                body.append("Don't miss out! Register now through your dashboard.\n\n");
                body.append("Best regards,\nRunEvents Team");

                message.setText(body.toString());

                try {
                    mailSender.send(message);
                } catch (Exception e) {
                    System.err.println("Failed to send newsletter email to " + user.getEmail() + ": " + e.getMessage());
                    e.printStackTrace();
                }
            }
        }).start();
    }

    @Override
    public void sendEventUpdateEmail(List<User> users, Event event) {
        if (users == null || users.isEmpty()) return;

        new Thread(() -> {
            for (User user : users) {
                SimpleMailMessage message = new SimpleMailMessage();
                message.setFrom("caggarwal483@gmail.com");
                message.setTo(user.getEmail());
                message.setSubject("Event Updated: " + event.getName());
                
                StringBuilder body = new StringBuilder();
                body.append("Dear ").append(user.getName()).append(",\n\n");
                body.append("There has been an update to the event you are registered for: ").append(event.getName()).append(".\n\n");
                body.append("--- Updated Event Details ---\n");
                body.append("Location: ").append(event.getLocation()).append("\n");
                body.append("Date: ").append(event.getDate()).append("\n");
                
                body.append("Updated Categories:\n");
                if (event.getCategories() != null) {
                    for (com.example.demo.entity.EventCategory cat : event.getCategories()) {
                        body.append(" - ").append(cat.getDistance()).append(" km (Price: INR ").append(cat.getPrice()).append(")\n");
                    }
                }
                body.append("Please verify the updated details on your dashboard.\n\n");
                body.append("Best regards,\nRunEvents Team");

                message.setText(body.toString());

                try {
                    mailSender.send(message);
                } catch (Exception e) {
                    System.err.println("Failed to send update email to " + user.getEmail() + ": " + e.getMessage());
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
