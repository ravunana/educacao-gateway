package com.ravunana.educacao.gateway.web.rest;

import com.ravunana.educacao.gateway.EducacaoApp;
import com.ravunana.educacao.gateway.config.SecurityBeanOverrideConfiguration;
import com.ravunana.educacao.gateway.domain.Lookup;
import com.ravunana.educacao.gateway.domain.EntidadeSistema;
import com.ravunana.educacao.gateway.repository.LookupRepository;
import com.ravunana.educacao.gateway.repository.search.LookupSearchRepository;
import com.ravunana.educacao.gateway.service.LookupService;
import com.ravunana.educacao.gateway.service.dto.LookupDTO;
import com.ravunana.educacao.gateway.service.mapper.LookupMapper;
import com.ravunana.educacao.gateway.web.rest.errors.ExceptionTranslator;
import com.ravunana.educacao.gateway.service.dto.LookupCriteria;
import com.ravunana.educacao.gateway.service.LookupQueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static com.ravunana.educacao.gateway.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link LookupResource} REST controller.
 */
@SpringBootTest(classes = {SecurityBeanOverrideConfiguration.class, EducacaoApp.class})
public class LookupResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_SIGLA = "AAAAAAAAAA";
    private static final String UPDATED_SIGLA = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_USUARIO = false;
    private static final Boolean UPDATED_USUARIO = true;

    @Autowired
    private LookupRepository lookupRepository;

    @Autowired
    private LookupMapper lookupMapper;

    @Autowired
    private LookupService lookupService;

    /**
     * This repository is mocked in the com.ravunana.educacao.gateway.repository.search test package.
     *
     * @see com.ravunana.educacao.gateway.repository.search.LookupSearchRepositoryMockConfiguration
     */
    @Autowired
    private LookupSearchRepository mockLookupSearchRepository;

    @Autowired
    private LookupQueryService lookupQueryService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restLookupMockMvc;

    private Lookup lookup;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LookupResource lookupResource = new LookupResource(lookupService, lookupQueryService);
        this.restLookupMockMvc = MockMvcBuilders.standaloneSetup(lookupResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lookup createEntity(EntityManager em) {
        Lookup lookup = new Lookup()
            .nome(DEFAULT_NOME)
            .sigla(DEFAULT_SIGLA)
            .descricao(DEFAULT_DESCRICAO)
            .usuario(DEFAULT_USUARIO);
        // Add required entity
        EntidadeSistema entidadeSistema;
        if (TestUtil.findAll(em, EntidadeSistema.class).isEmpty()) {
            entidadeSistema = EntidadeSistemaResourceIT.createEntity(em);
            em.persist(entidadeSistema);
            em.flush();
        } else {
            entidadeSistema = TestUtil.findAll(em, EntidadeSistema.class).get(0);
        }
        lookup.setEntidade(entidadeSistema);
        return lookup;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Lookup createUpdatedEntity(EntityManager em) {
        Lookup lookup = new Lookup()
            .nome(UPDATED_NOME)
            .sigla(UPDATED_SIGLA)
            .descricao(UPDATED_DESCRICAO)
            .usuario(UPDATED_USUARIO);
        // Add required entity
        EntidadeSistema entidadeSistema;
        if (TestUtil.findAll(em, EntidadeSistema.class).isEmpty()) {
            entidadeSistema = EntidadeSistemaResourceIT.createUpdatedEntity(em);
            em.persist(entidadeSistema);
            em.flush();
        } else {
            entidadeSistema = TestUtil.findAll(em, EntidadeSistema.class).get(0);
        }
        lookup.setEntidade(entidadeSistema);
        return lookup;
    }

    @BeforeEach
    public void initTest() {
        lookup = createEntity(em);
    }

    @Test
    @Transactional
    public void createLookup() throws Exception {
        int databaseSizeBeforeCreate = lookupRepository.findAll().size();

        // Create the Lookup
        LookupDTO lookupDTO = lookupMapper.toDto(lookup);
        restLookupMockMvc.perform(post("/api/lookups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lookupDTO)))
            .andExpect(status().isCreated());

        // Validate the Lookup in the database
        List<Lookup> lookupList = lookupRepository.findAll();
        assertThat(lookupList).hasSize(databaseSizeBeforeCreate + 1);
        Lookup testLookup = lookupList.get(lookupList.size() - 1);
        assertThat(testLookup.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testLookup.getSigla()).isEqualTo(DEFAULT_SIGLA);
        assertThat(testLookup.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testLookup.isUsuario()).isEqualTo(DEFAULT_USUARIO);

        // Validate the Lookup in Elasticsearch
        verify(mockLookupSearchRepository, times(1)).save(testLookup);
    }

    @Test
    @Transactional
    public void createLookupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lookupRepository.findAll().size();

        // Create the Lookup with an existing ID
        lookup.setId(1L);
        LookupDTO lookupDTO = lookupMapper.toDto(lookup);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLookupMockMvc.perform(post("/api/lookups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lookupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lookup in the database
        List<Lookup> lookupList = lookupRepository.findAll();
        assertThat(lookupList).hasSize(databaseSizeBeforeCreate);

        // Validate the Lookup in Elasticsearch
        verify(mockLookupSearchRepository, times(0)).save(lookup);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = lookupRepository.findAll().size();
        // set the field null
        lookup.setNome(null);

        // Create the Lookup, which fails.
        LookupDTO lookupDTO = lookupMapper.toDto(lookup);

        restLookupMockMvc.perform(post("/api/lookups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lookupDTO)))
            .andExpect(status().isBadRequest());

        List<Lookup> lookupList = lookupRepository.findAll();
        assertThat(lookupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSiglaIsRequired() throws Exception {
        int databaseSizeBeforeTest = lookupRepository.findAll().size();
        // set the field null
        lookup.setSigla(null);

        // Create the Lookup, which fails.
        LookupDTO lookupDTO = lookupMapper.toDto(lookup);

        restLookupMockMvc.perform(post("/api/lookups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lookupDTO)))
            .andExpect(status().isBadRequest());

        List<Lookup> lookupList = lookupRepository.findAll();
        assertThat(lookupList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllLookups() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList
        restLookupMockMvc.perform(get("/api/lookups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lookup.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].sigla").value(hasItem(DEFAULT_SIGLA)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getLookup() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get the lookup
        restLookupMockMvc.perform(get("/api/lookups/{id}", lookup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lookup.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.sigla").value(DEFAULT_SIGLA))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.usuario").value(DEFAULT_USUARIO.booleanValue()));
    }


    @Test
    @Transactional
    public void getLookupsByIdFiltering() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        Long id = lookup.getId();

        defaultLookupShouldBeFound("id.equals=" + id);
        defaultLookupShouldNotBeFound("id.notEquals=" + id);

        defaultLookupShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultLookupShouldNotBeFound("id.greaterThan=" + id);

        defaultLookupShouldBeFound("id.lessThanOrEqual=" + id);
        defaultLookupShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllLookupsByNomeIsEqualToSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where nome equals to DEFAULT_NOME
        defaultLookupShouldBeFound("nome.equals=" + DEFAULT_NOME);

        // Get all the lookupList where nome equals to UPDATED_NOME
        defaultLookupShouldNotBeFound("nome.equals=" + UPDATED_NOME);
    }

    @Test
    @Transactional
    public void getAllLookupsByNomeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where nome not equals to DEFAULT_NOME
        defaultLookupShouldNotBeFound("nome.notEquals=" + DEFAULT_NOME);

        // Get all the lookupList where nome not equals to UPDATED_NOME
        defaultLookupShouldBeFound("nome.notEquals=" + UPDATED_NOME);
    }

    @Test
    @Transactional
    public void getAllLookupsByNomeIsInShouldWork() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where nome in DEFAULT_NOME or UPDATED_NOME
        defaultLookupShouldBeFound("nome.in=" + DEFAULT_NOME + "," + UPDATED_NOME);

        // Get all the lookupList where nome equals to UPDATED_NOME
        defaultLookupShouldNotBeFound("nome.in=" + UPDATED_NOME);
    }

    @Test
    @Transactional
    public void getAllLookupsByNomeIsNullOrNotNull() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where nome is not null
        defaultLookupShouldBeFound("nome.specified=true");

        // Get all the lookupList where nome is null
        defaultLookupShouldNotBeFound("nome.specified=false");
    }
                @Test
    @Transactional
    public void getAllLookupsByNomeContainsSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where nome contains DEFAULT_NOME
        defaultLookupShouldBeFound("nome.contains=" + DEFAULT_NOME);

        // Get all the lookupList where nome contains UPDATED_NOME
        defaultLookupShouldNotBeFound("nome.contains=" + UPDATED_NOME);
    }

    @Test
    @Transactional
    public void getAllLookupsByNomeNotContainsSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where nome does not contain DEFAULT_NOME
        defaultLookupShouldNotBeFound("nome.doesNotContain=" + DEFAULT_NOME);

        // Get all the lookupList where nome does not contain UPDATED_NOME
        defaultLookupShouldBeFound("nome.doesNotContain=" + UPDATED_NOME);
    }


    @Test
    @Transactional
    public void getAllLookupsBySiglaIsEqualToSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where sigla equals to DEFAULT_SIGLA
        defaultLookupShouldBeFound("sigla.equals=" + DEFAULT_SIGLA);

        // Get all the lookupList where sigla equals to UPDATED_SIGLA
        defaultLookupShouldNotBeFound("sigla.equals=" + UPDATED_SIGLA);
    }

    @Test
    @Transactional
    public void getAllLookupsBySiglaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where sigla not equals to DEFAULT_SIGLA
        defaultLookupShouldNotBeFound("sigla.notEquals=" + DEFAULT_SIGLA);

        // Get all the lookupList where sigla not equals to UPDATED_SIGLA
        defaultLookupShouldBeFound("sigla.notEquals=" + UPDATED_SIGLA);
    }

    @Test
    @Transactional
    public void getAllLookupsBySiglaIsInShouldWork() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where sigla in DEFAULT_SIGLA or UPDATED_SIGLA
        defaultLookupShouldBeFound("sigla.in=" + DEFAULT_SIGLA + "," + UPDATED_SIGLA);

        // Get all the lookupList where sigla equals to UPDATED_SIGLA
        defaultLookupShouldNotBeFound("sigla.in=" + UPDATED_SIGLA);
    }

    @Test
    @Transactional
    public void getAllLookupsBySiglaIsNullOrNotNull() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where sigla is not null
        defaultLookupShouldBeFound("sigla.specified=true");

        // Get all the lookupList where sigla is null
        defaultLookupShouldNotBeFound("sigla.specified=false");
    }
                @Test
    @Transactional
    public void getAllLookupsBySiglaContainsSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where sigla contains DEFAULT_SIGLA
        defaultLookupShouldBeFound("sigla.contains=" + DEFAULT_SIGLA);

        // Get all the lookupList where sigla contains UPDATED_SIGLA
        defaultLookupShouldNotBeFound("sigla.contains=" + UPDATED_SIGLA);
    }

    @Test
    @Transactional
    public void getAllLookupsBySiglaNotContainsSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where sigla does not contain DEFAULT_SIGLA
        defaultLookupShouldNotBeFound("sigla.doesNotContain=" + DEFAULT_SIGLA);

        // Get all the lookupList where sigla does not contain UPDATED_SIGLA
        defaultLookupShouldBeFound("sigla.doesNotContain=" + UPDATED_SIGLA);
    }


    @Test
    @Transactional
    public void getAllLookupsByUsuarioIsEqualToSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where usuario equals to DEFAULT_USUARIO
        defaultLookupShouldBeFound("usuario.equals=" + DEFAULT_USUARIO);

        // Get all the lookupList where usuario equals to UPDATED_USUARIO
        defaultLookupShouldNotBeFound("usuario.equals=" + UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void getAllLookupsByUsuarioIsNotEqualToSomething() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where usuario not equals to DEFAULT_USUARIO
        defaultLookupShouldNotBeFound("usuario.notEquals=" + DEFAULT_USUARIO);

        // Get all the lookupList where usuario not equals to UPDATED_USUARIO
        defaultLookupShouldBeFound("usuario.notEquals=" + UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void getAllLookupsByUsuarioIsInShouldWork() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where usuario in DEFAULT_USUARIO or UPDATED_USUARIO
        defaultLookupShouldBeFound("usuario.in=" + DEFAULT_USUARIO + "," + UPDATED_USUARIO);

        // Get all the lookupList where usuario equals to UPDATED_USUARIO
        defaultLookupShouldNotBeFound("usuario.in=" + UPDATED_USUARIO);
    }

    @Test
    @Transactional
    public void getAllLookupsByUsuarioIsNullOrNotNull() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        // Get all the lookupList where usuario is not null
        defaultLookupShouldBeFound("usuario.specified=true");

        // Get all the lookupList where usuario is null
        defaultLookupShouldNotBeFound("usuario.specified=false");
    }

    @Test
    @Transactional
    public void getAllLookupsByEntidadeIsEqualToSomething() throws Exception {
        // Get already existing entity
        EntidadeSistema entidade = lookup.getEntidade();
        lookupRepository.saveAndFlush(lookup);
        Long entidadeId = entidade.getId();

        // Get all the lookupList where entidade equals to entidadeId
        defaultLookupShouldBeFound("entidadeId.equals=" + entidadeId);

        // Get all the lookupList where entidade equals to entidadeId + 1
        defaultLookupShouldNotBeFound("entidadeId.equals=" + (entidadeId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultLookupShouldBeFound(String filter) throws Exception {
        restLookupMockMvc.perform(get("/api/lookups?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lookup.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].sigla").value(hasItem(DEFAULT_SIGLA)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO.booleanValue())));

        // Check, that the count call also returns 1
        restLookupMockMvc.perform(get("/api/lookups/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultLookupShouldNotBeFound(String filter) throws Exception {
        restLookupMockMvc.perform(get("/api/lookups?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restLookupMockMvc.perform(get("/api/lookups/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingLookup() throws Exception {
        // Get the lookup
        restLookupMockMvc.perform(get("/api/lookups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLookup() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        int databaseSizeBeforeUpdate = lookupRepository.findAll().size();

        // Update the lookup
        Lookup updatedLookup = lookupRepository.findById(lookup.getId()).get();
        // Disconnect from session so that the updates on updatedLookup are not directly saved in db
        em.detach(updatedLookup);
        updatedLookup
            .nome(UPDATED_NOME)
            .sigla(UPDATED_SIGLA)
            .descricao(UPDATED_DESCRICAO)
            .usuario(UPDATED_USUARIO);
        LookupDTO lookupDTO = lookupMapper.toDto(updatedLookup);

        restLookupMockMvc.perform(put("/api/lookups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lookupDTO)))
            .andExpect(status().isOk());

        // Validate the Lookup in the database
        List<Lookup> lookupList = lookupRepository.findAll();
        assertThat(lookupList).hasSize(databaseSizeBeforeUpdate);
        Lookup testLookup = lookupList.get(lookupList.size() - 1);
        assertThat(testLookup.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testLookup.getSigla()).isEqualTo(UPDATED_SIGLA);
        assertThat(testLookup.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testLookup.isUsuario()).isEqualTo(UPDATED_USUARIO);

        // Validate the Lookup in Elasticsearch
        verify(mockLookupSearchRepository, times(1)).save(testLookup);
    }

    @Test
    @Transactional
    public void updateNonExistingLookup() throws Exception {
        int databaseSizeBeforeUpdate = lookupRepository.findAll().size();

        // Create the Lookup
        LookupDTO lookupDTO = lookupMapper.toDto(lookup);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLookupMockMvc.perform(put("/api/lookups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lookupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lookup in the database
        List<Lookup> lookupList = lookupRepository.findAll();
        assertThat(lookupList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Lookup in Elasticsearch
        verify(mockLookupSearchRepository, times(0)).save(lookup);
    }

    @Test
    @Transactional
    public void deleteLookup() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);

        int databaseSizeBeforeDelete = lookupRepository.findAll().size();

        // Delete the lookup
        restLookupMockMvc.perform(delete("/api/lookups/{id}", lookup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Lookup> lookupList = lookupRepository.findAll();
        assertThat(lookupList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Lookup in Elasticsearch
        verify(mockLookupSearchRepository, times(1)).deleteById(lookup.getId());
    }

    @Test
    @Transactional
    public void searchLookup() throws Exception {
        // Initialize the database
        lookupRepository.saveAndFlush(lookup);
        when(mockLookupSearchRepository.search(queryStringQuery("id:" + lookup.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(lookup), PageRequest.of(0, 1), 1));
        // Search the lookup
        restLookupMockMvc.perform(get("/api/_search/lookups?query=id:" + lookup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lookup.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].sigla").value(hasItem(DEFAULT_SIGLA)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].usuario").value(hasItem(DEFAULT_USUARIO.booleanValue())));
    }
}
