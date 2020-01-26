package com.ravunana.educacao.gateway.service;

import com.ravunana.educacao.gateway.domain.EntidadeSistema;
import com.ravunana.educacao.gateway.repository.EntidadeSistemaRepository;
import com.ravunana.educacao.gateway.repository.search.EntidadeSistemaSearchRepository;
import com.ravunana.educacao.gateway.service.dto.EntidadeSistemaDTO;
import com.ravunana.educacao.gateway.service.mapper.EntidadeSistemaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link EntidadeSistema}.
 */
@Service
@Transactional
public class EntidadeSistemaService {

    private final Logger log = LoggerFactory.getLogger(EntidadeSistemaService.class);

    private final EntidadeSistemaRepository entidadeSistemaRepository;

    private final EntidadeSistemaMapper entidadeSistemaMapper;

    private final EntidadeSistemaSearchRepository entidadeSistemaSearchRepository;

    public EntidadeSistemaService(EntidadeSistemaRepository entidadeSistemaRepository, EntidadeSistemaMapper entidadeSistemaMapper, EntidadeSistemaSearchRepository entidadeSistemaSearchRepository) {
        this.entidadeSistemaRepository = entidadeSistemaRepository;
        this.entidadeSistemaMapper = entidadeSistemaMapper;
        this.entidadeSistemaSearchRepository = entidadeSistemaSearchRepository;
    }

    /**
     * Save a entidadeSistema.
     *
     * @param entidadeSistemaDTO the entity to save.
     * @return the persisted entity.
     */
    public EntidadeSistemaDTO save(EntidadeSistemaDTO entidadeSistemaDTO) {
        log.debug("Request to save EntidadeSistema : {}", entidadeSistemaDTO);
        EntidadeSistema entidadeSistema = entidadeSistemaMapper.toEntity(entidadeSistemaDTO);
        entidadeSistema = entidadeSistemaRepository.save(entidadeSistema);
        EntidadeSistemaDTO result = entidadeSistemaMapper.toDto(entidadeSistema);
        entidadeSistemaSearchRepository.save(entidadeSistema);
        return result;
    }

    /**
     * Get all the entidadeSistemas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<EntidadeSistemaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all EntidadeSistemas");
        return entidadeSistemaRepository.findAll(pageable)
            .map(entidadeSistemaMapper::toDto);
    }


    /**
     * Get one entidadeSistema by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<EntidadeSistemaDTO> findOne(Long id) {
        log.debug("Request to get EntidadeSistema : {}", id);
        return entidadeSistemaRepository.findById(id)
            .map(entidadeSistemaMapper::toDto);
    }

    /**
     * Delete the entidadeSistema by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete EntidadeSistema : {}", id);
        entidadeSistemaRepository.deleteById(id);
        entidadeSistemaSearchRepository.deleteById(id);
    }

    /**
     * Search for the entidadeSistema corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<EntidadeSistemaDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of EntidadeSistemas for query {}", query);
        return entidadeSistemaSearchRepository.search(queryStringQuery(query), pageable)
            .map(entidadeSistemaMapper::toDto);
    }
}
