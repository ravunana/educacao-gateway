package com.ravunana.educacao.gateway.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;

/**
 * Criteria class for the {@link com.ravunana.educacao.gateway.domain.EntidadeSistema} entity. This class is used
 * in {@link com.ravunana.educacao.gateway.web.rest.EntidadeSistemaResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /entidade-sistemas?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class EntidadeSistemaCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nome;

    private LongFilter lookupId;

    public EntidadeSistemaCriteria(){
    }

    public EntidadeSistemaCriteria(EntidadeSistemaCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.nome = other.nome == null ? null : other.nome.copy();
        this.lookupId = other.lookupId == null ? null : other.lookupId.copy();
    }

    @Override
    public EntidadeSistemaCriteria copy() {
        return new EntidadeSistemaCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getNome() {
        return nome;
    }

    public void setNome(StringFilter nome) {
        this.nome = nome;
    }

    public LongFilter getLookupId() {
        return lookupId;
    }

    public void setLookupId(LongFilter lookupId) {
        this.lookupId = lookupId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final EntidadeSistemaCriteria that = (EntidadeSistemaCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nome, that.nome) &&
            Objects.equals(lookupId, that.lookupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nome,
        lookupId
        );
    }

    @Override
    public String toString() {
        return "EntidadeSistemaCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nome != null ? "nome=" + nome + ", " : "") +
                (lookupId != null ? "lookupId=" + lookupId + ", " : "") +
            "}";
    }

}
