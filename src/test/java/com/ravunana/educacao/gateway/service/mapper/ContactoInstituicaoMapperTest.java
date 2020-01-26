package com.ravunana.educacao.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;


public class ContactoInstituicaoMapperTest {

    private ContactoInstituicaoMapper contactoInstituicaoMapper;

    @BeforeEach
    public void setUp() {
        contactoInstituicaoMapper = new ContactoInstituicaoMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 2L;
        assertThat(contactoInstituicaoMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(contactoInstituicaoMapper.fromId(null)).isNull();
    }
}
