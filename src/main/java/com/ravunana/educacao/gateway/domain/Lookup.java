package com.ravunana.educacao.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A Lookup.
 */
@Entity
@Table(name = "lookup")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "lookup")
public class Lookup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    @NotNull
    @Column(name = "sigla", nullable = false, unique = true)
    private String sigla;

    @Lob
    @Column(name = "descricao")
    private String descricao;

    @Column(name = "usuario")
    private Boolean usuario;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("lookups")
    private EntidadeSistema entidade;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Lookup nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public Lookup sigla(String sigla) {
        this.sigla = sigla;
        return this;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public String getDescricao() {
        return descricao;
    }

    public Lookup descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Boolean isUsuario() {
        return usuario;
    }

    public Lookup usuario(Boolean usuario) {
        this.usuario = usuario;
        return this;
    }

    public void setUsuario(Boolean usuario) {
        this.usuario = usuario;
    }

    public EntidadeSistema getEntidade() {
        return entidade;
    }

    public Lookup entidade(EntidadeSistema entidadeSistema) {
        this.entidade = entidadeSistema;
        return this;
    }

    public void setEntidade(EntidadeSistema entidadeSistema) {
        this.entidade = entidadeSistema;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Lookup)) {
            return false;
        }
        return id != null && id.equals(((Lookup) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Lookup{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sigla='" + getSigla() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", usuario='" + isUsuario() + "'" +
            "}";
    }
}
