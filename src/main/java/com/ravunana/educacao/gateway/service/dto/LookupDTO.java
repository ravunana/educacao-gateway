package com.ravunana.educacao.gateway.service.dto;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.ravunana.educacao.gateway.domain.Lookup} entity.
 */
public class LookupDTO implements Serializable {

    private Long id;

    @NotNull
    private String nome;

    @NotNull
    private String sigla;

    @Lob
    private String descricao;

    private Boolean usuario;


    private Long entidadeId;

    private String entidadeNome;

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

    public String getSigla() {
        return sigla;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean isUsuario() {
        return usuario;
    }

    public void setUsuario(Boolean usuario) {
        this.usuario = usuario;
    }

    public Long getEntidadeId() {
        return entidadeId;
    }

    public void setEntidadeId(Long entidadeSistemaId) {
        this.entidadeId = entidadeSistemaId;
    }

    public String getEntidadeNome() {
        return entidadeNome;
    }

    public void setEntidadeNome(String entidadeSistemaNome) {
        this.entidadeNome = entidadeSistemaNome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LookupDTO lookupDTO = (LookupDTO) o;
        if (lookupDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lookupDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LookupDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sigla='" + getSigla() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", usuario='" + isUsuario() + "'" +
            ", entidadeId=" + getEntidadeId() +
            ", entidadeNome='" + getEntidadeNome() + "'" +
            "}";
    }
}
