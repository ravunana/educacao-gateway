package com.ravunana.educacao.gateway.repository.search;

import com.ravunana.educacao.gateway.domain.EntidadeSistema;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link EntidadeSistema} entity.
 */
public interface EntidadeSistemaSearchRepository extends ElasticsearchRepository<EntidadeSistema, Long> {
}
