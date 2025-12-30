package com.EmployeeManagement.EmployeeManagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private boolean result;
    private String message;
    private UserData data;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserData {
        private Integer userId;
        private String username;
        private String email;
    }
}