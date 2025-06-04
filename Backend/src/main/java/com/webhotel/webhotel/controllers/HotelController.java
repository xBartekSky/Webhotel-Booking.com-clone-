package com.webhotel.webhotel.controllers;

import com.webhotel.webhotel.config.AuthProvider;
import com.webhotel.webhotel.dto.CreateHotelDto;
import com.webhotel.webhotel.dto.HotelDto;
import com.webhotel.webhotel.dto.UserDto;
import com.webhotel.webhotel.entity.User;
import com.webhotel.webhotel.repository.UserRepository;
import com.webhotel.webhotel.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hotels")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @Autowired
    private AuthProvider authProvider;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<HotelDto> createHotel(@RequestBody CreateHotelDto hotelDto,
            @RequestHeader("Authorization") String authorizationHeader) {
        String token = authorizationHeader.replace("Bearer ", "");
        Authentication authentication = authProvider.validateToken(token);
        String username = ((UserDto) authentication.getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        HotelDto createdHotel = hotelService.createHotel(hotelDto, user);

        return new ResponseEntity<>(createdHotel, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<HotelDto>> getAllHotels() {
        List<HotelDto> hotels = hotelService.getAllHotels();
        return new ResponseEntity<>(hotels, HttpStatus.OK);
    }

    @GetMapping("/searchByCity")
    public List<HotelDto> searchHotelsByCity(@RequestParam String city) {
        return hotelService.searchHotelsByCity(city);
    }
    @GetMapping("/searchByName")
    public List<HotelDto> searchHotelsByName(@RequestParam String name) {
        return hotelService.searchHotelsByName(name);
    }
    @GetMapping("/myHotels")
public ResponseEntity<List<HotelDto>> getMyHotels(@RequestHeader("Authorization") String authorizationHeader) {
    String token = authorizationHeader.replace("Bearer ", "");
    Authentication authentication = authProvider.validateToken(token);
    String username = ((UserDto) authentication.getPrincipal()).getUsername();

    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    List<HotelDto> hotels = hotelService.getHotelsByOwnerId(user.getId());
    return ResponseEntity.ok(hotels);
}
    @GetMapping("/id/{id}")
    public ResponseEntity<HotelDto> getHotelById(@PathVariable Long id) {
        Optional<HotelDto> hotel = hotelService.getHotelById(id);
        return hotel.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }



    @DeleteMapping("/deleteHotel/{id}")
public ResponseEntity<Void> deleteHotel(
        @PathVariable Long id,
        @RequestHeader("Authorization") String authorizationHeader) {

    String token = authorizationHeader.replace("Bearer ", "");
    Authentication authentication = authProvider.validateToken(token);
    String username = ((UserDto) authentication.getPrincipal()).getUsername();

    User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));

    // Sprawdzenie czy hotel należy do użytkownika
    Optional<HotelDto> hotelOptional = hotelService.getHotelById(id);

    if (hotelOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    HotelDto hotel = hotelOptional.get();
    if (!hotel.getOwnerId().equals(user.getId())) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    hotelService.deleteHotel(id);
    return ResponseEntity.noContent().build();
}



}
