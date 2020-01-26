package com.ravunana.educacao.gateway.web.rest;

import com.ravunana.educacao.gateway.EducacaoApp;
import com.ravunana.educacao.gateway.config.SecurityBeanOverrideConfiguration;
import com.ravunana.educacao.gateway.domain.EntidadeSistema;
import com.ravunana.educacao.gateway.repository.EntidadeSistemaRepository;
import com.ravunana.educacao.gateway.repository.search.EntidadeSistemaSearchRepository;
import com.ravunana.educacao.gateway.service.EntidadeSistemaService;
import com.ravunana.educacao.gateway.service.dto.EntidadeSistemaDTO;
import com.ravunana.educacao.gateway.service.mapper.EntidadeSistemaMapper;
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
 * Integration tests for the {@link EntidadeSistemaResource} REST controller.
 */
@SpringBootTest(classes = {SecurityBeanOverrideConfiguration.class, EducacaoApp.class})
public class EntidadeSistemaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private EntidadeSistemaRepository entidadeSistemaRepository;

    @Autowired
    private EntidadeSistemaMapper entidadeSistemaMapper;

    @Autowired
    private EntidadeSistemaService entidadeSistemaService;

    /**
     * This repository is mocked in the com.ravunana.educacao.gateway.repository.search test package.
     *
     * @see com.ravunana.educacao.gateway.repository.search.EntidadeSistemaSearchRepositoryMockConfiguration
     */
    @Autowired
    private EntidadeSistemaSearchRepository mockEntidadeSistemaSearchRepository;

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

    private MockMvc restEntidadeSistemaMockMvc;

    private EntidadeSistema entidadeSistema;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EntidadeSistemaResource entidadeSistemaResource = new EntidadeSistemaResource(entidadeSistemaService);
        this.restEntidadeSistemaMockMvc = MockMvcBuilders.standaloneSetup(entidadeSistemaResource)
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
    public static EntidadeSistema createEntity(EntityManager em) {
        EntidadeSistema entidadeSistema = new EntidadeSistema()
            .nome(DEFAULT_NOME);
        return entidadeSistema;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EntidadeSistema createUpdatedEntity(EntityManager em) {
        EntidadeSistema entidadeSistema = new EntidadeSistema()
            .nome(UPDATED_NOME);
        return entidadeSistema;
    }

    @BeforeEach
    public void initTest() {
        entidadeSistema = createEntity(em);
    }

    @Test
    @Transactional
    public void createEntidadeSistema() throws Exception {
        int databaseSizeBeforeCreate = entidadeSistemaRepository.findAll().size();

        // Create the EntidadeSistema
        EntidadeSistemaDTO entidadeSistemaDTO = entidadeSistemaMapper.toDto(entidadeSistema);
        restEntidadeSistemaMockMvc.perform(post("/api/entidade-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidadeSistemaDTO)))
            .andExpect(status().isCreated());

        // Validate the EntidadeSistema in the database
        List<EntidadeSistema> entidadeSistemaList = entidadeSistemaRepository.findAll();
        assertThat(entidadeSistemaList).hasSize(databaseSizeBeforeCreate + 1);
        EntidadeSistema testEntidadeSistema = entidadeSistemaList.get(entidadeSistemaList.size() - 1);
        assertThat(testEntidadeSistema.getNome()).isEqualTo(DEFAULT_NOME);

        // Validate the EntidadeSistema in Elasticsearch
        verify(mockEntidadeSistemaSearchRepository, times(1)).save(testEntidadeSistema);
    }

    @Test
    @Transactional
    public void createEntidadeSistemaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = entidadeSistemaRepository.findAll().size();

        // Create the EntidadeSistema with an existing ID
        entidadeSistema.setId(1L);
        EntidadeSistemaDTO entidadeSistemaDTO = entidadeSistemaMapper.toDto(entidadeSistema);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEntidadeSistemaMockMvc.perform(post("/api/entidade-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidadeSistemaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EntidadeSistema in the database
        List<EntidadeSistema> entidadeSistemaList = entidadeSistemaRepository.findAll();
        assertThat(entidadeSistemaList).hasSize(databaseSizeBeforeCreate);

        // Validate the EntidadeSistema in Elasticsearch
        verify(mockEntidadeSistemaSearchRepository, times(0)).save(entidadeSistema);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = entidadeSistemaRepository.findAll().size();
        // set the field null
        entidadeSistema.setNome(null);

        // Create the EntidadeSistema, which fails.
        EntidadeSistemaDTO entidadeSistemaDTO = entidadeSistemaMapper.toDto(entidadeSistema);

        restEntidadeSistemaMockMvc.perform(post("/api/entidade-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidadeSistemaDTO)))
            .andExpect(status().isBadRequest());

        List<EntidadeSistema> entidadeSistemaList = entidadeSistemaRepository.findAll();
        assertThat(entidadeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEntidadeSistemas() throws Exception {
        // Initialize the database
        entidadeSistemaRepository.saveAndFlush(entidadeSistema);

        // Get all the entidadeSistemaList
        restEntidadeSistemaMockMvc.perform(get("/api/entidade-sistemas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entidadeSistema.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getEntidadeSistema() throws Exception {
        // Initialize the database
        entidadeSistemaRepository.saveAndFlush(entidadeSistema);

        // Get the entidadeSistema
        restEntidadeSistemaMockMvc.perform(get("/api/entidade-sistemas/{id}", entidadeSistema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(entidadeSistema.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }

    @Test
    @Transactional
    public void getNonExistingEntidadeSistema() throws Exception {
        // Get the entidadeSistema
        restEntidadeSistemaMockMvc.perform(get("/api/entidade-sistemas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEntidadeSistema() throws Exception {
        // Initialize the database
        entidadeSistemaRepository.saveAndFlush(entidadeSistema);

        int databaseSizeBeforeUpdate = entidadeSistemaRepository.findAll().size();

        // Update the entidadeSistema
        EntidadeSistema updatedEntidadeSistema = entidadeSistemaRepository.findById(entidadeSistema.getId()).get();
        // Disconnect from session so that the updates on updatedEntidadeSistema are not directly saved in db
        em.detach(updatedEntidadeSistema);
        updatedEntidadeSistema
            .nome(UPDATED_NOME);
        EntidadeSistemaDTO entidadeSistemaDTO = entidadeSistemaMapper.toDto(updatedEntidadeSistema);

        restEntidadeSistemaMockMvc.perform(put("/api/entidade-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidadeSistemaDTO)))
            .andExpect(status().isOk());

        // Validate the EntidadeSistema in the database
        List<EntidadeSistema> entidadeSistemaList = entidadeSistemaRepository.findAll();
        assertThat(entidadeSistemaList).hasSize(databaseSizeBeforeUpdate);
        EntidadeSistema testEntidadeSistema = entidadeSistemaList.get(entidadeSistemaList.size() - 1);
        assertThat(testEntidadeSistema.getNome()).isEqualTo(UPDATED_NOME);

        // Validate the EntidadeSistema in Elasticsearch
        verify(mockEntidadeSistemaSearchRepository, times(1)).save(testEntidadeSistema);
    }

    @Test
    @Transactional
    public void updateNonExistingEntidadeSistema() throws Exception {
        int databaseSizeBeforeUpdate = entidadeSistemaRepository.findAll().size();

        // Create the EntidadeSistema
        EntidadeSistemaDTO entidadeSistemaDTO = entidadeSistemaMapper.toDto(entidadeSistema);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEntidadeSistemaMockMvc.perform(put("/api/entidade-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(entidadeSistemaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the EntidadeSistema in the database
        List<EntidadeSistema> entidadeSistemaList = entidadeSistemaRepository.findAll();
        assertThat(entidadeSistemaList).hasSize(databaseSizeBeforeUpdate);

        // Validate the EntidadeSistema in Elasticsearch
        verify(mockEntidadeSistemaSearchRepository, times(0)).save(entidadeSistema);
    }

    @Test
    @Transactional
    public void deleteEntidadeSistema() throws Exception {
        // Initialize the database
        entidadeSistemaRepository.saveAndFlush(entidadeSistema);

        int databaseSizeBeforeDelete = entidadeSistemaRepository.findAll().size();

        // Delete the entidadeSistema
        restEntidadeSistemaMockMvc.perform(delete("/api/entidade-sistemas/{id}", entidadeSistema.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EntidadeSistema> entidadeSistemaList = entidadeSistemaRepository.findAll();
        assertThat(entidadeSistemaList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the EntidadeSistema in Elasticsearch
        verify(mockEntidadeSistemaSearchRepository, times(1)).deleteById(entidadeSistema.getId());
    }

    @Test
    @Transactional
    public void searchEntidadeSistema() throws Exception {
        // Initialize the database
        entidadeSistemaRepository.saveAndFlush(entidadeSistema);
        when(mockEntidadeSistemaSearchRepository.search(queryStringQuery("id:" + entidadeSistema.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(entidadeSistema), PageRequest.of(0, 1), 1));
        // Search the entidadeSistema
        restEntidadeSistemaMockMvc.perform(get("/api/_search/entidade-sistemas?query=id:" + entidadeSistema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(entidadeSistema.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
}
