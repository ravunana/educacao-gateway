package com.ravunana.educacao.gateway.service;

import com.ravunana.educacao.gateway.domain.ContactoInstituicao;
import com.ravunana.educacao.gateway.repository.ContactoInstituicaoRepository;
import com.ravunana.educacao.gateway.repository.search.ContactoInstituicaoSearchRepository;
import com.ravunana.educacao.gateway.service.dto.ContactoInstituicaoDTO;
import com.ravunana.educacao.gateway.service.mapper.ContactoInstituicaoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link ContactoInstituicao}.
 */
@Service
@Transactional
public class ContactoInstituicaoService {

    private final Logger log = LoggerFactory.getLogger(ContactoInstituicaoService.class);

    private final ContactoInstituicaoRepository contactoInstituicaoRepository;

    private final ContactoInstituicaoMapper contactoInstituicaoMapper;

    private final ContactoInstituicaoSearchRepository contactoInstituicaoSearchRepository;

    public ContactoInstituicaoService(ContactoInstituicaoRepository contactoInstituicaoRepository, ContactoInstituicaoMapper contactoInstituicaoMapper, ContactoInstituicaoSearchRepository contactoInstituicaoSearchRepository) {
        this.contactoInstituicaoRepository = contactoInstituicaoRepository;
        this.contactoInstituicaoMapper = contactoInstituicaoMapper;
        this.contactoInstituicaoSearchRepository = contactoInstituicaoSearchRepository;
    }

    /**
     * Save a contactoInstituicao.
     *
     * @param contactoInstituicaoDTO the entity to save.
     * @return the persisted entity.
     */
    public ContactoInstituicaoDTO save(ContactoInstituicaoDTO contactoInstituicaoDTO) {
        log.debug("Request to save ContactoInstituicao : {}", contactoInstituicaoDTO);
        ContactoInstituicao contactoInstituicao = contactoInstituicaoMapper.toEntity(contactoInstituicaoDTO);
        contactoInstituicao = contactoInstituicaoRepository.save(contactoInstituicao);
        ContactoInstituicaoDTO result = contactoInstituicaoMapper.toDto(contactoInstituicao);
        contactoInstituicaoSearchRepository.save(contactoInstituicao);
        return result;
    }

    /**
     * Get all the contactoInstituicaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ContactoInstituicaoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ContactoInstituicaos");
        return contactoInstituicaoRepository.findAll(pageable)
            .map(contactoInstituicaoMapper::toDto);
    }


    /**
     * Get one contactoInstituicao by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ContactoInstituicaoDTO> findOne(Long id) {
        log.debug("Request to get ContactoInstituicao : {}", id);
        return contactoInstituicaoRepository.findById(id)
            .map(contactoInstituicaoMapper::toDto);
    }

    /**
     * Delete the contactoInstituicao by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ContactoInstituicao : {}", id);
        contactoInstituicaoRepository.deleteById(id);
        contactoInstituicaoSearchRepository.deleteById(id);
    }

    /**
     * Search for the contactoInstituicao corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<ContactoInstituicaoDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ContactoInstituicaos for query {}", query);
        return contactoInstituicaoSearchRepository.search(queryStringQuery(query), pageable)
            .map(contactoInstituicaoMapper::toDto);
    }
}
