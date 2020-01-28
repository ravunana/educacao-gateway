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
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link com.ravunana.educacao.gateway.domain.InstituicaoEnsino} entity. This class is used
 * in {@link com.ravunana.educacao.gateway.web.rest.InstituicaoEnsinoResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /instituicao-ensinos?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class InstituicaoEnsinoCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter nome;

    private LocalDateFilter fundacao;

    private StringFilter fundador;

    private StringFilter numero;

    private StringFilter dimensao;

    private BooleanFilter sede;

    private StringFilter tipoVinculo;

    private StringFilter unidadePagadora;

    private StringFilter tipoInstalacao;

    private StringFilter provincia;

    private StringFilter municipio;

    private StringFilter bairro;

    private StringFilter rua;

    private StringFilter quarteirao;

    private StringFilter numeroPorta;

    private LongFilter instituicaoEnsinoId;

    private LongFilter contactoInstituicaoId;

    private LongFilter licencaSoftwareId;

    private LongFilter assinaturaDigitalId;

    private LongFilter hierarquiaId;

    public InstituicaoEnsinoCriteria(){
    }

    public InstituicaoEnsinoCriteria(InstituicaoEnsinoCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.nome = other.nome == null ? null : other.nome.copy();
        this.fundacao = other.fundacao == null ? null : other.fundacao.copy();
        this.fundador = other.fundador == null ? null : other.fundador.copy();
        this.numero = other.numero == null ? null : other.numero.copy();
        this.dimensao = other.dimensao == null ? null : other.dimensao.copy();
        this.sede = other.sede == null ? null : other.sede.copy();
        this.tipoVinculo = other.tipoVinculo == null ? null : other.tipoVinculo.copy();
        this.unidadePagadora = other.unidadePagadora == null ? null : other.unidadePagadora.copy();
        this.tipoInstalacao = other.tipoInstalacao == null ? null : other.tipoInstalacao.copy();
        this.provincia = other.provincia == null ? null : other.provincia.copy();
        this.municipio = other.municipio == null ? null : other.municipio.copy();
        this.bairro = other.bairro == null ? null : other.bairro.copy();
        this.rua = other.rua == null ? null : other.rua.copy();
        this.quarteirao = other.quarteirao == null ? null : other.quarteirao.copy();
        this.numeroPorta = other.numeroPorta == null ? null : other.numeroPorta.copy();
        this.instituicaoEnsinoId = other.instituicaoEnsinoId == null ? null : other.instituicaoEnsinoId.copy();
        this.contactoInstituicaoId = other.contactoInstituicaoId == null ? null : other.contactoInstituicaoId.copy();
        this.licencaSoftwareId = other.licencaSoftwareId == null ? null : other.licencaSoftwareId.copy();
        this.assinaturaDigitalId = other.assinaturaDigitalId == null ? null : other.assinaturaDigitalId.copy();
        this.hierarquiaId = other.hierarquiaId == null ? null : other.hierarquiaId.copy();
    }

    @Override
    public InstituicaoEnsinoCriteria copy() {
        return new InstituicaoEnsinoCriteria(this);
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

    public LocalDateFilter getFundacao() {
        return fundacao;
    }

    public void setFundacao(LocalDateFilter fundacao) {
        this.fundacao = fundacao;
    }

    public StringFilter getFundador() {
        return fundador;
    }

    public void setFundador(StringFilter fundador) {
        this.fundador = fundador;
    }

    public StringFilter getNumero() {
        return numero;
    }

    public void setNumero(StringFilter numero) {
        this.numero = numero;
    }

    public StringFilter getDimensao() {
        return dimensao;
    }

    public void setDimensao(StringFilter dimensao) {
        this.dimensao = dimensao;
    }

    public BooleanFilter getSede() {
        return sede;
    }

    public void setSede(BooleanFilter sede) {
        this.sede = sede;
    }

    public StringFilter getTipoVinculo() {
        return tipoVinculo;
    }

    public void setTipoVinculo(StringFilter tipoVinculo) {
        this.tipoVinculo = tipoVinculo;
    }

    public StringFilter getUnidadePagadora() {
        return unidadePagadora;
    }

    public void setUnidadePagadora(StringFilter unidadePagadora) {
        this.unidadePagadora = unidadePagadora;
    }

    public StringFilter getTipoInstalacao() {
        return tipoInstalacao;
    }

    public void setTipoInstalacao(StringFilter tipoInstalacao) {
        this.tipoInstalacao = tipoInstalacao;
    }

    public StringFilter getProvincia() {
        return provincia;
    }

    public void setProvincia(StringFilter provincia) {
        this.provincia = provincia;
    }

    public StringFilter getMunicipio() {
        return municipio;
    }

    public void setMunicipio(StringFilter municipio) {
        this.municipio = municipio;
    }

    public StringFilter getBairro() {
        return bairro;
    }

    public void setBairro(StringFilter bairro) {
        this.bairro = bairro;
    }

    public StringFilter getRua() {
        return rua;
    }

    public void setRua(StringFilter rua) {
        this.rua = rua;
    }

    public StringFilter getQuarteirao() {
        return quarteirao;
    }

    public void setQuarteirao(StringFilter quarteirao) {
        this.quarteirao = quarteirao;
    }

    public StringFilter getNumeroPorta() {
        return numeroPorta;
    }

    public void setNumeroPorta(StringFilter numeroPorta) {
        this.numeroPorta = numeroPorta;
    }

    public LongFilter getInstituicaoEnsinoId() {
        return instituicaoEnsinoId;
    }

    public void setInstituicaoEnsinoId(LongFilter instituicaoEnsinoId) {
        this.instituicaoEnsinoId = instituicaoEnsinoId;
    }

    public LongFilter getContactoInstituicaoId() {
        return contactoInstituicaoId;
    }

    public void setContactoInstituicaoId(LongFilter contactoInstituicaoId) {
        this.contactoInstituicaoId = contactoInstituicaoId;
    }

    public LongFilter getLicencaSoftwareId() {
        return licencaSoftwareId;
    }

    public void setLicencaSoftwareId(LongFilter licencaSoftwareId) {
        this.licencaSoftwareId = licencaSoftwareId;
    }

    public LongFilter getAssinaturaDigitalId() {
        return assinaturaDigitalId;
    }

    public void setAssinaturaDigitalId(LongFilter assinaturaDigitalId) {
        this.assinaturaDigitalId = assinaturaDigitalId;
    }

    public LongFilter getHierarquiaId() {
        return hierarquiaId;
    }

    public void setHierarquiaId(LongFilter hierarquiaId) {
        this.hierarquiaId = hierarquiaId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final InstituicaoEnsinoCriteria that = (InstituicaoEnsinoCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(nome, that.nome) &&
            Objects.equals(fundacao, that.fundacao) &&
            Objects.equals(fundador, that.fundador) &&
            Objects.equals(numero, that.numero) &&
            Objects.equals(dimensao, that.dimensao) &&
            Objects.equals(sede, that.sede) &&
            Objects.equals(tipoVinculo, that.tipoVinculo) &&
            Objects.equals(unidadePagadora, that.unidadePagadora) &&
            Objects.equals(tipoInstalacao, that.tipoInstalacao) &&
            Objects.equals(provincia, that.provincia) &&
            Objects.equals(municipio, that.municipio) &&
            Objects.equals(bairro, that.bairro) &&
            Objects.equals(rua, that.rua) &&
            Objects.equals(quarteirao, that.quarteirao) &&
            Objects.equals(numeroPorta, that.numeroPorta) &&
            Objects.equals(instituicaoEnsinoId, that.instituicaoEnsinoId) &&
            Objects.equals(contactoInstituicaoId, that.contactoInstituicaoId) &&
            Objects.equals(licencaSoftwareId, that.licencaSoftwareId) &&
            Objects.equals(assinaturaDigitalId, that.assinaturaDigitalId) &&
            Objects.equals(hierarquiaId, that.hierarquiaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        nome,
        fundacao,
        fundador,
        numero,
        dimensao,
        sede,
        tipoVinculo,
        unidadePagadora,
        tipoInstalacao,
        provincia,
        municipio,
        bairro,
        rua,
        quarteirao,
        numeroPorta,
        instituicaoEnsinoId,
        contactoInstituicaoId,
        licencaSoftwareId,
        assinaturaDigitalId,
        hierarquiaId
        );
    }

    @Override
    public String toString() {
        return "InstituicaoEnsinoCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (nome != null ? "nome=" + nome + ", " : "") +
                (fundacao != null ? "fundacao=" + fundacao + ", " : "") +
                (fundador != null ? "fundador=" + fundador + ", " : "") +
                (numero != null ? "numero=" + numero + ", " : "") +
                (dimensao != null ? "dimensao=" + dimensao + ", " : "") +
                (sede != null ? "sede=" + sede + ", " : "") +
                (tipoVinculo != null ? "tipoVinculo=" + tipoVinculo + ", " : "") +
                (unidadePagadora != null ? "unidadePagadora=" + unidadePagadora + ", " : "") +
                (tipoInstalacao != null ? "tipoInstalacao=" + tipoInstalacao + ", " : "") +
                (provincia != null ? "provincia=" + provincia + ", " : "") +
                (municipio != null ? "municipio=" + municipio + ", " : "") +
                (bairro != null ? "bairro=" + bairro + ", " : "") +
                (rua != null ? "rua=" + rua + ", " : "") +
                (quarteirao != null ? "quarteirao=" + quarteirao + ", " : "") +
                (numeroPorta != null ? "numeroPorta=" + numeroPorta + ", " : "") +
                (instituicaoEnsinoId != null ? "instituicaoEnsinoId=" + instituicaoEnsinoId + ", " : "") +
                (contactoInstituicaoId != null ? "contactoInstituicaoId=" + contactoInstituicaoId + ", " : "") +
                (licencaSoftwareId != null ? "licencaSoftwareId=" + licencaSoftwareId + ", " : "") +
                (assinaturaDigitalId != null ? "assinaturaDigitalId=" + assinaturaDigitalId + ", " : "") +
                (hierarquiaId != null ? "hierarquiaId=" + hierarquiaId + ", " : "") +
            "}";
    }

}
