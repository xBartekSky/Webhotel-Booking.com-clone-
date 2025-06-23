package com.webhotel.webhotel.controllers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.webhotel.webhotel.dto.BookingDto;
import com.webhotel.webhotel.dto.BookingResponseDto;
import com.webhotel.webhotel.entity.Booking;
import com.webhotel.webhotel.entity.Room;
import com.webhotel.webhotel.entity.User;
import com.webhotel.webhotel.repository.BookingRepository;
import com.webhotel.webhotel.repository.RoomRepository;
import com.webhotel.webhotel.repository.UserRepository;
import com.webhotel.webhotel.service.BookingService;

@RestController
@RequestMapping("/stripe")
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
      
        Event event;

   

        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
   
        } catch (SignatureVerificationException e) {
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            System.out.println("🎯 Handling 'checkout.session.completed' event");

            var dataObjectDeserializer = event.getDataObjectDeserializer();

            if (!dataObjectDeserializer.getObject().isPresent()) {
               
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid event data object");
            }

            Object stripeObject = dataObjectDeserializer.getObject().get();

            if (!(stripeObject instanceof Session)) {
              
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unexpected event data object type");
            }

            Session session = (Session) stripeObject;

            Map<String, String> metadata = session.getMetadata();
           

            try {
                String username = metadata.get("username");
                Long roomId = Long.parseLong(metadata.get("roomId"));
                LocalDate checkIn = LocalDate.parse(metadata.get("checkInDate"));
                LocalDate checkOut = LocalDate.parse(metadata.get("checkOutDate"));
                Long userId = Long.parseLong(metadata.get("userId"));

              
                System.out.println("Username: " + username);
                System.out.println("Room ID: " + roomId);
                System.out.println("Check-In: " + checkIn);
                System.out.println("Check-Out: " + checkOut);
                System.out.println("User ID: " + userId);
                User user = userRepository.findByUsername(username).orElse(null);

                if (user == null) {
                
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
                }

                BookingDto bookingDto = new BookingDto();
                bookingDto.setUserId(userId);
                bookingDto.setRoomId(roomId);
                bookingDto.setCheckInDate(checkIn);
                bookingDto.setCheckOutDate(checkOut);
                bookingDto.setPaymentRequired(true);

                BookingResponseDto response = bookingService.bookRoom(user, bookingDto);

                if (response == null) {
                    
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Booking failed");
                }

                Booking booking = bookingRepository.findById(response.getId()).orElse(null);
                if (booking != null) {
                    booking.setPaymentIntentId(session.getPaymentIntent());
                    bookingRepository.save(booking);
                    
                } else {
                    System.out.println("Booking not found with ID: " + response.getId());
                }

            } catch (Exception e) {
             
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Webhook processing failed");
            }
        } else {
          
        }
        System.out.println("Booking was a success");
        return ResponseEntity.ok("Success");
    }

}
