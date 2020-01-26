package com.ravunana.educacao.gateway.repository.search;

import com.ravunana.educacao.gateway.domain.InstituicaoEnsino;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link InstituicaoEnsino} entity.
 */
public interface InstituicaoEnsinoSearchRepository extends ElasticsearchRepository<InstituicaoEnsino, Long> {
}
