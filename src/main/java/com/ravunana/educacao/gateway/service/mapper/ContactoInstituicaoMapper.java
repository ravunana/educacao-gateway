package com.ravunana.educacao.gateway.service.mapper;

import com.ravunana.educacao.gateway.domain.*;
import com.ravunana.educacao.gateway.service.dto.ContactoInstituicaoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link ContactoInstituicao} and its DTO {@link ContactoInstituicaoDTO}.
 */
@Mapper(componentModel = "spring", uses = {InstituicaoEnsinoMapper.class})
public interface ContactoInstituicaoMapper extends EntityMapper<ContactoInstituicaoDTO, ContactoInstituicao> {

    @Mapping(source = "instituicaoEnsino.id", target = "instituicaoEnsinoId")
    @Mapping(source = "instituicaoEnsino.nome", target = "instituicaoEnsinoNome")
    ContactoInstituicaoDTO toDto(ContactoInstituicao contactoInstituicao);

    @Mapping(source = "instituicaoEnsinoId", target = "instituicaoEnsino")
    ContactoInstituicao toEntity(ContactoInstituicaoDTO contactoInstituicaoDTO);

    default ContactoInstituicao fromId(Long id) {
        if (id == null) {
            return null;
        }
        ContactoInstituicao contactoInstituicao = new ContactoInstituicao();
        contactoInstituicao.setId(id);
        return contactoInstituicao;
    }
}
