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
        final LookupResource lookupResource = new LookupResource(lookupService);
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
