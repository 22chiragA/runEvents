package com.example.demo.service;

import com.example.demo.entity.Event;
import java.util.List;

public interface EventService {

    Event createEvent(Event event);

    List<Event> getAllEvents();

    Event getEventById(Long id);

    void deleteEvent(Long id);

    Event updateEvent(Long id, Event event);
}