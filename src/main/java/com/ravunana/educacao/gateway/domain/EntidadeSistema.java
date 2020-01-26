package com.ravunana.educacao.gateway.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A EntidadeSistema.
 */
@Entity
@Table(name = "entidade_sistema")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "entidadesistema")
public class EntidadeSistema implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    @OneToMany(mappedBy = "entidade")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Lookup> lookups = new HashSet<>();

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

    public EntidadeSistema nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Lookup> getLookups() {
        return lookups;
    }

    public EntidadeSistema lookups(Set<Lookup> lookups) {
        this.lookups = lookups;
        return this;
    }

    public EntidadeSistema addLookup(Lookup lookup) {
        this.lookups.add(lookup);
        lookup.setEntidade(this);
        return this;
    }

    public EntidadeSistema removeLookup(Lookup lookup) {
        this.lookups.remove(lookup);
        lookup.setEntidade(null);
        return this;
    }

    public void setLookups(Set<Lookup> lookups) {
        this.lookups = lookups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EntidadeSistema)) {
            return false;
        }
        return id != null && id.equals(((EntidadeSistema) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EntidadeSistema{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
