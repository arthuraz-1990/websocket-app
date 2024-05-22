package com.example.websocketapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;

public class MessageDTO {

    private String message;
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dateTime;

    public MessageDTO(String message) {
        this.message = message;
        this.dateTime = LocalDateTime.now();
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public String getMessage() {
        return message;
    }
}
