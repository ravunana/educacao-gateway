package com.ravunana.educacao.gateway.web.rest;

import com.ravunana.educacao.gateway.service.ContactoInstituicaoService;
import com.ravunana.educacao.gateway.web.rest.errors.BadRequestAlertException;
import com.ravunana.educacao.gateway.service.dto.ContactoInstituicaoDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link com.ravunana.educacao.gateway.domain.ContactoInstituicao}.
 */
@RestController
@RequestMapping("/api")
public class ContactoInstituicaoResource {

    private final Logger log = LoggerFactory.getLogger(ContactoInstituicaoResource.class);

    private static final String ENTITY_NAME = "contactoInstituicao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactoInstituicaoService contactoInstituicaoService;

    public ContactoInstituicaoResource(ContactoInstituicaoService contactoInstituicaoService) {
        this.contactoInstituicaoService = contactoInstituicaoService;
    }

    /**
     * {@code POST  /contacto-instituicaos} : Create a new contactoInstituicao.
     *
     * @param contactoInstituicaoDTO the contactoInstituicaoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contactoInstituicaoDTO, or with status {@code 400 (Bad Request)} if the contactoInstituicao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/contacto-instituicaos")
    public ResponseEntity<ContactoInstituicaoDTO> createContactoInstituicao(@Valid @RequestBody ContactoInstituicaoDTO contactoInstituicaoDTO) throws URISyntaxException {
        log.debug("REST request to save ContactoInstituicao : {}", contactoInstituicaoDTO);
        if (contactoInstituicaoDTO.getId() != null) {
            throw new BadRequestAlertException("A new contactoInstituicao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ContactoInstituicaoDTO result = contactoInstituicaoService.save(contactoInstituicaoDTO);
        return ResponseEntity.created(new URI("/api/contacto-instituicaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /contacto-instituicaos} : Updates an existing contactoInstituicao.
     *
     * @param contactoInstituicaoDTO the contactoInstituicaoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contactoInstituicaoDTO,
     * or with status {@code 400 (Bad Request)} if the contactoInstituicaoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contactoInstituicaoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/contacto-instituicaos")
    public ResponseEntity<ContactoInstituicaoDTO> updateContactoInstituicao(@Valid @RequestBody ContactoInstituicaoDTO contactoInstituicaoDTO) throws URISyntaxException {
        log.debug("REST request to update ContactoInstituicao : {}", contactoInstituicaoDTO);
        if (contactoInstituicaoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ContactoInstituicaoDTO result = contactoInstituicaoService.save(contactoInstituicaoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, contactoInstituicaoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /contacto-instituicaos} : get all the contactoInstituicaos.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contactoInstituicaos in body.
     */
    @GetMapping("/contacto-instituicaos")
    public ResponseEntity<List<ContactoInstituicaoDTO>> getAllContactoInstituicaos(Pageable pageable) {
        log.debug("REST request to get a page of ContactoInstituicaos");
        Page<ContactoInstituicaoDTO> page = contactoInstituicaoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /contacto-instituicaos/:id} : get the "id" contactoInstituicao.
     *
     * @param id the id of the contactoInstituicaoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contactoInstituicaoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/contacto-instituicaos/{id}")
    public ResponseEntity<ContactoInstituicaoDTO> getContactoInstituicao(@PathVariable Long id) {
        log.debug("REST request to get ContactoInstituicao : {}", id);
        Optional<ContactoInstituicaoDTO> contactoInstituicaoDTO = contactoInstituicaoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contactoInstituicaoDTO);
    }

    /**
     * {@code DELETE  /contacto-instituicaos/:id} : delete the "id" contactoInstituicao.
     *
     * @param id the id of the contactoInstituicaoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/contacto-instituicaos/{id}")
    public ResponseEntity<Void> deleteContactoInstituicao(@PathVariable Long id) {
        log.debug("REST request to delete ContactoInstituicao : {}", id);
        contactoInstituicaoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/contacto-instituicaos?query=:query} : search for the contactoInstituicao corresponding
     * to the query.
     *
     * @param query the query of the contactoInstituicao search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/contacto-instituicaos")
    public ResponseEntity<List<ContactoInstituicaoDTO>> searchContactoInstituicaos(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of ContactoInstituicaos for query {}", query);
        Page<ContactoInstituicaoDTO> page = contactoInstituicaoService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
