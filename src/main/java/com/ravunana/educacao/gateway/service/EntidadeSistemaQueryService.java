package com.ravunana.educacao.gateway.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.ravunana.educacao.gateway.domain.EntidadeSistema;
import com.ravunana.educacao.gateway.domain.*; // for static metamodels
import com.ravunana.educacao.gateway.repository.EntidadeSistemaRepository;
import com.ravunana.educacao.gateway.repository.search.EntidadeSistemaSearchRepository;
import com.ravunana.educacao.gateway.service.dto.EntidadeSistemaCriteria;
import com.ravunana.educacao.gateway.service.dto.EntidadeSistemaDTO;
import com.ravunana.educacao.gateway.service.mapper.EntidadeSistemaMapper;

/**
 * Service for executing complex queries for {@link EntidadeSistema} entities in the database.
 * The main input is a {@link EntidadeSistemaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link EntidadeSistemaDTO} or a {@link Page} of {@link EntidadeSistemaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class EntidadeSistemaQueryService extends QueryService<EntidadeSistema> {

    private final Logger log = LoggerFactory.getLogger(EntidadeSistemaQueryService.class);

    private final EntidadeSistemaRepository entidadeSistemaRepository;

    private final EntidadeSistemaMapper entidadeSistemaMapper;

    private final EntidadeSistemaSearchRepository entidadeSistemaSearchRepository;

    public EntidadeSistemaQueryService(EntidadeSistemaRepository entidadeSistemaRepository, EntidadeSistemaMapper entidadeSistemaMapper, EntidadeSistemaSearchRepository entidadeSistemaSearchRepository) {
        this.entidadeSistemaRepository = entidadeSistemaRepository;
        this.entidadeSistemaMapper = entidadeSistemaMapper;
        this.entidadeSistemaSearchRepository = entidadeSistemaSearchRepository;
    }

    /**
     * Return a {@link List} of {@link EntidadeSistemaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<EntidadeSistemaDTO> findByCriteria(EntidadeSistemaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<EntidadeSistema> specification = createSpecification(criteria);
        return entidadeSistemaMapper.toDto(entidadeSistemaRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link EntidadeSistemaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<EntidadeSistemaDTO> findByCriteria(EntidadeSistemaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<EntidadeSistema> specification = createSpecification(criteria);
        return entidadeSistemaRepository.findAll(specification, page)
            .map(entidadeSistemaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(EntidadeSistemaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<EntidadeSistema> specification = createSpecification(criteria);
        return entidadeSistemaRepository.count(specification);
    }

    /**
     * Function to convert {@link EntidadeSistemaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<EntidadeSistema> createSpecification(EntidadeSistemaCriteria criteria) {
        Specification<EntidadeSistema> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), EntidadeSistema_.id));
            }
            if (criteria.getNome() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNome(), EntidadeSistema_.nome));
            }
            if (criteria.getLookupId() != null) {
                specification = specification.and(buildSpecification(criteria.getLookupId(),
                    root -> root.join(EntidadeSistema_.lookups, JoinType.LEFT).get(Lookup_.id)));
            }
        }
        return specification;
    }
}
