package com.example.chatbot.service;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.chatbot.model.InfoHackaton;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Service
public class HackatonService {

    private InfoHackaton infoHackaton;

    @PostConstruct
    public void init() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = getClass().getClassLoader().getResourceAsStream("info_hackaton.json");
        this.infoHackaton = mapper.readValue(is, InfoHackaton.class);
    }

    public InfoHackaton getInfoHackaton() {
        return infoHackaton;
    }

    public String getInformacionGeneral() {
        return infoHackaton.getInformacion().getDescripcion() + " " +
                "Reglas: " + infoHackaton.getInformacion().getReglas() + " " +
                "Premios: " + infoHackaton.getInformacion().getPremios();
    }

    public String getAgenda() {
        return String.join("\n", infoHackaton.getAgenda());
    }

    public String getRecordatorios() {
        return String.join("\n", infoHackaton.getRecordatorios());
    }

    public String getRecursos(String tecnologia) {
        if (tecnologia != null && infoHackaton.getRecursos().containsKey(tecnologia.toLowerCase())) {
            return "Aquí tienes un recurso sobre " + tecnologia + ": " + infoHackaton.getRecursos().get(tecnologia.toLowerCase());
        } else {
            StringBuilder sb = new StringBuilder("Recursos útiles:\n");
            infoHackaton.getRecursos().forEach((k,v) -> sb.append(k).append(": ").append(v).append("\n"));
            return sb.toString();
        }
    }
}
