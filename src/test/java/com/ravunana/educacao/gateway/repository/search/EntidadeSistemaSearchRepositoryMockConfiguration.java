package com.ravunana.educacao.gateway.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link EntidadeSistemaSearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class EntidadeSistemaSearchRepositoryMockConfiguration {

    @MockBean
    private EntidadeSistemaSearchRepository mockEntidadeSistemaSearchRepository;

}
