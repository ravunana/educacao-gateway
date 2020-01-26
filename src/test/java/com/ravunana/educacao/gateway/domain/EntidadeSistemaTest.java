package com.ravunana.educacao.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ravunana.educacao.gateway.web.rest.TestUtil;

public class EntidadeSistemaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EntidadeSistema.class);
        EntidadeSistema entidadeSistema1 = new EntidadeSistema();
        entidadeSistema1.setId(1L);
        EntidadeSistema entidadeSistema2 = new EntidadeSistema();
        entidadeSistema2.setId(entidadeSistema1.getId());
        assertThat(entidadeSistema1).isEqualTo(entidadeSistema2);
        entidadeSistema2.setId(2L);
        assertThat(entidadeSistema1).isNotEqualTo(entidadeSistema2);
        entidadeSistema1.setId(null);
        assertThat(entidadeSistema1).isNotEqualTo(entidadeSistema2);
    }
}
