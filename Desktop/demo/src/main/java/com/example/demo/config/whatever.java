package com.example.demo.config;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service("customUserDetailsService")
 class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (username.trim().isEmpty()) {
            throw new UsernameNotFoundException("username is empty");
        }

        User user = userService.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User " + username + " not found");
        }

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getGrantedAuthorities(user));
    }

    private List<GrantedAuthority> getGrantedAuthorities(User user) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        Collection<Role> roles = user.getRole();
        for (Role role:roles){
            authorities.add(new SimpleGrantedAuthority(role.getRoleName()));

        }
        return authorities;
    }

}