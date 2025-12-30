package com.EmployeeManagement.EmployeeManagement.service;


import com.EmployeeManagement.EmployeeManagement.model.*;
import com.EmployeeManagement.EmployeeManagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "Email already registered", null);
        }

        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(false, "Username already taken", null);
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In production, hash this!
        user.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(user);

        // Return response
        AuthResponse.UserData userData = new AuthResponse.UserData(
                savedUser.getUserId(),
                savedUser.getUsername(),
                savedUser.getEmail()
        );

        return new AuthResponse(true, "Registration successful", userData);
    }

    public AuthResponse login(LoginRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return new AuthResponse(false, "Invalid email or password", null);
        }

        // Check password (In production, use BCrypt to compare hashed passwords)
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(false, "Invalid email or password", null);
        }

        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        // Return response
        AuthResponse.UserData userData = new AuthResponse.UserData(
                user.getUserId(),
                user.getUsername(),
                user.getEmail()
        );

        return new AuthResponse(true, "Login successful", userData);
    }
}