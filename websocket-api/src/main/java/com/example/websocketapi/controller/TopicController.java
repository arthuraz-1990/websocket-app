package com.example.websocketapi.controller;

import com.example.websocketapi.dto.MessageDTO;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TopicController {

    @MessageMapping("/message")
    @SendTo("/topic/messsages")
    public MessageDTO sendMessage(String message) throws Exception {
        MessageDTO messageDTO = new MessageDTO(message);
        Thread.sleep(1000);
        return messageDTO;
    }
}
