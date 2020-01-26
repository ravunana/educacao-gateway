package com.ravunana.educacao.gateway.repository.search;

import com.ravunana.educacao.gateway.domain.Software;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link Software} entity.
 */
public interface SoftwareSearchRepository extends ElasticsearchRepository<Software, Long> {
}
