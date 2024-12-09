package com.example.invest_app_backend.controllers;

import com.example.invest_app_backend.domain.user.User;
import com.example.invest_app_backend.dto.LoginRequestDTO;
import com.example.invest_app_backend.dto.RegisterRequestDTO;
import com.example.invest_app_backend.dto.ResponseDTO;
import com.example.invest_app_backend.infra.security.TokenService;
import com.example.invest_app_backend.reposritories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "Content-Type, Authorization")
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody LoginRequestDTO body) {
        User user = repository.findByEmail(body.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = tokenService.generateToken(user);
            // Incluindo role no response
            return ResponseEntity.ok(new ResponseDTO(user.getName(), token, user.getRole()));
        }

        return ResponseEntity.badRequest().body(new ResponseDTO("Invalid credentials", null, null));
    }

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody RegisterRequestDTO body) {
        Optional<User> user = this.repository.findByEmail(body.email());

        if (user.isPresent()) {
            return ResponseEntity.badRequest().body(new ResponseDTO("Email already in use", null, null));
        }

        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(body.password()));
        newUser.setEmail(body.email());
        newUser.setName(body.name());
        //  'user' defined as default
        newUser.setRole("user");
        this.repository.save(newUser);

        String token = this.tokenService.generateToken(newUser);
        return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token, newUser.getRole()));
    }

    @PostMapping("/create-admin")
    @PreAuthorize("hasRole('admin')")
    public ResponseEntity<ResponseDTO> createAdmin(@RequestBody RegisterRequestDTO body) {
        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(body.password()));
        newUser.setEmail(body.email());
        newUser.setName(body.name());
        newUser.setRole("admin"); // admin role
        this.repository.save(newUser);

        String token = tokenService.generateToken(newUser);
        return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token, newUser.getRole()));
    }
}


