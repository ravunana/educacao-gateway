package com.ravunana.educacao.gateway.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ravunana.educacao.gateway.web.rest.TestUtil;

public class EntidadeSistemaDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntidadeSistemaDTO.class);
        EntidadeSistemaDTO entidadeSistemaDTO1 = new EntidadeSistemaDTO();
        entidadeSistemaDTO1.setId(1L);
        EntidadeSistemaDTO entidadeSistemaDTO2 = new EntidadeSistemaDTO();
        assertThat(entidadeSistemaDTO1).isNotEqualTo(entidadeSistemaDTO2);
        entidadeSistemaDTO2.setId(entidadeSistemaDTO1.getId());
        assertThat(entidadeSistemaDTO1).isEqualTo(entidadeSistemaDTO2);
        entidadeSistemaDTO2.setId(2L);
        assertThat(entidadeSistemaDTO1).isNotEqualTo(entidadeSistemaDTO2);
        entidadeSistemaDTO1.setId(null);
        assertThat(entidadeSistemaDTO1).isNotEqualTo(entidadeSistemaDTO2);
    }
}
