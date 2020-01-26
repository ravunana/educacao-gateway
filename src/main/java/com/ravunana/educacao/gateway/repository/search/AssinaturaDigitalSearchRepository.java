package com.ravunana.educacao.gateway.repository.search;

import com.ravunana.educacao.gateway.domain.AssinaturaDigital;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link AssinaturaDigital} entity.
 */
public interface AssinaturaDigitalSearchRepository extends ElasticsearchRepository<AssinaturaDigital, Long> {
}
