package com.ravunana.educacao.gateway.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.ravunana.educacao.gateway.web.rest.TestUtil;

public class ContactoInstituicaoDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactoInstituicaoDTO.class);
        ContactoInstituicaoDTO contactoInstituicaoDTO1 = new ContactoInstituicaoDTO();
        contactoInstituicaoDTO1.setId(1L);
        ContactoInstituicaoDTO contactoInstituicaoDTO2 = new ContactoInstituicaoDTO();
        assertThat(contactoInstituicaoDTO1).isNotEqualTo(contactoInstituicaoDTO2);
        contactoInstituicaoDTO2.setId(contactoInstituicaoDTO1.getId());
        assertThat(contactoInstituicaoDTO1).isEqualTo(contactoInstituicaoDTO2);
        contactoInstituicaoDTO2.setId(2L);
        assertThat(contactoInstituicaoDTO1).isNotEqualTo(contactoInstituicaoDTO2);
        contactoInstituicaoDTO1.setId(null);
        assertThat(contactoInstituicaoDTO1).isNotEqualTo(contactoInstituicaoDTO2);
    }
}
