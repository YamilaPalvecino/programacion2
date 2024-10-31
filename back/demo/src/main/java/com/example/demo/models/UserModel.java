package com.example.demo.models;


import com.example.demo.enums.Role;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Entity
@Table(name = "users")
public class UserModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @Size(max = 100)
    private String name;

    @Column(name = "surname", nullable = false)
    @Size(max=100)
    private String surname;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    @Size(max = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

}