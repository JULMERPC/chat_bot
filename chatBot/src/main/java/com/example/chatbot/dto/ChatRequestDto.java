package com.example.chatbot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRequestDto {
    private String model;
    private List<Map<String, String>> messages;
    private Double temperature;
    private Double top_p;
    private Integer max_tokens;
    private Boolean stream;
}
