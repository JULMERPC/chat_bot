package com.example.chatbot.model;

import java.util.List;
import java.util.Map;

public class InfoHackaton {

    private Informacion informacion;
    private List<String> agenda;
    private List<String> recordatorios;
    private Map<String, String> recursos;

    public Informacion getInformacion() {
        return informacion;
    }

    public void setInformacion(Informacion informacion) {
        this.informacion = informacion;
    }

    public List<String> getRecordatorios() {
        return recordatorios;
    }

    public void setRecordatorios(List<String> recordatorios) {
        this.recordatorios = recordatorios;
    }

    public List<String> getAgenda() {
        return agenda;
    }

    public void setAgenda(List<String> agenda) {
        this.agenda = agenda;
    }

    public Map<String, String> getRecursos() {
        return recursos;
    }

    public void setRecursos(Map<String, String> recursos) {
        this.recursos = recursos;
    }
}
