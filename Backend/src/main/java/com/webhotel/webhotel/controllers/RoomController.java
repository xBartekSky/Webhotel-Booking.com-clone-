package com.webhotel.webhotel.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.webhotel.webhotel.config.AuthProvider;
import com.webhotel.webhotel.dto.RoomDto;
import com.webhotel.webhotel.dto.UserDto;
import com.webhotel.webhotel.entity.User;
import com.webhotel.webhotel.repository.UserRepository;
import com.webhotel.webhotel.service.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @Autowired
    private AuthProvider authProvider;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public Iterable<RoomDto> getAllRooms() {
        return roomService.getAllRooms();
    }

    @PostMapping("/")
    public ResponseEntity<RoomDto> createRoom(@RequestBody RoomDto room,
            @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        Authentication authentication = authProvider.validateToken(token);
        String username = ((UserDto) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        RoomDto createdRoom = roomService.saveRoom(room, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRoom);
    }

    @GetMapping("/{id}")
    public RoomDto getRoomById(@PathVariable Integer id) {
        return roomService.getRoomById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable Integer id) {
        roomService.deleteRoom(id);
    }
}
