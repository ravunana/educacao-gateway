package com.ravunana.educacao.gateway.service.mapper;

import com.ravunana.educacao.gateway.domain.*;
import com.ravunana.educacao.gateway.service.dto.LookupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Lookup} and its DTO {@link LookupDTO}.
 */
@Mapper(componentModel = "spring", uses = {EntidadeSistemaMapper.class})
public interface LookupMapper extends EntityMapper<LookupDTO, Lookup> {

    @Mapping(source = "entidade.id", target = "entidadeId")
    @Mapping(source = "entidade.nome", target = "entidadeNome")
    LookupDTO toDto(Lookup lookup);

    @Mapping(source = "entidadeId", target = "entidade")
    Lookup toEntity(LookupDTO lookupDTO);

    default Lookup fromId(Long id) {
        if (id == null) {
            return null;
        }
        Lookup lookup = new Lookup();
        lookup.setId(id);
        return lookup;
    }
}
