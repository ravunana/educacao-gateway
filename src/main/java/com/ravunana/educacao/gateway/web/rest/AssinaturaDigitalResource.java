package com.ravunana.educacao.gateway.web.rest;

import com.ravunana.educacao.gateway.service.AssinaturaDigitalService;
import com.ravunana.educacao.gateway.web.rest.errors.BadRequestAlertException;
import com.ravunana.educacao.gateway.service.dto.AssinaturaDigitalDTO;

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
 * REST controller for managing {@link com.ravunana.educacao.gateway.domain.AssinaturaDigital}.
 */
@RestController
@RequestMapping("/api")
public class AssinaturaDigitalResource {

    private final Logger log = LoggerFactory.getLogger(AssinaturaDigitalResource.class);

    private static final String ENTITY_NAME = "assinaturaDigital";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AssinaturaDigitalService assinaturaDigitalService;

    public AssinaturaDigitalResource(AssinaturaDigitalService assinaturaDigitalService) {
        this.assinaturaDigitalService = assinaturaDigitalService;
    }

    /**
     * {@code POST  /assinatura-digitals} : Create a new assinaturaDigital.
     *
     * @param assinaturaDigitalDTO the assinaturaDigitalDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new assinaturaDigitalDTO, or with status {@code 400 (Bad Request)} if the assinaturaDigital has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/assinatura-digitals")
    public ResponseEntity<AssinaturaDigitalDTO> createAssinaturaDigital(@Valid @RequestBody AssinaturaDigitalDTO assinaturaDigitalDTO) throws URISyntaxException {
        log.debug("REST request to save AssinaturaDigital : {}", assinaturaDigitalDTO);
        if (assinaturaDigitalDTO.getId() != null) {
            throw new BadRequestAlertException("A new assinaturaDigital cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AssinaturaDigitalDTO result = assinaturaDigitalService.save(assinaturaDigitalDTO);
        return ResponseEntity.created(new URI("/api/assinatura-digitals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /assinatura-digitals} : Updates an existing assinaturaDigital.
     *
     * @param assinaturaDigitalDTO the assinaturaDigitalDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assinaturaDigitalDTO,
     * or with status {@code 400 (Bad Request)} if the assinaturaDigitalDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the assinaturaDigitalDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/assinatura-digitals")
    public ResponseEntity<AssinaturaDigitalDTO> updateAssinaturaDigital(@Valid @RequestBody AssinaturaDigitalDTO assinaturaDigitalDTO) throws URISyntaxException {
        log.debug("REST request to update AssinaturaDigital : {}", assinaturaDigitalDTO);
        if (assinaturaDigitalDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AssinaturaDigitalDTO result = assinaturaDigitalService.save(assinaturaDigitalDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assinaturaDigitalDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /assinatura-digitals} : get all the assinaturaDigitals.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of assinaturaDigitals in body.
     */
    @GetMapping("/assinatura-digitals")
    public ResponseEntity<List<AssinaturaDigitalDTO>> getAllAssinaturaDigitals(Pageable pageable) {
        log.debug("REST request to get a page of AssinaturaDigitals");
        Page<AssinaturaDigitalDTO> page = assinaturaDigitalService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /assinatura-digitals/:id} : get the "id" assinaturaDigital.
     *
     * @param id the id of the assinaturaDigitalDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the assinaturaDigitalDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/assinatura-digitals/{id}")
    public ResponseEntity<AssinaturaDigitalDTO> getAssinaturaDigital(@PathVariable Long id) {
        log.debug("REST request to get AssinaturaDigital : {}", id);
        Optional<AssinaturaDigitalDTO> assinaturaDigitalDTO = assinaturaDigitalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(assinaturaDigitalDTO);
    }

    /**
     * {@code DELETE  /assinatura-digitals/:id} : delete the "id" assinaturaDigital.
     *
     * @param id the id of the assinaturaDigitalDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/assinatura-digitals/{id}")
    public ResponseEntity<Void> deleteAssinaturaDigital(@PathVariable Long id) {
        log.debug("REST request to delete AssinaturaDigital : {}", id);
        assinaturaDigitalService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/assinatura-digitals?query=:query} : search for the assinaturaDigital corresponding
     * to the query.
     *
     * @param query the query of the assinaturaDigital search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/assinatura-digitals")
    public ResponseEntity<List<AssinaturaDigitalDTO>> searchAssinaturaDigitals(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of AssinaturaDigitals for query {}", query);
        Page<AssinaturaDigitalDTO> page = assinaturaDigitalService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
}
