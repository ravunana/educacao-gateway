package com.ravunana.educacao.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A InstituicaoEnsino.
 */
@Entity
@Table(name = "instituicao_ensino")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "instituicaoensino")
public class InstituicaoEnsino implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false, unique = true)
    private String nome;

    
    @Lob
    @Column(name = "logotipo", nullable = false)
    private byte[] logotipo;

    @Column(name = "logotipo_content_type", nullable = false)
    private String logotipoContentType;

    @Column(name = "fundacao")
    private LocalDate fundacao;

    @Column(name = "fundador")
    private String fundador;

    @NotNull
    @Column(name = "numero", nullable = false, unique = true)
    private String numero;

    @Column(name = "dimensao")
    private String dimensao;

    @NotNull
    @Column(name = "sede", nullable = false)
    private Boolean sede;

    @Column(name = "tipo_vinculo")
    private String tipoVinculo;

    @Column(name = "unidade_pagadora")
    private String unidadePagadora;

    @Column(name = "tipo_instalacao")
    private String tipoInstalacao;

    @NotNull
    @Column(name = "provincia", nullable = false)
    private String provincia;

    @NotNull
    @Column(name = "municipio", nullable = false)
    private String municipio;

    @NotNull
    @Column(name = "bairro", nullable = false)
    private String bairro;

    @NotNull
    @Size(max = 200)
    @Column(name = "rua", length = 200, nullable = false)
    private String rua;

    @NotNull
    @Size(max = 10)
    @Column(name = "quarteirao", length = 10, nullable = false)
    private String quarteirao;

    @NotNull
    @Size(max = 10)
    @Column(name = "numero_porta", length = 10, nullable = false)
    private String numeroPorta;

    @OneToMany(mappedBy = "hierarquia")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<InstituicaoEnsino> instituicaoEnsinos = new HashSet<>();

    @OneToMany(mappedBy = "instituicaoEnsino")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ContactoInstituicao> contactoInstituicaos = new HashSet<>();

    @OneToMany(mappedBy = "instituicaoEnsino")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<LicencaSoftware> licencaSoftwares = new HashSet<>();

    @OneToMany(mappedBy = "instituicao")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AssinaturaDigital> assinaturaDigitals = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("instituicaoEnsinos")
    private InstituicaoEnsino hierarquia;

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

    public InstituicaoEnsino nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public byte[] getLogotipo() {
        return logotipo;
    }

    public InstituicaoEnsino logotipo(byte[] logotipo) {
        this.logotipo = logotipo;
        return this;
    }

    public void setLogotipo(byte[] logotipo) {
        this.logotipo = logotipo;
    }

    public String getLogotipoContentType() {
        return logotipoContentType;
    }

    public InstituicaoEnsino logotipoContentType(String logotipoContentType) {
        this.logotipoContentType = logotipoContentType;
        return this;
    }

    public void setLogotipoContentType(String logotipoContentType) {
        this.logotipoContentType = logotipoContentType;
    }

    public LocalDate getFundacao() {
        return fundacao;
    }

    public InstituicaoEnsino fundacao(LocalDate fundacao) {
        this.fundacao = fundacao;
        return this;
    }

    public void setFundacao(LocalDate fundacao) {
        this.fundacao = fundacao;
    }

    public String getFundador() {
        return fundador;
    }

    public InstituicaoEnsino fundador(String fundador) {
        this.fundador = fundador;
        return this;
    }

    public void setFundador(String fundador) {
        this.fundador = fundador;
    }

    public String getNumero() {
        return numero;
    }

    public InstituicaoEnsino numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getDimensao() {
        return dimensao;
    }

    public InstituicaoEnsino dimensao(String dimensao) {
        this.dimensao = dimensao;
        return this;
    }

    public void setDimensao(String dimensao) {
        this.dimensao = dimensao;
    }

    public Boolean isSede() {
        return sede;
    }

    public InstituicaoEnsino sede(Boolean sede) {
        this.sede = sede;
        return this;
    }

    public void setSede(Boolean sede) {
        this.sede = sede;
    }

    public String getTipoVinculo() {
        return tipoVinculo;
    }

    public InstituicaoEnsino tipoVinculo(String tipoVinculo) {
        this.tipoVinculo = tipoVinculo;
        return this;
    }

    public void setTipoVinculo(String tipoVinculo) {
        this.tipoVinculo = tipoVinculo;
    }

    public String getUnidadePagadora() {
        return unidadePagadora;
    }

    public InstituicaoEnsino unidadePagadora(String unidadePagadora) {
        this.unidadePagadora = unidadePagadora;
        return this;
    }

    public void setUnidadePagadora(String unidadePagadora) {
        this.unidadePagadora = unidadePagadora;
    }

    public String getTipoInstalacao() {
        return tipoInstalacao;
    }

    public InstituicaoEnsino tipoInstalacao(String tipoInstalacao) {
        this.tipoInstalacao = tipoInstalacao;
        return this;
    }

    public void setTipoInstalacao(String tipoInstalacao) {
        this.tipoInstalacao = tipoInstalacao;
    }

    public String getProvincia() {
        return provincia;
    }

    public InstituicaoEnsino provincia(String provincia) {
        this.provincia = provincia;
        return this;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getMunicipio() {
        return municipio;
    }

    public InstituicaoEnsino municipio(String municipio) {
        this.municipio = municipio;
        return this;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getBairro() {
        return bairro;
    }

    public InstituicaoEnsino bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getRua() {
        return rua;
    }

    public InstituicaoEnsino rua(String rua) {
        this.rua = rua;
        return this;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getQuarteirao() {
        return quarteirao;
    }

    public InstituicaoEnsino quarteirao(String quarteirao) {
        this.quarteirao = quarteirao;
        return this;
    }

    public void setQuarteirao(String quarteirao) {
        this.quarteirao = quarteirao;
    }

    public String getNumeroPorta() {
        return numeroPorta;
    }

    public InstituicaoEnsino numeroPorta(String numeroPorta) {
        this.numeroPorta = numeroPorta;
        return this;
    }

    public void setNumeroPorta(String numeroPorta) {
        this.numeroPorta = numeroPorta;
    }

    public Set<InstituicaoEnsino> getInstituicaoEnsinos() {
        return instituicaoEnsinos;
    }

    public InstituicaoEnsino instituicaoEnsinos(Set<InstituicaoEnsino> instituicaoEnsinos) {
        this.instituicaoEnsinos = instituicaoEnsinos;
        return this;
    }

    public InstituicaoEnsino addInstituicaoEnsino(InstituicaoEnsino instituicaoEnsino) {
        this.instituicaoEnsinos.add(instituicaoEnsino);
        instituicaoEnsino.setHierarquia(this);
        return this;
    }

    public InstituicaoEnsino removeInstituicaoEnsino(InstituicaoEnsino instituicaoEnsino) {
        this.instituicaoEnsinos.remove(instituicaoEnsino);
        instituicaoEnsino.setHierarquia(null);
        return this;
    }

    public void setInstituicaoEnsinos(Set<InstituicaoEnsino> instituicaoEnsinos) {
        this.instituicaoEnsinos = instituicaoEnsinos;
    }

    public Set<ContactoInstituicao> getContactoInstituicaos() {
        return contactoInstituicaos;
    }

    public InstituicaoEnsino contactoInstituicaos(Set<ContactoInstituicao> contactoInstituicaos) {
        this.contactoInstituicaos = contactoInstituicaos;
        return this;
    }

    public InstituicaoEnsino addContactoInstituicao(ContactoInstituicao contactoInstituicao) {
        this.contactoInstituicaos.add(contactoInstituicao);
        contactoInstituicao.setInstituicaoEnsino(this);
        return this;
    }

    public InstituicaoEnsino removeContactoInstituicao(ContactoInstituicao contactoInstituicao) {
        this.contactoInstituicaos.remove(contactoInstituicao);
        contactoInstituicao.setInstituicaoEnsino(null);
        return this;
    }

    public void setContactoInstituicaos(Set<ContactoInstituicao> contactoInstituicaos) {
        this.contactoInstituicaos = contactoInstituicaos;
    }

    public Set<LicencaSoftware> getLicencaSoftwares() {
        return licencaSoftwares;
    }

    public InstituicaoEnsino licencaSoftwares(Set<LicencaSoftware> licencaSoftwares) {
        this.licencaSoftwares = licencaSoftwares;
        return this;
    }

    public InstituicaoEnsino addLicencaSoftware(LicencaSoftware licencaSoftware) {
        this.licencaSoftwares.add(licencaSoftware);
        licencaSoftware.setInstituicaoEnsino(this);
        return this;
    }

    public InstituicaoEnsino removeLicencaSoftware(LicencaSoftware licencaSoftware) {
        this.licencaSoftwares.remove(licencaSoftware);
        licencaSoftware.setInstituicaoEnsino(null);
        return this;
    }

    public void setLicencaSoftwares(Set<LicencaSoftware> licencaSoftwares) {
        this.licencaSoftwares = licencaSoftwares;
    }

    public Set<AssinaturaDigital> getAssinaturaDigitals() {
        return assinaturaDigitals;
    }

    public InstituicaoEnsino assinaturaDigitals(Set<AssinaturaDigital> assinaturaDigitals) {
        this.assinaturaDigitals = assinaturaDigitals;
        return this;
    }

    public InstituicaoEnsino addAssinaturaDigital(AssinaturaDigital assinaturaDigital) {
        this.assinaturaDigitals.add(assinaturaDigital);
        assinaturaDigital.setInstituicao(this);
        return this;
    }

    public InstituicaoEnsino removeAssinaturaDigital(AssinaturaDigital assinaturaDigital) {
        this.assinaturaDigitals.remove(assinaturaDigital);
        assinaturaDigital.setInstituicao(null);
        return this;
    }

    public void setAssinaturaDigitals(Set<AssinaturaDigital> assinaturaDigitals) {
        this.assinaturaDigitals = assinaturaDigitals;
    }

    public InstituicaoEnsino getHierarquia() {
        return hierarquia;
    }

    public InstituicaoEnsino hierarquia(InstituicaoEnsino instituicaoEnsino) {
        this.hierarquia = instituicaoEnsino;
        return this;
    }

    public void setHierarquia(InstituicaoEnsino instituicaoEnsino) {
        this.hierarquia = instituicaoEnsino;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof InstituicaoEnsino)) {
            return false;
        }
        return id != null && id.equals(((InstituicaoEnsino) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "InstituicaoEnsino{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", logotipo='" + getLogotipo() + "'" +
            ", logotipoContentType='" + getLogotipoContentType() + "'" +
            ", fundacao='" + getFundacao() + "'" +
            ", fundador='" + getFundador() + "'" +
            ", numero='" + getNumero() + "'" +
            ", dimensao='" + getDimensao() + "'" +
            ", sede='" + isSede() + "'" +
            ", tipoVinculo='" + getTipoVinculo() + "'" +
            ", unidadePagadora='" + getUnidadePagadora() + "'" +
            ", tipoInstalacao='" + getTipoInstalacao() + "'" +
            ", provincia='" + getProvincia() + "'" +
            ", municipio='" + getMunicipio() + "'" +
            ", bairro='" + getBairro() + "'" +
            ", rua='" + getRua() + "'" +
            ", quarteirao='" + getQuarteirao() + "'" +
            ", numeroPorta='" + getNumeroPorta() + "'" +
            "}";
    }
}
