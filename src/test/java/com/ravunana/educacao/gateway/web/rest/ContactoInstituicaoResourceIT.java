package com.ravunana.educacao.gateway.web.rest;

import com.ravunana.educacao.gateway.EducacaoApp;
import com.ravunana.educacao.gateway.config.SecurityBeanOverrideConfiguration;
import com.ravunana.educacao.gateway.domain.ContactoInstituicao;
import com.ravunana.educacao.gateway.domain.InstituicaoEnsino;
import com.ravunana.educacao.gateway.repository.ContactoInstituicaoRepository;
import com.ravunana.educacao.gateway.repository.search.ContactoInstituicaoSearchRepository;
import com.ravunana.educacao.gateway.service.ContactoInstituicaoService;
import com.ravunana.educacao.gateway.service.dto.ContactoInstituicaoDTO;
import com.ravunana.educacao.gateway.service.mapper.ContactoInstituicaoMapper;
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
 * Integration tests for the {@link ContactoInstituicaoResource} REST controller.
 */
@SpringBootTest(classes = {SecurityBeanOverrideConfiguration.class, EducacaoApp.class})
public class ContactoInstituicaoResourceIT {

    private static final String DEFAULT_TIPO_CONTACTO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_CONTACTO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_CONTACTO = "AAAAAAAAAA";
    private static final String UPDATED_CONTACTO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_MOSTRAR_DOCUMENTO = false;
    private static final Boolean UPDATED_MOSTRAR_DOCUMENTO = true;

    @Autowired
    private ContactoInstituicaoRepository contactoInstituicaoRepository;

    @Autowired
    private ContactoInstituicaoMapper contactoInstituicaoMapper;

    @Autowired
    private ContactoInstituicaoService contactoInstituicaoService;

    /**
     * This repository is mocked in the com.ravunana.educacao.gateway.repository.search test package.
     *
     * @see com.ravunana.educacao.gateway.repository.search.ContactoInstituicaoSearchRepositoryMockConfiguration
     */
    @Autowired
    private ContactoInstituicaoSearchRepository mockContactoInstituicaoSearchRepository;

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

    private MockMvc restContactoInstituicaoMockMvc;

