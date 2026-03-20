package com.example.demo.controller;

import com.example.demo.dto.UserUpdateRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // Get user profile
    @GetMapping("/{id}")
    public User getProfile(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    // Update profile
    @PutMapping("/{id}")
    public User updateProfile(@PathVariable("id") Long id,
                              @RequestBody UserUpdateRequest request) {

        return userService.updateUser(id, request);
    }

}