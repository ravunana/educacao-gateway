package com.ravunana.educacao.gateway.service.mapper;

import com.ravunana.educacao.gateway.domain.*;
import com.ravunana.educacao.gateway.service.dto.LicencaSoftwareDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link LicencaSoftware} and its DTO {@link LicencaSoftwareDTO}.
 */
@Mapper(componentModel = "spring", uses = {InstituicaoEnsinoMapper.class, SoftwareMapper.class})
public interface LicencaSoftwareMapper extends EntityMapper<LicencaSoftwareDTO, LicencaSoftware> {

    @Mapping(source = "instituicaoEnsino.id", target = "instituicaoEnsinoId")
    @Mapping(source = "instituicaoEnsino.nome", target = "instituicaoEnsinoNome")
    @Mapping(source = "software.id", target = "softwareId")
    @Mapping(source = "software.nome", target = "softwareNome")
    LicencaSoftwareDTO toDto(LicencaSoftware licencaSoftware);

    @Mapping(source = "instituicaoEnsinoId", target = "instituicaoEnsino")
    @Mapping(source = "softwareId", target = "software")
    LicencaSoftware toEntity(LicencaSoftwareDTO licencaSoftwareDTO);

    default LicencaSoftware fromId(Long id) {
        if (id == null) {
            return null;
        }
        LicencaSoftware licencaSoftware = new LicencaSoftware();
        licencaSoftware.setId(id);
        return licencaSoftware;
    }
}
