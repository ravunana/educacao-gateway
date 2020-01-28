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

import com.ravunana.educacao.gateway.domain.Lookup;
import com.ravunana.educacao.gateway.domain.*; // for static metamodels
import com.ravunana.educacao.gateway.repository.LookupRepository;
import com.ravunana.educacao.gateway.repository.search.LookupSearchRepository;
import com.ravunana.educacao.gateway.service.dto.LookupCriteria;
import com.ravunana.educacao.gateway.service.dto.LookupDTO;
import com.ravunana.educacao.gateway.service.mapper.LookupMapper;

/**
 * Service for executing complex queries for {@link Lookup} entities in the database.
 * The main input is a {@link LookupCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link LookupDTO} or a {@link Page} of {@link LookupDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class LookupQueryService extends QueryService<Lookup> {

    private final Logger log = LoggerFactory.getLogger(LookupQueryService.class);

    private final LookupRepository lookupRepository;

    private final LookupMapper lookupMapper;

    private final LookupSearchRepository lookupSearchRepository;

    public LookupQueryService(LookupRepository lookupRepository, LookupMapper lookupMapper, LookupSearchRepository lookupSearchRepository) {
        this.lookupRepository = lookupRepository;
        this.lookupMapper = lookupMapper;
        this.lookupSearchRepository = lookupSearchRepository;
    }

    /**
     * Return a {@link List} of {@link LookupDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<LookupDTO> findByCriteria(LookupCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Lookup> specification = createSpecification(criteria);
        return lookupMapper.toDto(lookupRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link LookupDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<LookupDTO> findByCriteria(LookupCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Lookup> specification = createSpecification(criteria);
        return lookupRepository.findAll(specification, page)
            .map(lookupMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(LookupCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Lookup> specification = createSpecification(criteria);
        return lookupRepository.count(specification);
    }

    /**
     * Function to convert {@link LookupCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Lookup> createSpecification(LookupCriteria criteria) {
        Specification<Lookup> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), Lookup_.id));
            }
            if (criteria.getNome() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNome(), Lookup_.nome));
            }
            if (criteria.getSigla() != null) {
                specification = specification.and(buildStringSpecification(criteria.getSigla(), Lookup_.sigla));
            }
            if (criteria.getUsuario() != null) {
                specification = specification.and(buildSpecification(criteria.getUsuario(), Lookup_.usuario));
            }
            if (criteria.getEntidadeId() != null) {
                specification = specification.and(buildSpecification(criteria.getEntidadeId(),
                    root -> root.join(Lookup_.entidade, JoinType.LEFT).get(EntidadeSistema_.id)));
            }
        }
        return specification;
    }
}
