package com.example.demo.mappers;

import com.example.demo.dto.SignUpDto;
import com.example.demo.dto.UserDto;
import com.example.demo.models.UserModel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(UserModel user);

    @Mapping(target = "password", ignore = true)
    UserModel signUpToUser(SignUpDto signUpDto);

}