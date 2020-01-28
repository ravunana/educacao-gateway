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

import com.ravunana.educacao.gateway.domain.InstituicaoEnsino;
import com.ravunana.educacao.gateway.domain.*; // for static metamodels
import com.ravunana.educacao.gateway.repository.InstituicaoEnsinoRepository;
import com.ravunana.educacao.gateway.repository.search.InstituicaoEnsinoSearchRepository;
import com.ravunana.educacao.gateway.service.dto.InstituicaoEnsinoCriteria;
import com.ravunana.educacao.gateway.service.dto.InstituicaoEnsinoDTO;
import com.ravunana.educacao.gateway.service.mapper.InstituicaoEnsinoMapper;

/**
 * Service for executing complex queries for {@link InstituicaoEnsino} entities in the database.
 * The main input is a {@link InstituicaoEnsinoCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link InstituicaoEnsinoDTO} or a {@link Page} of {@link InstituicaoEnsinoDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class InstituicaoEnsinoQueryService extends QueryService<InstituicaoEnsino> {

    private final Logger log = LoggerFactory.getLogger(InstituicaoEnsinoQueryService.class);

    private final InstituicaoEnsinoRepository instituicaoEnsinoRepository;

    private final InstituicaoEnsinoMapper instituicaoEnsinoMapper;

    private final InstituicaoEnsinoSearchRepository instituicaoEnsinoSearchRepository;

    public InstituicaoEnsinoQueryService(InstituicaoEnsinoRepository instituicaoEnsinoRepository, InstituicaoEnsinoMapper instituicaoEnsinoMapper, InstituicaoEnsinoSearchRepository instituicaoEnsinoSearchRepository) {
        this.instituicaoEnsinoRepository = instituicaoEnsinoRepository;
        this.instituicaoEnsinoMapper = instituicaoEnsinoMapper;
        this.instituicaoEnsinoSearchRepository = instituicaoEnsinoSearchRepository;
    }

    /**
     * Return a {@link List} of {@link InstituicaoEnsinoDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<InstituicaoEnsinoDTO> findByCriteria(InstituicaoEnsinoCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<InstituicaoEnsino> specification = createSpecification(criteria);
        return instituicaoEnsinoMapper.toDto(instituicaoEnsinoRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link InstituicaoEnsinoDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<InstituicaoEnsinoDTO> findByCriteria(InstituicaoEnsinoCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<InstituicaoEnsino> specification = createSpecification(criteria);
        return instituicaoEnsinoRepository.findAll(specification, page)
            .map(instituicaoEnsinoMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(InstituicaoEnsinoCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<InstituicaoEnsino> specification = createSpecification(criteria);
        return instituicaoEnsinoRepository.count(specification);
    }

    /**
     * Function to convert {@link InstituicaoEnsinoCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<InstituicaoEnsino> createSpecification(InstituicaoEnsinoCriteria criteria) {
        Specification<InstituicaoEnsino> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), InstituicaoEnsino_.id));
            }
            if (criteria.getNome() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNome(), InstituicaoEnsino_.nome));
            }
            if (criteria.getFundacao() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getFundacao(), InstituicaoEnsino_.fundacao));
            }
            if (criteria.getFundador() != null) {
                specification = specification.and(buildStringSpecification(criteria.getFundador(), InstituicaoEnsino_.fundador));
            }
            if (criteria.getNumero() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNumero(), InstituicaoEnsino_.numero));
            }
            if (criteria.getDimensao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDimensao(), InstituicaoEnsino_.dimensao));
            }
            if (criteria.getSede() != null) {
                specification = specification.and(buildSpecification(criteria.getSede(), InstituicaoEnsino_.sede));
            }
            if (criteria.getTipoVinculo() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTipoVinculo(), InstituicaoEnsino_.tipoVinculo));
            }
            if (criteria.getUnidadePagadora() != null) {
                specification = specification.and(buildStringSpecification(criteria.getUnidadePagadora(), InstituicaoEnsino_.unidadePagadora));
            }
            if (criteria.getTipoInstalacao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTipoInstalacao(), InstituicaoEnsino_.tipoInstalacao));
            }
            if (criteria.getProvincia() != null) {
                specification = specification.and(buildStringSpecification(criteria.getProvincia(), InstituicaoEnsino_.provincia));
            }
            if (criteria.getMunicipio() != null) {
                specification = specification.and(buildStringSpecification(criteria.getMunicipio(), InstituicaoEnsino_.municipio));
            }
            if (criteria.getBairro() != null) {
                specification = specification.and(buildStringSpecification(criteria.getBairro(), InstituicaoEnsino_.bairro));
            }
            if (criteria.getRua() != null) {
                specification = specification.and(buildStringSpecification(criteria.getRua(), InstituicaoEnsino_.rua));
            }
            if (criteria.getQuarteirao() != null) {
                specification = specification.and(buildStringSpecification(criteria.getQuarteirao(), InstituicaoEnsino_.quarteirao));
            }
            if (criteria.getNumeroPorta() != null) {
                specification = specification.and(buildStringSpecification(criteria.getNumeroPorta(), InstituicaoEnsino_.numeroPorta));
            }
            if (criteria.getInstituicaoEnsinoId() != null) {
                specification = specification.and(buildSpecification(criteria.getInstituicaoEnsinoId(),
                    root -> root.join(InstituicaoEnsino_.instituicaoEnsinos, JoinType.LEFT).get(InstituicaoEnsino_.id)));
            }
            if (criteria.getContactoInstituicaoId() != null) {
                specification = specification.and(buildSpecification(criteria.getContactoInstituicaoId(),
                    root -> root.join(InstituicaoEnsino_.contactoInstituicaos, JoinType.LEFT).get(ContactoInstituicao_.id)));
            }
            if (criteria.getLicencaSoftwareId() != null) {
                specification = specification.and(buildSpecification(criteria.getLicencaSoftwareId(),
                    root -> root.join(InstituicaoEnsino_.licencaSoftwares, JoinType.LEFT).get(LicencaSoftware_.id)));
            }
            if (criteria.getAssinaturaDigitalId() != null) {
                specification = specification.and(buildSpecification(criteria.getAssinaturaDigitalId(),
                    root -> root.join(InstituicaoEnsino_.assinaturaDigitals, JoinType.LEFT).get(AssinaturaDigital_.id)));
            }
            if (criteria.getHierarquiaId() != null) {
                specification = specification.and(buildSpecification(criteria.getHierarquiaId(),
                    root -> root.join(InstituicaoEnsino_.hierarquia, JoinType.LEFT).get(InstituicaoEnsino_.id)));
            }
        }
        return specification;
    }
}
