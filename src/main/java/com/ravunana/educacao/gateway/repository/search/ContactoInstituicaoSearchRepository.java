package com.ravunana.educacao.gateway.repository.search;

import com.ravunana.educacao.gateway.domain.ContactoInstituicao;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link ContactoInstituicao} entity.
 */
public interface ContactoInstituicaoSearchRepository extends ElasticsearchRepository<ContactoInstituicao, Long> {
}
