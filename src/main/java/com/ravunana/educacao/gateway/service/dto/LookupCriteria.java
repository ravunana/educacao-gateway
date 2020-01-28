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
 * Criteria class for the {@link com.ravunana.educacao.gateway.domain.Lookup} entity. This class is used
 * in {@link com.ravunana.educacao.gateway.web.rest.LookupResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /lookups?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class LookupCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nome;

    private StringFilter sigla;

    private BooleanFilter usuario;

    private LongFilter entidadeId;

    public LookupCriteria(){
    }

    public LookupCriteria(LookupCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.nome = other.nome == null ? null : other.nome.copy();
        this.sigla = other.sigla == null ? null : other.sigla.copy();
        this.usuario = other.usuario == null ? null : other.usuario.copy();
        this.entidadeId = other.entidadeId == null ? null : other.entidadeId.copy();
    }

    @Override
    public LookupCriteria copy() {
        return new LookupCriteria(this);
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

    public StringFilter getSigla() {
        return sigla;
    }

    public void setSigla(StringFilter sigla) {
        this.sigla = sigla;
    }

    public BooleanFilter getUsuario() {
        return usuario;
    }

    public void setUsuario(BooleanFilter usuario) {
        this.usuario = usuario;
    }

    public LongFilter getEntidadeId() {
        return entidadeId;
    }

    public void setEntidadeId(LongFilter entidadeId) {
        this.entidadeId = entidadeId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final LookupCriteria that = (LookupCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nome, that.nome) &&
            Objects.equals(sigla, that.sigla) &&
            Objects.equals(usuario, that.usuario) &&
            Objects.equals(entidadeId, that.entidadeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nome,
        sigla,
        usuario,
        entidadeId
        );
    }

    @Override
    public String toString() {
        return "LookupCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nome != null ? "nome=" + nome + ", " : "") +
                (sigla != null ? "sigla=" + sigla + ", " : "") +
                (usuario != null ? "usuario=" + usuario + ", " : "") +
                (entidadeId != null ? "entidadeId=" + entidadeId + ", " : "") +
            "}";
    }

}
