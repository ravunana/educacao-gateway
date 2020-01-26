package com.ravunana.educacao.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class EntidadeSistemaMapperTest {

    private EntidadeSistemaMapper entidadeSistemaMapper;

    @BeforeEach
    public void setUp() {
        entidadeSistemaMapper = new EntidadeSistemaMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(entidadeSistemaMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(entidadeSistemaMapper.fromId(null)).isNull();
    }
}
