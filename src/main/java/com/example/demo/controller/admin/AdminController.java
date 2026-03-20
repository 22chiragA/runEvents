//package com.example.demo.controller.admin;
//
//import com.example.demo.entity.Role;
//import com.example.demo.entity.User;
//import com.example.demo.dto.SignupRequest;
//import com.example.demo.repository.RoleRepository;
//import com.example.demo.repository.UserRepository;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/admin")
//public class AdminController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private RoleRepository roleRepository;
//
//    @PostMapping("/create-admin")
//    public String createAdmin(@RequestBody SignupRequest request) {
//
//        // Fetch ADMIN role from database
//        Role role = roleRepository.findByName("ADMIN")
//                .orElseThrow(() -> new RuntimeException("Role not found"));
//
//        // Create new admin user
//        User user = User.builder()
//                .name(request.getName())
//                .email(request.getEmail())
//                .password(request.getPassword())
//                .role(role)
//                .build();
//
//        // Save admin in database
//        userRepository.save(user);
//
//        return "Admin created successfully";
//    }
//}

package com.example.demo.controller.admin;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.entity.Event;
import com.example.demo.entity.Registration;

import com.example.demo.dto.SignupRequest;
import com.example.demo.dto.RegistrationRequest;
import com.example.demo.dto.UserUpdateRequest;

import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.RegistrationRepository;

import com.example.demo.service.EventService;
import com.example.demo.service.RegistrationService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private UserService userService;

    @Autowired
    private RegistrationRepository registrationRepository;

    /*
     * 1️⃣ Create another Admin
     */
    @PostMapping("/create-admin")
    public String createAdmin(@RequestBody SignupRequest request) {

        Role role = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(role)
                .build();

        userRepository.save(user);

        return "Admin created successfully";
    }

    /*
     * 2️⃣ Create Event
     */
    @PostMapping("/events")
    public Event createEvent(@RequestBody Event event) {

        return eventService.createEvent(event);
    }

    /*
     * 3️⃣ Delete Event
     */
    @DeleteMapping("/events/{eventId}")
    public String deleteEvent(@PathVariable("eventId") Long eventId) {

        eventService.deleteEvent(eventId);

        return "Event deleted";
    }

    /*
     * 4️⃣ View Participants of Event
     */
    @GetMapping("/events/{eventId}/users")
    public List<Registration> getParticipants(@PathVariable("eventId") Long eventId) {

        return registrationService.getUsersByEvent(eventId);
    }

    /*
     * 5️⃣ Remove Participant
     */
    @DeleteMapping("/events/{eventId}/registrations/{registrationId}")
    public String removeParticipant(@PathVariable("eventId") Long eventId,
            @PathVariable("registrationId") Long registrationId) {

        registrationService.removeRegistration(eventId, registrationId);

        return "Registration removed";
    }

    /*
     * 6️⃣ Register User Manually for Event
     */
    @PostMapping("/events/{eventId}/register")
    public Registration registerUser(@PathVariable("eventId") Long eventId,
            @RequestBody RegistrationRequest request) {

        return registrationService.adminRegisterUser(eventId, request);
    }

    /*
     * 7️⃣ Update User Profile
     */
    @PutMapping("/users/{userId}")
    public User updateUser(@PathVariable("userId") Long userId,
            @RequestBody UserUpdateRequest request) {

        return userService.updateUser(userId, request);
    }

    /*
     * 8️⃣ Update Registration Details
     */
    @PutMapping("/registrations/{registrationId}")
    public Registration updateRegistration(@PathVariable("registrationId") Long registrationId,
            @RequestBody RegistrationRequest request) {

        return registrationService.updateRegistration(registrationId, request);
    }

    /*
     * 9️⃣ Get Admin Stats
     */
    @GetMapping("/stats")
    public java.util.Map<String, Object> getStats() {
        java.util.Map<String, Object> stats = new java.util.HashMap<>();
        stats.put("totalEvents", eventService.getAllEvents().size());
        stats.put("totalUsers", userRepository.count());
        stats.put("totalRegistrations", registrationRepository.count());
        return stats;
    }
}