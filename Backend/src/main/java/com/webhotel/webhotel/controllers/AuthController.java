package com.webhotel.webhotel.controllers;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.webhotel.webhotel.config.AuthProvider;
import com.webhotel.webhotel.dto.LoginDto;
import com.webhotel.webhotel.dto.RegisterDto;
import com.webhotel.webhotel.dto.UserDto;
import com.webhotel.webhotel.dto.UserInfoDto;
import com.webhotel.webhotel.entity.User;
import com.webhotel.webhotel.mapper.UserMapper;
import com.webhotel.webhotel.repository.UserRepository;
import com.webhotel.webhotel.service.UserService;

import jakarta.validation.Valid;

@RestController
public class AuthController {
    private final UserService userService;
    private final AuthProvider authProvider;
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public AuthController(UserService userService, AuthProvider authProvider, UserRepository userRepository,
            UserMapper userMapper) {
        this.userService = userService;
        this.authProvider = authProvider;
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody @Valid RegisterDto user) {
        UserDto createdUser = userService.register(user);
        return ResponseEntity.created(URI.create("/users/" + createdUser.getId())).body(createdUser);
    }

    @PostMapping("/api/login")
    public ResponseEntity<UserDto> login(@RequestBody @Valid LoginDto loginDto) {
        System.out.println("Login request: email = " + loginDto.getEmail() + ",password = " + loginDto.getPassword());

        UserDto userDto = userService.login(loginDto);
        userDto.setToken(authProvider.createToken(userDto.getUsername()));
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/auth/github")
    public ResponseEntity<Void> handleGithubLogin(OAuth2AuthenticationToken authentication) {
        OAuth2User user = (OAuth2User) authentication.getPrincipal();
        String username = user.getAttribute("login");
        String email = user.getAttribute("email");

        UserDto userDto;
        try {
            userDto = userService.findByUsername(username);
        } catch (Exception e) {
            userDto = userService.createUserFromOAuth(username, email);
        }

        String token = authProvider.createToken(userDto.getUsername());

       
        String frontendUrl = "http://localhost:5173/login?token=" + token;
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", frontendUrl)
                .build();
    }

    @GetMapping("/myaccount")
    public ResponseEntity<UserDto> getCurrentUser() {
        String username = userService.getCurrentUsernameFromToken();
        UserDto userDto = userService.findByUsername(username);

        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserInfoDto> getUserInfo(@RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        Authentication authentication = authProvider.validateToken(token);
        String username = ((UserDto) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserInfoDto userInfoDto = userMapper.userToUserInfoDto(user);

        return ResponseEntity.ok(userInfoDto);
    }

    @PutMapping("/userinfo")
    public ResponseEntity<UserInfoDto> updateUserInfo(@RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody UserInfoDto userInfoDto) {
        String token = authorizationHeader.replace("Bearer ", "");
        Authentication authentication = authProvider.validateToken(token);
        String username = ((UserDto) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getUsername().equals(userInfoDto.getUsername())) {
            boolean usernameExists = userRepository.existsByUsername(userInfoDto.getUsername());
            if (usernameExists) {
                throw new RuntimeException("Username already taken.");
            }
        }
        Long userid = user.getId();
        String userpass = user.getPassword();
        user = userMapper.userInfoDtoToUser(userInfoDto);
        user.setId(userid);
        user.setPassword(userpass);
        userRepository.save(user);

        UserInfoDto updatedUserInfoDto = userMapper.userToUserInfoDto(user);
        return ResponseEntity.ok(updatedUserInfoDto);
    }

}
