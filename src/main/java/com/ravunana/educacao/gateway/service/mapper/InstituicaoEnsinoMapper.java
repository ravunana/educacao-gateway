package com.ravunana.educacao.gateway.service.mapper;

import com.ravunana.educacao.gateway.domain.*;
import com.ravunana.educacao.gateway.service.dto.InstituicaoEnsinoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link InstituicaoEnsino} and its DTO {@link InstituicaoEnsinoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InstituicaoEnsinoMapper extends EntityMapper<InstituicaoEnsinoDTO, InstituicaoEnsino> {

    @Mapping(source = "hierarquia.id", target = "hierarquiaId")
    @Mapping(source = "hierarquia.nome", target = "hierarquiaNome")
    InstituicaoEnsinoDTO toDto(InstituicaoEnsino instituicaoEnsino);

    @Mapping(target = "instituicaoEnsinos", ignore = true)
    @Mapping(target = "removeInstituicaoEnsino", ignore = true)
    @Mapping(target = "contactoInstituicaos", ignore = true)
    @Mapping(target = "removeContactoInstituicao", ignore = true)
    @Mapping(target = "licencaSoftwares", ignore = true)
    @Mapping(target = "removeLicencaSoftware", ignore = true)
    @Mapping(target = "assinaturaDigitals", ignore = true)
    @Mapping(target = "removeAssinaturaDigital", ignore = true)
    @Mapping(source = "hierarquiaId", target = "hierarquia")
    InstituicaoEnsino toEntity(InstituicaoEnsinoDTO instituicaoEnsinoDTO);

    default InstituicaoEnsino fromId(Long id) {
        if (id == null) {
            return null;
        }
        InstituicaoEnsino instituicaoEnsino = new InstituicaoEnsino();
        instituicaoEnsino.setId(id);
        return instituicaoEnsino;
    }
}
