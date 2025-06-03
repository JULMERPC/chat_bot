package com.example.chatbot.controller;

import com.example.chatbot.dto.ChatDto;
import com.example.chatbot.dto.ChatRequestDto;
import com.example.chatbot.service.HackatonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
//@CrossOrigin("*")
public class ChatController {

    @Autowired
    private WebClient groqWebClient;

    @Autowired
    private HackatonService hackatonService;

    @PostMapping
    public Mono<String> generarRespuesta(@RequestBody ChatDto chatDto) {
        String mensaje = chatDto.mensaje.toLowerCase(Locale.ROOT);

        // 1. Respuestas locales basadas en palabras clave
        if (mensaje.contains("información") || mensaje.contains("hackatón")) {
            return Mono.just(hackatonService.getInformacionGeneral());
        } else if (mensaje.contains("agenda")) {
            return Mono.just(hackatonService.getAgenda());
        } else if (mensaje.contains("recordatorio") || mensaje.contains("plazo")) {
            return Mono.just(hackatonService.getRecordatorios());
        } else if (mensaje.contains("recurso") || mensaje.contains("tutorial")) {
            for (String tech : hackatonService.getInfoHackaton().getRecursos().keySet()) {
                if (mensaje.contains(tech)) {
                    return Mono.just(hackatonService.getRecursos(tech));
                }
            }
            return Mono.just(hackatonService.getRecursos(null));
        }

        // 2. Si no encontramos una coincidencia, usamos el modelo LLM como respaldo
        ChatRequestDto request = new ChatRequestDto(
                "deepseek-r1-distill-llama-70b",
                List.of(Map.of("role", "user", "content", chatDto.mensaje)),
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