    private ContactoInstituicao contactoInstituicao;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContactoInstituicaoResource contactoInstituicaoResource = new ContactoInstituicaoResource(contactoInstituicaoService);
        this.restContactoInstituicaoMockMvc = MockMvcBuilders.standaloneSetup(contactoInstituicaoResource)
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
    public static ContactoInstituicao createEntity(EntityManager em) {
        ContactoInstituicao contactoInstituicao = new ContactoInstituicao()
            .tipoContacto(DEFAULT_TIPO_CONTACTO)
            .descricao(DEFAULT_DESCRICAO)
            .contacto(DEFAULT_CONTACTO)
            .mostrarDocumento(DEFAULT_MOSTRAR_DOCUMENTO);
        // Add required entity
        InstituicaoEnsino instituicaoEnsino;
        if (TestUtil.findAll(em, InstituicaoEnsino.class).isEmpty()) {
            instituicaoEnsino = InstituicaoEnsinoResourceIT.createEntity(em);
            em.persist(instituicaoEnsino);
            em.flush();
        } else {
            instituicaoEnsino = TestUtil.findAll(em, InstituicaoEnsino.class).get(0);
        }
        contactoInstituicao.setInstituicaoEnsino(instituicaoEnsino);
        return contactoInstituicao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactoInstituicao createUpdatedEntity(EntityManager em) {
        ContactoInstituicao contactoInstituicao = new ContactoInstituicao()
            .tipoContacto(UPDATED_TIPO_CONTACTO)
            .descricao(UPDATED_DESCRICAO)
            .contacto(UPDATED_CONTACTO)
            .mostrarDocumento(UPDATED_MOSTRAR_DOCUMENTO);
        // Add required entity
        InstituicaoEnsino instituicaoEnsino;
        if (TestUtil.findAll(em, InstituicaoEnsino.class).isEmpty()) {
            instituicaoEnsino = InstituicaoEnsinoResourceIT.createUpdatedEntity(em);
            em.persist(instituicaoEnsino);
            em.flush();
        } else {
            instituicaoEnsino = TestUtil.findAll(em, InstituicaoEnsino.class).get(0);
        }
        contactoInstituicao.setInstituicaoEnsino(instituicaoEnsino);
        return contactoInstituicao;
    }

    @BeforeEach
    public void initTest() {
        contactoInstituicao = createEntity(em);
    }

    @Test
    @Transactional
    public void createContactoInstituicao() throws Exception {
        int databaseSizeBeforeCreate = contactoInstituicaoRepository.findAll().size();

        // Create the ContactoInstituicao
        ContactoInstituicaoDTO contactoInstituicaoDTO = contactoInstituicaoMapper.toDto(contactoInstituicao);
        restContactoInstituicaoMockMvc.perform(post("/api/contacto-instituicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoInstituicaoDTO)))
            .andExpect(status().isCreated());

        // Validate the ContactoInstituicao in the database
        List<ContactoInstituicao> contactoInstituicaoList = contactoInstituicaoRepository.findAll();
        assertThat(contactoInstituicaoList).hasSize(databaseSizeBeforeCreate + 1);
        ContactoInstituicao testContactoInstituicao = contactoInstituicaoList.get(contactoInstituicaoList.size() - 1);
        assertThat(testContactoInstituicao.getTipoContacto()).isEqualTo(DEFAULT_TIPO_CONTACTO);
        assertThat(testContactoInstituicao.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testContactoInstituicao.getContacto()).isEqualTo(DEFAULT_CONTACTO);
        assertThat(testContactoInstituicao.isMostrarDocumento()).isEqualTo(DEFAULT_MOSTRAR_DOCUMENTO);

        // Validate the ContactoInstituicao in Elasticsearch
        verify(mockContactoInstituicaoSearchRepository, times(1)).save(testContactoInstituicao);
    }

    @Test
    @Transactional
    public void createContactoInstituicaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contactoInstituicaoRepository.findAll().size();

        // Create the ContactoInstituicao with an existing ID
        contactoInstituicao.setId(1L);
        ContactoInstituicaoDTO contactoInstituicaoDTO = contactoInstituicaoMapper.toDto(contactoInstituicao);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContactoInstituicaoMockMvc.perform(post("/api/contacto-instituicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoInstituicaoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoInstituicao in the database
        List<ContactoInstituicao> contactoInstituicaoList = contactoInstituicaoRepository.findAll();
        assertThat(contactoInstituicaoList).hasSize(databaseSizeBeforeCreate);

        // Validate the ContactoInstituicao in Elasticsearch
        verify(mockContactoInstituicaoSearchRepository, times(0)).save(contactoInstituicao);
    }


    @Test
    @Transactional
    public void checkTipoContactoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactoInstituicaoRepository.findAll().size();
        // set the field null
        contactoInstituicao.setTipoContacto(null);

        // Create the ContactoInstituicao, which fails.
        ContactoInstituicaoDTO contactoInstituicaoDTO = contactoInstituicaoMapper.toDto(contactoInstituicao);

        restContactoInstituicaoMockMvc.perform(post("/api/contacto-instituicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoInstituicaoDTO)))
            .andExpect(status().isBadRequest());

        List<ContactoInstituicao> contactoInstituicaoList = contactoInstituicaoRepository.findAll();
        assertThat(contactoInstituicaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactoInstituicaoRepository.findAll().size();
        // set the field null
        contactoInstituicao.setDescricao(null);

        // Create the ContactoInstituicao, which fails.
        ContactoInstituicaoDTO contactoInstituicaoDTO = contactoInstituicaoMapper.toDto(contactoInstituicao);

        restContactoInstituicaoMockMvc.perform(post("/api/contacto-instituicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoInstituicaoDTO)))
            .andExpect(status().isBadRequest());

        List<ContactoInstituicao> contactoInstituicaoList = contactoInstituicaoRepository.findAll();
        assertThat(contactoInstituicaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkContactoIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactoInstituicaoRepository.findAll().size();
        // set the field null
        contactoInstituicao.setContacto(null);

        // Create the ContactoInstituicao, which fails.
        ContactoInstituicaoDTO contactoInstituicaoDTO = contactoInstituicaoMapper.toDto(contactoInstituicao);

        restContactoInstituicaoMockMvc.perform(post("/api/contacto-instituicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoInstituicaoDTO)))
            .andExpect(status().isBadRequest());

        List<ContactoInstituicao> contactoInstituicaoList = contactoInstituicaoRepository.findAll();
        assertThat(contactoInstituicaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContactoInstituicaos() throws Exception {
        // Initialize the database
        contactoInstituicaoRepository.saveAndFlush(contactoInstituicao);

        // Get all the contactoInstituicaoList
        restContactoInstituicaoMockMvc.perform(get("/api/contacto-instituicaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactoInstituicao.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoContacto").value(hasItem(DEFAULT_TIPO_CONTACTO)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].contacto").value(hasItem(DEFAULT_CONTACTO)))
            .andExpect(jsonPath("$.[*].mostrarDocumento").value(hasItem(DEFAULT_MOSTRAR_DOCUMENTO.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getContactoInstituicao() throws Exception {
        // Initialize the database
        contactoInstituicaoRepository.saveAndFlush(contactoInstituicao);

        // Get the contactoInstituicao
        restContactoInstituicaoMockMvc.perform(get("/api/contacto-instituicaos/{id}", contactoInstituicao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(contactoInstituicao.getId().intValue()))
            .andExpect(jsonPath("$.tipoContacto").value(DEFAULT_TIPO_CONTACTO))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.contacto").value(DEFAULT_CONTACTO))
            .andExpect(jsonPath("$.mostrarDocumento").value(DEFAULT_MOSTRAR_DOCUMENTO.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingContactoInstituicao() throws Exception {
        // Get the contactoInstituicao
        restContactoInstituicaoMockMvc.perform(get("/api/contacto-instituicaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContactoInstituicao() throws Exception {
        // Initialize the database
        contactoInstituicaoRepository.saveAndFlush(contactoInstituicao);

        int databaseSizeBeforeUpdate = contactoInstituicaoRepository.findAll().size();

        // Update the contactoInstituicao
        ContactoInstituicao updatedContactoInstituicao = contactoInstituicaoRepository.findById(contactoInstituicao.getId()).get();
        // Disconnect from session so that the updates on updatedContactoInstituicao are not directly saved in db
        em.detach(updatedContactoInstituicao);
        updatedContactoInstituicao
            .tipoContacto(UPDATED_TIPO_CONTACTO)
            .descricao(UPDATED_DESCRICAO)
            .contacto(UPDATED_CONTACTO)
            .mostrarDocumento(UPDATED_MOSTRAR_DOCUMENTO);
        ContactoInstituicaoDTO contactoInstituicaoDTO = contactoInstituicaoMapper.toDto(updatedContactoInstituicao);

        restContactoInstituicaoMockMvc.perform(put("/api/contacto-instituicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoInstituicaoDTO)))
            .andExpect(status().isOk());

        // Validate the ContactoInstituicao in the database
        List<ContactoInstituicao> contactoInstituicaoList = contactoInstituicaoRepository.findAll();
        assertThat(contactoInstituicaoList).hasSize(databaseSizeBeforeUpdate);
        ContactoInstituicao testContactoInstituicao = contactoInstituicaoList.get(contactoInstituicaoList.size() - 1);
        assertThat(testContactoInstituicao.getTipoContacto()).isEqualTo(UPDATED_TIPO_CONTACTO);
        assertThat(testContactoInstituicao.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testContactoInstituicao.getContacto()).isEqualTo(UPDATED_CONTACTO);
        assertThat(testContactoInstituicao.isMostrarDocumento()).isEqualTo(UPDATED_MOSTRAR_DOCUMENTO);

        // Validate the ContactoInstituicao in Elasticsearch
        verify(mockContactoInstituicaoSearchRepository, times(1)).save(testContactoInstituicao);
    }

    @Test
    @Transactional
    public void updateNonExistingContactoInstituicao() throws Exception {
        int databaseSizeBeforeUpdate = contactoInstituicaoRepository.findAll().size();

        // Create the ContactoInstituicao
        ContactoInstituicaoDTO contactoInstituicaoDTO = contactoInstituicaoMapper.toDto(contactoInstituicao);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContactoInstituicaoMockMvc.perform(put("/api/contacto-instituicaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contactoInstituicaoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ContactoInstituicao in the database
        List<ContactoInstituicao> contactoInstituicaoList = contactoInstituicaoRepository.findAll();
        assertThat(contactoInstituicaoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the ContactoInstituicao in Elasticsearch
        verify(mockContactoInstituicaoSearchRepository, times(0)).save(contactoInstituicao);
    }

    @Test
    @Transactional
    public void deleteContactoInstituicao() throws Exception {
        // Initialize the database
        contactoInstituicaoRepository.saveAndFlush(contactoInstituicao);

        int databaseSizeBeforeDelete = contactoInstituicaoRepository.findAll().size();

        // Delete the contactoInstituicao
        restContactoInstituicaoMockMvc.perform(delete("/api/contacto-instituicaos/{id}", contactoInstituicao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ContactoInstituicao> contactoInstituicaoList = contactoInstituicaoRepository.findAll();
        assertThat(contactoInstituicaoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the ContactoInstituicao in Elasticsearch
        verify(mockContactoInstituicaoSearchRepository, times(1)).deleteById(contactoInstituicao.getId());
    }

    @Test
    @Transactional
    public void searchContactoInstituicao() throws Exception {
        // Initialize the database
        contactoInstituicaoRepository.saveAndFlush(contactoInstituicao);
        when(mockContactoInstituicaoSearchRepository.search(queryStringQuery("id:" + contactoInstituicao.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(contactoInstituicao), PageRequest.of(0, 1), 1));
        // Search the contactoInstituicao
        restContactoInstituicaoMockMvc.perform(get("/api/_search/contacto-instituicaos?query=id:" + contactoInstituicao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(contactoInstituicao.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipoContacto").value(hasItem(DEFAULT_TIPO_CONTACTO)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].contacto").value(hasItem(DEFAULT_CONTACTO)))
            .andExpect(jsonPath("$.[*].mostrarDocumento").value(hasItem(DEFAULT_MOSTRAR_DOCUMENTO.booleanValue())));
    }
}
