package com.ravunana.educacao.gateway.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.FieldType;
import java.io.Serializable;

/**
 * A ContactoInstituicao.
 */
@Entity
@Table(name = "contacto_instituicao")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "contactoinstituicao")
public class ContactoInstituicao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @org.springframework.data.elasticsearch.annotations.Field(type = FieldType.Keyword)
    private Long id;

    @NotNull
    @Column(name = "tipo_contacto", nullable = false)
    private String tipoContacto;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @NotNull
    @Column(name = "contacto", nullable = false, unique = true)
    private String contacto;

    @Column(name = "mostrar_documento")
    private Boolean mostrarDocumento;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("contactoInstituicaos")
    private InstituicaoEnsino instituicaoEnsino;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTipoContacto() {
        return tipoContacto;
    }

    public ContactoInstituicao tipoContacto(String tipoContacto) {
        this.tipoContacto = tipoContacto;
        return this;
    }

    public void setTipoContacto(String tipoContacto) {
        this.tipoContacto = tipoContacto;
    }

    public String getDescricao() {
        return descricao;
    }

    public ContactoInstituicao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getContacto() {
        return contacto;
    }

    public ContactoInstituicao contacto(String contacto) {
        this.contacto = contacto;
        return this;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }

    public Boolean isMostrarDocumento() {
        return mostrarDocumento;
    }

    public ContactoInstituicao mostrarDocumento(Boolean mostrarDocumento) {
        this.mostrarDocumento = mostrarDocumento;
        return this;
    }

    public void setMostrarDocumento(Boolean mostrarDocumento) {
        this.mostrarDocumento = mostrarDocumento;
    }

    public InstituicaoEnsino getInstituicaoEnsino() {
        return instituicaoEnsino;
    }

    public ContactoInstituicao instituicaoEnsino(InstituicaoEnsino instituicaoEnsino) {
        this.instituicaoEnsino = instituicaoEnsino;
        return this;
    }

    public void setInstituicaoEnsino(InstituicaoEnsino instituicaoEnsino) {
        this.instituicaoEnsino = instituicaoEnsino;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContactoInstituicao)) {
            return false;
        }
        return id != null && id.equals(((ContactoInstituicao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ContactoInstituicao{" +
            "id=" + getId() +
            ", tipoContacto='" + getTipoContacto() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", contacto='" + getContacto() + "'" +
            ", mostrarDocumento='" + isMostrarDocumento() + "'" +
            "}";
    }
}
