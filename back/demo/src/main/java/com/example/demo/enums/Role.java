package com.example.demo.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority{

    ADMIN,
    CLIENT;

    @Override
    public String getAuthority() {
        return this.name();
    }

}
