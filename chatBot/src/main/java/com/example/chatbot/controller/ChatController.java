package com.example.chatbot.controller;


import com.example.chatbot.dto.ChatDto;
import com.example.chatbot.dto.ChatRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
//@CrossOrigin("*")

public class ChatController {

    @Autowired
    private WebClient groqWebClient;

    @PostMapping
    public Mono<String> generarRespuesta(@RequestBody ChatDto chatDto) {
        ChatRequestDto request = new ChatRequestDto(
                "deepseek-r1-distill-llama-70b",
                List.of(Map.of("role", "user", "content", "Simula la cantidad de stock de mi almacen"+chatDto.mensaje)),
                0.7,
                0.95,
                1024,
                false
        );

        return groqWebClient.post()
                .uri("/chat/completions")
                .accept(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(String.class);
    }
}