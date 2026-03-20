package com.example.demo.service.impl;

import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;
import com.example.demo.entity.User;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.RegistrationRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.EmailService;
import com.example.demo.service.EventService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public Event createEvent(Event event) {
        if (event.getCategories() != null) {
            for (com.example.demo.entity.EventCategory cat : event.getCategories()) {
                cat.setEvent(event);
            }
        }
        Event savedEvent = eventRepository.save(event);
        try {
            List<User> subscribers = userRepository.findByIsSubscribedTrue();
            emailService.sendNewEventEmail(subscribers, savedEvent);
        } catch (Exception e) {
            System.err.println("Failed to send new event emails: " + e.getMessage());
            e.printStackTrace();
        }
        return savedEvent;
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event getEventById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    @Override
    @Transactional
    public void deleteEvent(Long id) {
        // Delete all registrations associated with this event first to satisfy foreign key constraints
        registrationRepository.findByEventId(id).forEach(reg -> {
            registrationRepository.delete(reg);
        });
        eventRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Event updateEvent(Long id, Event updatedEvent) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        
        event.setName(updatedEvent.getName());
        event.setDate(updatedEvent.getDate());
        event.setLocation(updatedEvent.getLocation());

        // Safe update of categories
        if (updatedEvent.getCategories() != null) {
            java.util.Map<Long, com.example.demo.entity.EventCategory> existingCats = new java.util.HashMap<>();
            for (com.example.demo.entity.EventCategory c : event.getCategories()) {
                if (c.getId() != null) existingCats.put(c.getId(), c);
            }

            java.util.List<com.example.demo.entity.EventCategory> updatedList = new java.util.ArrayList<>();

            for (com.example.demo.entity.EventCategory cat : updatedEvent.getCategories()) {
                if (cat.getId() != null && existingCats.containsKey(cat.getId())) {
                    com.example.demo.entity.EventCategory existing = existingCats.get(cat.getId());
                    existing.setDistance(cat.getDistance());
                    existing.setPrice(cat.getPrice());
                    existing.setMaxParticipants(cat.getMaxParticipants());
                    updatedList.add(existing);
                } else {
                    cat.setEvent(event);
                    updatedList.add(cat);
                }
            }
            event.getCategories().clear();
            event.getCategories().addAll(updatedList);
        } else {
            event.getCategories().clear();
        }

        Event savedEvent = eventRepository.save(event);

        try {
            List<Registration> registrations = registrationRepository.findByEventId(id);
            if (registrations != null && !registrations.isEmpty()) {
                List<User> participants = registrations.stream()
                        .map(reg -> User.builder()
                                .name(reg.getName())
                                .email(reg.getEmailId())
                                .build())
                        .collect(java.util.stream.Collectors.toList());
                
                emailService.sendEventUpdateEmail(participants, savedEvent);
            }
        } catch (Exception e) {
             System.err.println("Failed to send update email: " + e.getMessage());
             e.printStackTrace();
        }

        return savedEvent;
    }
}