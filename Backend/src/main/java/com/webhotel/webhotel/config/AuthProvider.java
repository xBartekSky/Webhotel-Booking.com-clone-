package com.webhotel.webhotel.config;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.webhotel.webhotel.dto.UserDto;
import com.webhotel.webhotel.service.UserService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class AuthProvider {
    private String secretKey = "7c50ab22a7b6537b327828c595c2879106f549d770ca163b57e8c55a8840d638a3619a9ec53e04707966939b14ab2c4d2125499fed96ba8d48bf924fb637bc2371012c1b2e9399ba0dedc719c17471f9a5f9b3af5b5b31051f8f6c1de30ccd895ea1437948e8dfc040e198f6834a03f6695b67de84ebb6a41b580418a455c4cfa6de330ae7b9fb65aff7037a14a56a7c7e760a892e8e765efd343245c3b5d7d62277ef3d5ad67b71e11e6d30c1345d660469b2abe99b2bfd62bf09c7be004da528261e6d3ae5377fa0e52f3169d961304a31f22756c6020716a79e3a89c0251a45130706a91318b0efc5715c814ab9b0b3bbc3f5f4352028ff92827ec98a844d";

    private final UserService userService;

    public AuthProvider(UserService userService) {
        this.userService = userService;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login) {
        Date now = new Date();
        Date duration = new Date(now.getTime() + 3600000);
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());

        return Jwts.builder()
                .setSubject(login)
                .setIssuedAt(now)
                .setExpiration(duration)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Authentication validateToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(secretKey.getBytes());
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        String login = claims.getSubject();
        UserDto user = userService.findByUsername(login);
        return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());

    }
    
}
