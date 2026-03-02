package com.url.shortener.service;

// Lombok annotation that automatically generates:
// - getters and setters
// - toString(), equals(), hashCode()
// - required-args constructor (for final fields)
import com.url.shortener.models.User;
import lombok.Data;

// Lombok annotation that generates a no-argument constructor
// Required by Spring Security and for object creation via reflection
import lombok.NoArgsConstructor;

// Spring Security interface representing a user authority/role
import org.springframework.security.core.GrantedAuthority;

// Core Spring Security interface that represents authenticated user details
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@Data               // Generates getters, setters, equals, hashCode, toString
@NoArgsConstructor  // Generates public UserDetailsImpl()
public class UserDetailsImpl implements UserDetails {

    // Used for serialization (important when objects are stored in session / cache)
    private static final long serialVersionUID = 1L;
    private Long id;
    // Username used for authentication (usually login username or email)
    private String username;

    // Email of the user (optional, not required by UserDetails)
    private String email;

    // Encrypted password stored in database
    private String password;

    // Collection of roles/authorities assigned to the user
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(Long id,Collection<? extends GrantedAuthority> authorities, String password, String email, String username) {
        this.id = id;
        this.authorities = authorities;
        this.password = password;
        this.email = email;
        this.username = username;
    }

    public static UserDetailsImpl build(User user){
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
        return new UserDetailsImpl(
                user.getId(),
                Collections.singletonList(authority),
                user.getPassword(),
                user.getEmail(),
                user.getUsername()
        );

    }

    // Returns the authorities (roles) granted to the user
    // Example: ROLE_USER, ROLE_ADMIN
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Currently returning empty list → user has no roles
        return authorities;
    }

    // Returns the user's password used by Spring Security
    @Override
    public String getPassword() {
        // Currently returning empty string (NOT correct for real app)
        return password;
    }

    // Returns the username used by Spring Security during authentication
    @Override
    public String getUsername() {
        // Currently returning empty string (NOT correct for real app)
        return username;
    }
}
