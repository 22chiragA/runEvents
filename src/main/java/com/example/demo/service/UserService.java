
package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.dto.UserUpdateRequest;

import java.util.List;

public interface UserService {

    User updateUser(Long userId, UserUpdateRequest request);

    User createUser(User user);


        List<User> getAllUsers();
    User getUserById(Long id);// add this
    void deleteUser(Long id);


}