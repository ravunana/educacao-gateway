package com.ravunana.educacao.gateway.web.rest;

import com.ravunana.educacao.gateway.service.EntidadeSistemaService;
import com.ravunana.educacao.gateway.web.rest.errors.BadRequestAlertException;
import com.ravunana.educacao.gateway.service.dto.EntidadeSistemaDTO;

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
 * REST controller for managing {@link com.ravunana.educacao.gateway.domain.EntidadeSistema}.
 */
@RestController
@RequestMapping("/api")
public class EntidadeSistemaResource {

    private final Logger log = LoggerFactory.getLogger(EntidadeSistemaResource.class);

    private static final String ENTITY_NAME = "entidadeSistema";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EntidadeSistemaService entidadeSistemaService;

    public EntidadeSistemaResource(EntidadeSistemaService entidadeSistemaService) {
        this.entidadeSistemaService = entidadeSistemaService;
    }

    /**
     * {@code POST  /entidade-sistemas} : Create a new entidadeSistema.
     *
     * @param entidadeSistemaDTO the entidadeSistemaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new entidadeSistemaDTO, or with status {@code 400 (Bad Request)} if the entidadeSistema has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/entidade-sistemas")
    public ResponseEntity<EntidadeSistemaDTO> createEntidadeSistema(@Valid @RequestBody EntidadeSistemaDTO entidadeSistemaDTO) throws URISyntaxException {
        log.debug("REST request to save EntidadeSistema : {}", entidadeSistemaDTO);
        if (entidadeSistemaDTO.getId() != null) {
            throw new BadRequestAlertException("A new entidadeSistema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EntidadeSistemaDTO result = entidadeSistemaService.save(entidadeSistemaDTO);
        return ResponseEntity.created(new URI("/api/entidade-sistemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /entidade-sistemas} : Updates an existing entidadeSistema.
     *
     * @param entidadeSistemaDTO the entidadeSistemaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated entidadeSistemaDTO,
     * or with status {@code 400 (Bad Request)} if the entidadeSistemaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the entidadeSistemaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/entidade-sistemas")
    public ResponseEntity<EntidadeSistemaDTO> updateEntidadeSistema(@Valid @RequestBody EntidadeSistemaDTO entidadeSistemaDTO) throws URISyntaxException {
        log.debug("REST request to update EntidadeSistema : {}", entidadeSistemaDTO);
        if (entidadeSistemaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EntidadeSistemaDTO result = entidadeSistemaService.save(entidadeSistemaDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, entidadeSistemaDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /entidade-sistemas} : get all the entidadeSistemas.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of entidadeSistemas in body.
     */
    @GetMapping("/entidade-sistemas")
    public ResponseEntity<List<EntidadeSistemaDTO>> getAllEntidadeSistemas(Pageable pageable) {
        log.debug("REST request to get a page of EntidadeSistemas");
        Page<EntidadeSistemaDTO> page = entidadeSistemaService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /entidade-sistemas/:id} : get the "id" entidadeSistema.
     *
     * @param id the id of the entidadeSistemaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the entidadeSistemaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/entidade-sistemas/{id}")
    public ResponseEntity<EntidadeSistemaDTO> getEntidadeSistema(@PathVariable Long id) {
        log.debug("REST request to get EntidadeSistema : {}", id);
        Optional<EntidadeSistemaDTO> entidadeSistemaDTO = entidadeSistemaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(entidadeSistemaDTO);
    }

    /**
     * {@code DELETE  /entidade-sistemas/:id} : delete the "id" entidadeSistema.
     *
     * @param id the id of the entidadeSistemaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/entidade-sistemas/{id}")
    public ResponseEntity<Void> deleteEntidadeSistema(@PathVariable Long id) {
        log.debug("REST request to delete EntidadeSistema : {}", id);
        entidadeSistemaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/entidade-sistemas?query=:query} : search for the entidadeSistema corresponding
     * to the query.
     *
     * @param query the query of the entidadeSistema search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/entidade-sistemas")
    public ResponseEntity<List<EntidadeSistemaDTO>> searchEntidadeSistemas(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of EntidadeSistemas for query {}", query);
        Page<EntidadeSistemaDTO> page = entidadeSistemaService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
