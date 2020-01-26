package com.ravunana.educacao.gateway.web.rest;

import com.ravunana.educacao.gateway.service.InstituicaoEnsinoService;
import com.ravunana.educacao.gateway.web.rest.errors.BadRequestAlertException;
import com.ravunana.educacao.gateway.service.dto.InstituicaoEnsinoDTO;

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
 * REST controller for managing {@link com.ravunana.educacao.gateway.domain.InstituicaoEnsino}.
 */
@RestController
@RequestMapping("/api")
public class InstituicaoEnsinoResource {

    private final Logger log = LoggerFactory.getLogger(InstituicaoEnsinoResource.class);

    private static final String ENTITY_NAME = "instituicaoEnsino";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InstituicaoEnsinoService instituicaoEnsinoService;

    public InstituicaoEnsinoResource(InstituicaoEnsinoService instituicaoEnsinoService) {
        this.instituicaoEnsinoService = instituicaoEnsinoService;
    }

    /**
     * {@code POST  /instituicao-ensinos} : Create a new instituicaoEnsino.
     *
     * @param instituicaoEnsinoDTO the instituicaoEnsinoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new instituicaoEnsinoDTO, or with status {@code 400 (Bad Request)} if the instituicaoEnsino has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/instituicao-ensinos")
    public ResponseEntity<InstituicaoEnsinoDTO> createInstituicaoEnsino(@Valid @RequestBody InstituicaoEnsinoDTO instituicaoEnsinoDTO) throws URISyntaxException {
        log.debug("REST request to save InstituicaoEnsino : {}", instituicaoEnsinoDTO);
        if (instituicaoEnsinoDTO.getId() != null) {
            throw new BadRequestAlertException("A new instituicaoEnsino cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InstituicaoEnsinoDTO result = instituicaoEnsinoService.save(instituicaoEnsinoDTO);
        return ResponseEntity.created(new URI("/api/instituicao-ensinos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /instituicao-ensinos} : Updates an existing instituicaoEnsino.
     *
     * @param instituicaoEnsinoDTO the instituicaoEnsinoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated instituicaoEnsinoDTO,
     * or with status {@code 400 (Bad Request)} if the instituicaoEnsinoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the instituicaoEnsinoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/instituicao-ensinos")
    public ResponseEntity<InstituicaoEnsinoDTO> updateInstituicaoEnsino(@Valid @RequestBody InstituicaoEnsinoDTO instituicaoEnsinoDTO) throws URISyntaxException {
        log.debug("REST request to update InstituicaoEnsino : {}", instituicaoEnsinoDTO);
        if (instituicaoEnsinoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InstituicaoEnsinoDTO result = instituicaoEnsinoService.save(instituicaoEnsinoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, instituicaoEnsinoDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /instituicao-ensinos} : get all the instituicaoEnsinos.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of instituicaoEnsinos in body.
     */
    @GetMapping("/instituicao-ensinos")
    public ResponseEntity<List<InstituicaoEnsinoDTO>> getAllInstituicaoEnsinos(Pageable pageable) {
        log.debug("REST request to get a page of InstituicaoEnsinos");
        Page<InstituicaoEnsinoDTO> page = instituicaoEnsinoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /instituicao-ensinos/:id} : get the "id" instituicaoEnsino.
     *
     * @param id the id of the instituicaoEnsinoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the instituicaoEnsinoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/instituicao-ensinos/{id}")
    public ResponseEntity<InstituicaoEnsinoDTO> getInstituicaoEnsino(@PathVariable Long id) {
        log.debug("REST request to get InstituicaoEnsino : {}", id);
        Optional<InstituicaoEnsinoDTO> instituicaoEnsinoDTO = instituicaoEnsinoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(instituicaoEnsinoDTO);
    }

    /**
     * {@code DELETE  /instituicao-ensinos/:id} : delete the "id" instituicaoEnsino.
     *
     * @param id the id of the instituicaoEnsinoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/instituicao-ensinos/{id}")
    public ResponseEntity<Void> deleteInstituicaoEnsino(@PathVariable Long id) {
        log.debug("REST request to delete InstituicaoEnsino : {}", id);
        instituicaoEnsinoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/instituicao-ensinos?query=:query} : search for the instituicaoEnsino corresponding
     * to the query.
     *
     * @param query the query of the instituicaoEnsino search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/instituicao-ensinos")
    public ResponseEntity<List<InstituicaoEnsinoDTO>> searchInstituicaoEnsinos(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of InstituicaoEnsinos for query {}", query);
        Page<InstituicaoEnsinoDTO> page = instituicaoEnsinoService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
