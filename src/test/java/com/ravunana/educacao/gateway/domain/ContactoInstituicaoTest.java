package com.ravunana.educacao.gateway.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ravunana.educacao.gateway.web.rest.TestUtil;

public class ContactoInstituicaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactoInstituicao.class);
        ContactoInstituicao contactoInstituicao1 = new ContactoInstituicao();
        contactoInstituicao1.setId(1L);
        ContactoInstituicao contactoInstituicao2 = new ContactoInstituicao();
        contactoInstituicao2.setId(contactoInstituicao1.getId());
        assertThat(contactoInstituicao1).isEqualTo(contactoInstituicao2);
        contactoInstituicao2.setId(2L);
        assertThat(contactoInstituicao1).isNotEqualTo(contactoInstituicao2);
        contactoInstituicao1.setId(null);
        assertThat(contactoInstituicao1).isNotEqualTo(contactoInstituicao2);
    }
}
