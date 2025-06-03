package com.example.chatbot.service;

import com.example.chatbot.dto.ChatRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Autowired
    private WebClient groqWebClient;

    public Mono<String> obtenerRespuesta(String mensajeUsuario) {

        ChatRequestDto request = new ChatRequestDto(
                "deepseek-r1-distill-llama-70b", // Puedes usar también "mixtral-8x7b-32768"
                List.of(Map.of("role", "user", "content", mensajeUsuario)),
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
                .bodyToMono(Map.class)
                .map(response -> {
                    List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                    if (choices != null && !choices.isEmpty()) {
                        Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                        return message != null ? message.get("content").toString() : "Sin respuesta generada.";
                    }
                    return "No se pudo obtener respuesta del modelo.";
                });
    }
}
