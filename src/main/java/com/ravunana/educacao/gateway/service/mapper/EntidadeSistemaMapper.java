package com.ravunana.educacao.gateway.service.mapper;

import com.ravunana.educacao.gateway.domain.*;
import com.ravunana.educacao.gateway.service.dto.EntidadeSistemaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link EntidadeSistema} and its DTO {@link EntidadeSistemaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface EntidadeSistemaMapper extends EntityMapper<EntidadeSistemaDTO, EntidadeSistema> {


    @Mapping(target = "lookups", ignore = true)
    @Mapping(target = "removeLookup", ignore = true)
    EntidadeSistema toEntity(EntidadeSistemaDTO entidadeSistemaDTO);

    default EntidadeSistema fromId(Long id) {
        if (id == null) {
            return null;
        }
        EntidadeSistema entidadeSistema = new EntidadeSistema();
        entidadeSistema.setId(id);
        return entidadeSistema;
    }
}
