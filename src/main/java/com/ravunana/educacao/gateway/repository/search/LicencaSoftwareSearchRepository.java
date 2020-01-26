package com.ravunana.educacao.gateway.repository.search;

import com.ravunana.educacao.gateway.domain.LicencaSoftware;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the {@link LicencaSoftware} entity.
 */
public interface LicencaSoftwareSearchRepository extends ElasticsearchRepository<LicencaSoftware, Long> {
}
