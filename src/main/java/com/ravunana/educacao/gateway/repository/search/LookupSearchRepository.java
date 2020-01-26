package com.ravunana.educacao.gateway.repository.search;

import com.ravunana.educacao.gateway.domain.Lookup;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Lookup} entity.
 */
public interface LookupSearchRepository extends ElasticsearchRepository<Lookup, Long> {
}
