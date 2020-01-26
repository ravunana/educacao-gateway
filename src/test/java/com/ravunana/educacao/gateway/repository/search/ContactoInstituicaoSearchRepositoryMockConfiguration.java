package com.ravunana.educacao.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link ContactoInstituicaoSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class ContactoInstituicaoSearchRepositoryMockConfiguration {

    @MockBean
    private ContactoInstituicaoSearchRepository mockContactoInstituicaoSearchRepository;

}
