package com.ravunana.educacao.gateway.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.ravunana.educacao.gateway.domain.EntidadeSistema} entity.
 */
public class EntidadeSistemaDTO implements Serializable {

    private Long id;

    @NotNull
    private String nome;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EntidadeSistemaDTO entidadeSistemaDTO = (EntidadeSistemaDTO) o;
        if (entidadeSistemaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), entidadeSistemaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EntidadeSistemaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
