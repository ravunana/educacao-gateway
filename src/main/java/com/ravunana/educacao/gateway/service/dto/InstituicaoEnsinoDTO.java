package com.ravunana.educacao.gateway.service.dto;
import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the {@link com.ravunana.educacao.gateway.domain.InstituicaoEnsino} entity.
 */
public class InstituicaoEnsinoDTO implements Serializable {

    private Long id;

    @NotNull
    private String nome;

    
    @Lob
    private byte[] logotipo;

    private String logotipoContentType;
    private LocalDate fundacao;

    private String fundador;

    @NotNull
    private String numero;

    private String dimensao;

    @NotNull
    private Boolean sede;

    private String tipoVinculo;

    private String unidadePagadora;

    private String tipoInstalacao;

    @NotNull
    private String provincia;

    @NotNull
    private String municipio;

    @NotNull
    private String bairro;

    @NotNull
    @Size(max = 200)
    private String rua;

    @NotNull
    @Size(max = 10)
    private String quarteirao;

    @NotNull
    @Size(max = 10)
    private String numeroPorta;


    private Long hierarquiaId;

    private String hierarquiaNome;

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

    public byte[] getLogotipo() {
        return logotipo;
    }

    public void setLogotipo(byte[] logotipo) {
        this.logotipo = logotipo;
    }

    public String getLogotipoContentType() {
        return logotipoContentType;
    }

    public void setLogotipoContentType(String logotipoContentType) {
        this.logotipoContentType = logotipoContentType;
    }

    public LocalDate getFundacao() {
        return fundacao;
    }

    public void setFundacao(LocalDate fundacao) {
        this.fundacao = fundacao;
    }

    public String getFundador() {
        return fundador;
    }

    public void setFundador(String fundador) {
        this.fundador = fundador;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getDimensao() {
        return dimensao;
    }

    public void setDimensao(String dimensao) {
        this.dimensao = dimensao;
    }

    public Boolean isSede() {
        return sede;
    }

    public void setSede(Boolean sede) {
        this.sede = sede;
    }

    public String getTipoVinculo() {
        return tipoVinculo;
    }

    public void setTipoVinculo(String tipoVinculo) {
        this.tipoVinculo = tipoVinculo;
    }

    public String getUnidadePagadora() {
        return unidadePagadora;
    }

    public void setUnidadePagadora(String unidadePagadora) {
        this.unidadePagadora = unidadePagadora;
    }

    public String getTipoInstalacao() {
        return tipoInstalacao;
    }

    public void setTipoInstalacao(String tipoInstalacao) {
        this.tipoInstalacao = tipoInstalacao;
    }

    public String getProvincia() {
        return provincia;
    }

    public void setProvincia(String provincia) {
        this.provincia = provincia;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getQuarteirao() {
        return quarteirao;
    }

    public void setQuarteirao(String quarteirao) {
        this.quarteirao = quarteirao;
    }

    public String getNumeroPorta() {
        return numeroPorta;
    }

    public void setNumeroPorta(String numeroPorta) {
        this.numeroPorta = numeroPorta;
    }

    public Long getHierarquiaId() {
        return hierarquiaId;
    }

    public void setHierarquiaId(Long instituicaoEnsinoId) {
        this.hierarquiaId = instituicaoEnsinoId;
    }

    public String getHierarquiaNome() {
        return hierarquiaNome;
    }

    public void setHierarquiaNome(String instituicaoEnsinoNome) {
        this.hierarquiaNome = instituicaoEnsinoNome;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        InstituicaoEnsinoDTO instituicaoEnsinoDTO = (InstituicaoEnsinoDTO) o;
        if (instituicaoEnsinoDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), instituicaoEnsinoDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InstituicaoEnsinoDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", logotipo='" + getLogotipo() + "'" +
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
            ", hierarquiaId=" + getHierarquiaId() +
            ", hierarquiaNome='" + getHierarquiaNome() + "'" +
            "}";
    }
}
