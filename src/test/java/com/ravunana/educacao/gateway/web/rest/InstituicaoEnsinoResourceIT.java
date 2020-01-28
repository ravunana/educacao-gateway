package com.ravunana.educacao.gateway.web.rest;

import com.ravunana.educacao.gateway.EducacaoApp;
import com.ravunana.educacao.gateway.config.SecurityBeanOverrideConfiguration;
import com.ravunana.educacao.gateway.domain.InstituicaoEnsino;
import com.ravunana.educacao.gateway.domain.InstituicaoEnsino;
import com.ravunana.educacao.gateway.domain.ContactoInstituicao;
import com.ravunana.educacao.gateway.domain.LicencaSoftware;
import com.ravunana.educacao.gateway.domain.AssinaturaDigital;
import com.ravunana.educacao.gateway.repository.InstituicaoEnsinoRepository;
import com.ravunana.educacao.gateway.repository.search.InstituicaoEnsinoSearchRepository;
import com.ravunana.educacao.gateway.service.InstituicaoEnsinoService;
import com.ravunana.educacao.gateway.service.dto.InstituicaoEnsinoDTO;
import com.ravunana.educacao.gateway.service.mapper.InstituicaoEnsinoMapper;
import com.ravunana.educacao.gateway.web.rest.errors.ExceptionTranslator;
import com.ravunana.educacao.gateway.service.dto.InstituicaoEnsinoCriteria;
import com.ravunana.educacao.gateway.service.InstituicaoEnsinoQueryService;

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
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link InstituicaoEnsinoResource} REST controller.
 */
@SpringBootTest(classes = {SecurityBeanOverrideConfiguration.class, EducacaoApp.class})
public class InstituicaoEnsinoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGOTIPO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGOTIPO = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_LOGOTIPO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGOTIPO_CONTENT_TYPE = "image/png";

    private static final LocalDate DEFAULT_FUNDACAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FUNDACAO = LocalDate.now(ZoneId.systemDefault());
    private static final LocalDate SMALLER_FUNDACAO = LocalDate.ofEpochDay(-1L);

    private static final String DEFAULT_FUNDADOR = "AAAAAAAAAA";
    private static final String UPDATED_FUNDADOR = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final String DEFAULT_DIMENSAO = "AAAAAAAAAA";
    private static final String UPDATED_DIMENSAO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_SEDE = false;
    private static final Boolean UPDATED_SEDE = true;

    private static final String DEFAULT_TIPO_VINCULO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_VINCULO = "BBBBBBBBBB";

    private static final String DEFAULT_UNIDADE_PAGADORA = "AAAAAAAAAA";
    private static final String UPDATED_UNIDADE_PAGADORA = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_INSTALACAO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_INSTALACAO = "BBBBBBBBBB";

    private static final String DEFAULT_PROVINCIA = "AAAAAAAAAA";
    private static final String UPDATED_PROVINCIA = "BBBBBBBBBB";

    private static final String DEFAULT_MUNICIPIO = "AAAAAAAAAA";
    private static final String UPDATED_MUNICIPIO = "BBBBBBBBBB";

    private static final String DEFAULT_BAIRRO = "AAAAAAAAAA";
    private static final String UPDATED_BAIRRO = "BBBBBBBBBB";

    private static final String DEFAULT_RUA = "AAAAAAAAAA";
    private static final String UPDATED_RUA = "BBBBBBBBBB";

    private static final String DEFAULT_QUARTEIRAO = "AAAAAAAAAA";
    private static final String UPDATED_QUARTEIRAO = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_PORTA = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_PORTA = "BBBBBBBBBB";

    @Autowired
    private InstituicaoEnsinoRepository instituicaoEnsinoRepository;

    @Autowired
    private InstituicaoEnsinoMapper instituicaoEnsinoMapper;

    @Autowired
    private InstituicaoEnsinoService instituicaoEnsinoService;

    /**
     * This repository is mocked in the com.ravunana.educacao.gateway.repository.search test package.
     *
     * @see com.ravunana.educacao.gateway.repository.search.InstituicaoEnsinoSearchRepositoryMockConfiguration
     */
    @Autowired
    private InstituicaoEnsinoSearchRepository mockInstituicaoEnsinoSearchRepository;

    @Autowired
    private InstituicaoEnsinoQueryService instituicaoEnsinoQueryService;

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

    private MockMvc restInstituicaoEnsinoMockMvc;

    private InstituicaoEnsino instituicaoEnsino;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final InstituicaoEnsinoResource instituicaoEnsinoResource = new InstituicaoEnsinoResource(instituicaoEnsinoService, instituicaoEnsinoQueryService);
        this.restInstituicaoEnsinoMockMvc = MockMvcBuilders.standaloneSetup(instituicaoEnsinoResource)
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
    public static InstituicaoEnsino createEntity(EntityManager em) {
        InstituicaoEnsino instituicaoEnsino = new InstituicaoEnsino()
            .nome(DEFAULT_NOME)
            .logotipo(DEFAULT_LOGOTIPO)
            .logotipoContentType(DEFAULT_LOGOTIPO_CONTENT_TYPE)
            .fundacao(DEFAULT_FUNDACAO)
            .fundador(DEFAULT_FUNDADOR)
            .numero(DEFAULT_NUMERO)
            .dimensao(DEFAULT_DIMENSAO)
            .sede(DEFAULT_SEDE)
            .tipoVinculo(DEFAULT_TIPO_VINCULO)
            .unidadePagadora(DEFAULT_UNIDADE_PAGADORA)
            .tipoInstalacao(DEFAULT_TIPO_INSTALACAO)
            .provincia(DEFAULT_PROVINCIA)
            .municipio(DEFAULT_MUNICIPIO)
            .bairro(DEFAULT_BAIRRO)
            .rua(DEFAULT_RUA)
            .quarteirao(DEFAULT_QUARTEIRAO)
            .numeroPorta(DEFAULT_NUMERO_PORTA);
        return instituicaoEnsino;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InstituicaoEnsino createUpdatedEntity(EntityManager em) {
        InstituicaoEnsino instituicaoEnsino = new InstituicaoEnsino()
            .nome(UPDATED_NOME)
            .logotipo(UPDATED_LOGOTIPO)
            .logotipoContentType(UPDATED_LOGOTIPO_CONTENT_TYPE)
            .fundacao(UPDATED_FUNDACAO)
            .fundador(UPDATED_FUNDADOR)
            .numero(UPDATED_NUMERO)
            .dimensao(UPDATED_DIMENSAO)
            .sede(UPDATED_SEDE)
            .tipoVinculo(UPDATED_TIPO_VINCULO)
            .unidadePagadora(UPDATED_UNIDADE_PAGADORA)
            .tipoInstalacao(UPDATED_TIPO_INSTALACAO)
            .provincia(UPDATED_PROVINCIA)
            .municipio(UPDATED_MUNICIPIO)
            .bairro(UPDATED_BAIRRO)
            .rua(UPDATED_RUA)
            .quarteirao(UPDATED_QUARTEIRAO)
            .numeroPorta(UPDATED_NUMERO_PORTA);
        return instituicaoEnsino;
    }

    @BeforeEach
    public void initTest() {
        instituicaoEnsino = createEntity(em);
    }

    @Test
    @Transactional
    public void createInstituicaoEnsino() throws Exception {
        int databaseSizeBeforeCreate = instituicaoEnsinoRepository.findAll().size();

        // Create the InstituicaoEnsino
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);
        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isCreated());

        // Validate the InstituicaoEnsino in the database
        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeCreate + 1);
        InstituicaoEnsino testInstituicaoEnsino = instituicaoEnsinoList.get(instituicaoEnsinoList.size() - 1);
        assertThat(testInstituicaoEnsino.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testInstituicaoEnsino.getLogotipo()).isEqualTo(DEFAULT_LOGOTIPO);
        assertThat(testInstituicaoEnsino.getLogotipoContentType()).isEqualTo(DEFAULT_LOGOTIPO_CONTENT_TYPE);
        assertThat(testInstituicaoEnsino.getFundacao()).isEqualTo(DEFAULT_FUNDACAO);
        assertThat(testInstituicaoEnsino.getFundador()).isEqualTo(DEFAULT_FUNDADOR);
        assertThat(testInstituicaoEnsino.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testInstituicaoEnsino.getDimensao()).isEqualTo(DEFAULT_DIMENSAO);
        assertThat(testInstituicaoEnsino.isSede()).isEqualTo(DEFAULT_SEDE);
        assertThat(testInstituicaoEnsino.getTipoVinculo()).isEqualTo(DEFAULT_TIPO_VINCULO);
        assertThat(testInstituicaoEnsino.getUnidadePagadora()).isEqualTo(DEFAULT_UNIDADE_PAGADORA);
        assertThat(testInstituicaoEnsino.getTipoInstalacao()).isEqualTo(DEFAULT_TIPO_INSTALACAO);
        assertThat(testInstituicaoEnsino.getProvincia()).isEqualTo(DEFAULT_PROVINCIA);
        assertThat(testInstituicaoEnsino.getMunicipio()).isEqualTo(DEFAULT_MUNICIPIO);
        assertThat(testInstituicaoEnsino.getBairro()).isEqualTo(DEFAULT_BAIRRO);
        assertThat(testInstituicaoEnsino.getRua()).isEqualTo(DEFAULT_RUA);
        assertThat(testInstituicaoEnsino.getQuarteirao()).isEqualTo(DEFAULT_QUARTEIRAO);
        assertThat(testInstituicaoEnsino.getNumeroPorta()).isEqualTo(DEFAULT_NUMERO_PORTA);

        // Validate the InstituicaoEnsino in Elasticsearch
        verify(mockInstituicaoEnsinoSearchRepository, times(1)).save(testInstituicaoEnsino);
    }

    @Test
    @Transactional
    public void createInstituicaoEnsinoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = instituicaoEnsinoRepository.findAll().size();

        // Create the InstituicaoEnsino with an existing ID
        instituicaoEnsino.setId(1L);
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InstituicaoEnsino in the database
        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeCreate);

        // Validate the InstituicaoEnsino in Elasticsearch
        verify(mockInstituicaoEnsinoSearchRepository, times(0)).save(instituicaoEnsino);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setNome(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setNumero(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSedeIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setSede(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkProvinciaIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setProvincia(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMunicipioIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setMunicipio(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBairroIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setBairro(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRuaIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setRua(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQuarteiraoIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setQuarteirao(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumeroPortaIsRequired() throws Exception {
        int databaseSizeBeforeTest = instituicaoEnsinoRepository.findAll().size();
        // set the field null
        instituicaoEnsino.setNumeroPorta(null);

        // Create the InstituicaoEnsino, which fails.
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(post("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinos() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList
        restInstituicaoEnsinoMockMvc.perform(get("/api/instituicao-ensinos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instituicaoEnsino.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].logotipoContentType").value(hasItem(DEFAULT_LOGOTIPO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logotipo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGOTIPO))))
            .andExpect(jsonPath("$.[*].fundacao").value(hasItem(DEFAULT_FUNDACAO.toString())))
            .andExpect(jsonPath("$.[*].fundador").value(hasItem(DEFAULT_FUNDADOR)))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].dimensao").value(hasItem(DEFAULT_DIMENSAO)))
            .andExpect(jsonPath("$.[*].sede").value(hasItem(DEFAULT_SEDE.booleanValue())))
            .andExpect(jsonPath("$.[*].tipoVinculo").value(hasItem(DEFAULT_TIPO_VINCULO)))
            .andExpect(jsonPath("$.[*].unidadePagadora").value(hasItem(DEFAULT_UNIDADE_PAGADORA)))
            .andExpect(jsonPath("$.[*].tipoInstalacao").value(hasItem(DEFAULT_TIPO_INSTALACAO)))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA)))
            .andExpect(jsonPath("$.[*].municipio").value(hasItem(DEFAULT_MUNICIPIO)))
            .andExpect(jsonPath("$.[*].bairro").value(hasItem(DEFAULT_BAIRRO)))
            .andExpect(jsonPath("$.[*].rua").value(hasItem(DEFAULT_RUA)))
            .andExpect(jsonPath("$.[*].quarteirao").value(hasItem(DEFAULT_QUARTEIRAO)))
            .andExpect(jsonPath("$.[*].numeroPorta").value(hasItem(DEFAULT_NUMERO_PORTA)));
    }
    
    @Test
    @Transactional
    public void getInstituicaoEnsino() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get the instituicaoEnsino
        restInstituicaoEnsinoMockMvc.perform(get("/api/instituicao-ensinos/{id}", instituicaoEnsino.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(instituicaoEnsino.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.logotipoContentType").value(DEFAULT_LOGOTIPO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logotipo").value(Base64Utils.encodeToString(DEFAULT_LOGOTIPO)))
            .andExpect(jsonPath("$.fundacao").value(DEFAULT_FUNDACAO.toString()))
            .andExpect(jsonPath("$.fundador").value(DEFAULT_FUNDADOR))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO))
            .andExpect(jsonPath("$.dimensao").value(DEFAULT_DIMENSAO))
            .andExpect(jsonPath("$.sede").value(DEFAULT_SEDE.booleanValue()))
            .andExpect(jsonPath("$.tipoVinculo").value(DEFAULT_TIPO_VINCULO))
            .andExpect(jsonPath("$.unidadePagadora").value(DEFAULT_UNIDADE_PAGADORA))
            .andExpect(jsonPath("$.tipoInstalacao").value(DEFAULT_TIPO_INSTALACAO))
            .andExpect(jsonPath("$.provincia").value(DEFAULT_PROVINCIA))
            .andExpect(jsonPath("$.municipio").value(DEFAULT_MUNICIPIO))
            .andExpect(jsonPath("$.bairro").value(DEFAULT_BAIRRO))
            .andExpect(jsonPath("$.rua").value(DEFAULT_RUA))
            .andExpect(jsonPath("$.quarteirao").value(DEFAULT_QUARTEIRAO))
            .andExpect(jsonPath("$.numeroPorta").value(DEFAULT_NUMERO_PORTA));
    }


    @Test
    @Transactional
    public void getInstituicaoEnsinosByIdFiltering() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        Long id = instituicaoEnsino.getId();

        defaultInstituicaoEnsinoShouldBeFound("id.equals=" + id);
        defaultInstituicaoEnsinoShouldNotBeFound("id.notEquals=" + id);

        defaultInstituicaoEnsinoShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultInstituicaoEnsinoShouldNotBeFound("id.greaterThan=" + id);

        defaultInstituicaoEnsinoShouldBeFound("id.lessThanOrEqual=" + id);
        defaultInstituicaoEnsinoShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNomeIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where nome equals to DEFAULT_NOME
        defaultInstituicaoEnsinoShouldBeFound("nome.equals=" + DEFAULT_NOME);

        // Get all the instituicaoEnsinoList where nome equals to UPDATED_NOME
        defaultInstituicaoEnsinoShouldNotBeFound("nome.equals=" + UPDATED_NOME);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNomeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where nome not equals to DEFAULT_NOME
        defaultInstituicaoEnsinoShouldNotBeFound("nome.notEquals=" + DEFAULT_NOME);

        // Get all the instituicaoEnsinoList where nome not equals to UPDATED_NOME
        defaultInstituicaoEnsinoShouldBeFound("nome.notEquals=" + UPDATED_NOME);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNomeIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where nome in DEFAULT_NOME or UPDATED_NOME
        defaultInstituicaoEnsinoShouldBeFound("nome.in=" + DEFAULT_NOME + "," + UPDATED_NOME);

        // Get all the instituicaoEnsinoList where nome equals to UPDATED_NOME
        defaultInstituicaoEnsinoShouldNotBeFound("nome.in=" + UPDATED_NOME);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNomeIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where nome is not null
        defaultInstituicaoEnsinoShouldBeFound("nome.specified=true");

        // Get all the instituicaoEnsinoList where nome is null
        defaultInstituicaoEnsinoShouldNotBeFound("nome.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNomeContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where nome contains DEFAULT_NOME
        defaultInstituicaoEnsinoShouldBeFound("nome.contains=" + DEFAULT_NOME);

        // Get all the instituicaoEnsinoList where nome contains UPDATED_NOME
        defaultInstituicaoEnsinoShouldNotBeFound("nome.contains=" + UPDATED_NOME);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNomeNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where nome does not contain DEFAULT_NOME
        defaultInstituicaoEnsinoShouldNotBeFound("nome.doesNotContain=" + DEFAULT_NOME);

        // Get all the instituicaoEnsinoList where nome does not contain UPDATED_NOME
        defaultInstituicaoEnsinoShouldBeFound("nome.doesNotContain=" + UPDATED_NOME);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundacaoIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundacao equals to DEFAULT_FUNDACAO
        defaultInstituicaoEnsinoShouldBeFound("fundacao.equals=" + DEFAULT_FUNDACAO);

        // Get all the instituicaoEnsinoList where fundacao equals to UPDATED_FUNDACAO
        defaultInstituicaoEnsinoShouldNotBeFound("fundacao.equals=" + UPDATED_FUNDACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundacaoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundacao not equals to DEFAULT_FUNDACAO
        defaultInstituicaoEnsinoShouldNotBeFound("fundacao.notEquals=" + DEFAULT_FUNDACAO);

        // Get all the instituicaoEnsinoList where fundacao not equals to UPDATED_FUNDACAO
        defaultInstituicaoEnsinoShouldBeFound("fundacao.notEquals=" + UPDATED_FUNDACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundacaoIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundacao in DEFAULT_FUNDACAO or UPDATED_FUNDACAO
        defaultInstituicaoEnsinoShouldBeFound("fundacao.in=" + DEFAULT_FUNDACAO + "," + UPDATED_FUNDACAO);

        // Get all the instituicaoEnsinoList where fundacao equals to UPDATED_FUNDACAO
        defaultInstituicaoEnsinoShouldNotBeFound("fundacao.in=" + UPDATED_FUNDACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundacaoIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundacao is not null
        defaultInstituicaoEnsinoShouldBeFound("fundacao.specified=true");

        // Get all the instituicaoEnsinoList where fundacao is null
        defaultInstituicaoEnsinoShouldNotBeFound("fundacao.specified=false");
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundacaoIsGreaterThanOrEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundacao is greater than or equal to DEFAULT_FUNDACAO
        defaultInstituicaoEnsinoShouldBeFound("fundacao.greaterThanOrEqual=" + DEFAULT_FUNDACAO);

        // Get all the instituicaoEnsinoList where fundacao is greater than or equal to UPDATED_FUNDACAO
        defaultInstituicaoEnsinoShouldNotBeFound("fundacao.greaterThanOrEqual=" + UPDATED_FUNDACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundacaoIsLessThanOrEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundacao is less than or equal to DEFAULT_FUNDACAO
        defaultInstituicaoEnsinoShouldBeFound("fundacao.lessThanOrEqual=" + DEFAULT_FUNDACAO);

        // Get all the instituicaoEnsinoList where fundacao is less than or equal to SMALLER_FUNDACAO
        defaultInstituicaoEnsinoShouldNotBeFound("fundacao.lessThanOrEqual=" + SMALLER_FUNDACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundacaoIsLessThanSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundacao is less than DEFAULT_FUNDACAO
        defaultInstituicaoEnsinoShouldNotBeFound("fundacao.lessThan=" + DEFAULT_FUNDACAO);

        // Get all the instituicaoEnsinoList where fundacao is less than UPDATED_FUNDACAO
        defaultInstituicaoEnsinoShouldBeFound("fundacao.lessThan=" + UPDATED_FUNDACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundacaoIsGreaterThanSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundacao is greater than DEFAULT_FUNDACAO
        defaultInstituicaoEnsinoShouldNotBeFound("fundacao.greaterThan=" + DEFAULT_FUNDACAO);

        // Get all the instituicaoEnsinoList where fundacao is greater than SMALLER_FUNDACAO
        defaultInstituicaoEnsinoShouldBeFound("fundacao.greaterThan=" + SMALLER_FUNDACAO);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundadorIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundador equals to DEFAULT_FUNDADOR
        defaultInstituicaoEnsinoShouldBeFound("fundador.equals=" + DEFAULT_FUNDADOR);

        // Get all the instituicaoEnsinoList where fundador equals to UPDATED_FUNDADOR
        defaultInstituicaoEnsinoShouldNotBeFound("fundador.equals=" + UPDATED_FUNDADOR);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundadorIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundador not equals to DEFAULT_FUNDADOR
        defaultInstituicaoEnsinoShouldNotBeFound("fundador.notEquals=" + DEFAULT_FUNDADOR);

        // Get all the instituicaoEnsinoList where fundador not equals to UPDATED_FUNDADOR
        defaultInstituicaoEnsinoShouldBeFound("fundador.notEquals=" + UPDATED_FUNDADOR);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundadorIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundador in DEFAULT_FUNDADOR or UPDATED_FUNDADOR
        defaultInstituicaoEnsinoShouldBeFound("fundador.in=" + DEFAULT_FUNDADOR + "," + UPDATED_FUNDADOR);

        // Get all the instituicaoEnsinoList where fundador equals to UPDATED_FUNDADOR
        defaultInstituicaoEnsinoShouldNotBeFound("fundador.in=" + UPDATED_FUNDADOR);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundadorIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundador is not null
        defaultInstituicaoEnsinoShouldBeFound("fundador.specified=true");

        // Get all the instituicaoEnsinoList where fundador is null
        defaultInstituicaoEnsinoShouldNotBeFound("fundador.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundadorContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundador contains DEFAULT_FUNDADOR
        defaultInstituicaoEnsinoShouldBeFound("fundador.contains=" + DEFAULT_FUNDADOR);

        // Get all the instituicaoEnsinoList where fundador contains UPDATED_FUNDADOR
        defaultInstituicaoEnsinoShouldNotBeFound("fundador.contains=" + UPDATED_FUNDADOR);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByFundadorNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where fundador does not contain DEFAULT_FUNDADOR
        defaultInstituicaoEnsinoShouldNotBeFound("fundador.doesNotContain=" + DEFAULT_FUNDADOR);

        // Get all the instituicaoEnsinoList where fundador does not contain UPDATED_FUNDADOR
        defaultInstituicaoEnsinoShouldBeFound("fundador.doesNotContain=" + UPDATED_FUNDADOR);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numero equals to DEFAULT_NUMERO
        defaultInstituicaoEnsinoShouldBeFound("numero.equals=" + DEFAULT_NUMERO);

        // Get all the instituicaoEnsinoList where numero equals to UPDATED_NUMERO
        defaultInstituicaoEnsinoShouldNotBeFound("numero.equals=" + UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numero not equals to DEFAULT_NUMERO
        defaultInstituicaoEnsinoShouldNotBeFound("numero.notEquals=" + DEFAULT_NUMERO);

        // Get all the instituicaoEnsinoList where numero not equals to UPDATED_NUMERO
        defaultInstituicaoEnsinoShouldBeFound("numero.notEquals=" + UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numero in DEFAULT_NUMERO or UPDATED_NUMERO
        defaultInstituicaoEnsinoShouldBeFound("numero.in=" + DEFAULT_NUMERO + "," + UPDATED_NUMERO);

        // Get all the instituicaoEnsinoList where numero equals to UPDATED_NUMERO
        defaultInstituicaoEnsinoShouldNotBeFound("numero.in=" + UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numero is not null
        defaultInstituicaoEnsinoShouldBeFound("numero.specified=true");

        // Get all the instituicaoEnsinoList where numero is null
        defaultInstituicaoEnsinoShouldNotBeFound("numero.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numero contains DEFAULT_NUMERO
        defaultInstituicaoEnsinoShouldBeFound("numero.contains=" + DEFAULT_NUMERO);

        // Get all the instituicaoEnsinoList where numero contains UPDATED_NUMERO
        defaultInstituicaoEnsinoShouldNotBeFound("numero.contains=" + UPDATED_NUMERO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numero does not contain DEFAULT_NUMERO
        defaultInstituicaoEnsinoShouldNotBeFound("numero.doesNotContain=" + DEFAULT_NUMERO);

        // Get all the instituicaoEnsinoList where numero does not contain UPDATED_NUMERO
        defaultInstituicaoEnsinoShouldBeFound("numero.doesNotContain=" + UPDATED_NUMERO);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByDimensaoIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where dimensao equals to DEFAULT_DIMENSAO
        defaultInstituicaoEnsinoShouldBeFound("dimensao.equals=" + DEFAULT_DIMENSAO);

        // Get all the instituicaoEnsinoList where dimensao equals to UPDATED_DIMENSAO
        defaultInstituicaoEnsinoShouldNotBeFound("dimensao.equals=" + UPDATED_DIMENSAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByDimensaoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where dimensao not equals to DEFAULT_DIMENSAO
        defaultInstituicaoEnsinoShouldNotBeFound("dimensao.notEquals=" + DEFAULT_DIMENSAO);

        // Get all the instituicaoEnsinoList where dimensao not equals to UPDATED_DIMENSAO
        defaultInstituicaoEnsinoShouldBeFound("dimensao.notEquals=" + UPDATED_DIMENSAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByDimensaoIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where dimensao in DEFAULT_DIMENSAO or UPDATED_DIMENSAO
        defaultInstituicaoEnsinoShouldBeFound("dimensao.in=" + DEFAULT_DIMENSAO + "," + UPDATED_DIMENSAO);

        // Get all the instituicaoEnsinoList where dimensao equals to UPDATED_DIMENSAO
        defaultInstituicaoEnsinoShouldNotBeFound("dimensao.in=" + UPDATED_DIMENSAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByDimensaoIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where dimensao is not null
        defaultInstituicaoEnsinoShouldBeFound("dimensao.specified=true");

        // Get all the instituicaoEnsinoList where dimensao is null
        defaultInstituicaoEnsinoShouldNotBeFound("dimensao.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByDimensaoContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where dimensao contains DEFAULT_DIMENSAO
        defaultInstituicaoEnsinoShouldBeFound("dimensao.contains=" + DEFAULT_DIMENSAO);

        // Get all the instituicaoEnsinoList where dimensao contains UPDATED_DIMENSAO
        defaultInstituicaoEnsinoShouldNotBeFound("dimensao.contains=" + UPDATED_DIMENSAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByDimensaoNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where dimensao does not contain DEFAULT_DIMENSAO
        defaultInstituicaoEnsinoShouldNotBeFound("dimensao.doesNotContain=" + DEFAULT_DIMENSAO);

        // Get all the instituicaoEnsinoList where dimensao does not contain UPDATED_DIMENSAO
        defaultInstituicaoEnsinoShouldBeFound("dimensao.doesNotContain=" + UPDATED_DIMENSAO);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosBySedeIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where sede equals to DEFAULT_SEDE
        defaultInstituicaoEnsinoShouldBeFound("sede.equals=" + DEFAULT_SEDE);

        // Get all the instituicaoEnsinoList where sede equals to UPDATED_SEDE
        defaultInstituicaoEnsinoShouldNotBeFound("sede.equals=" + UPDATED_SEDE);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosBySedeIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where sede not equals to DEFAULT_SEDE
        defaultInstituicaoEnsinoShouldNotBeFound("sede.notEquals=" + DEFAULT_SEDE);

        // Get all the instituicaoEnsinoList where sede not equals to UPDATED_SEDE
        defaultInstituicaoEnsinoShouldBeFound("sede.notEquals=" + UPDATED_SEDE);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosBySedeIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where sede in DEFAULT_SEDE or UPDATED_SEDE
        defaultInstituicaoEnsinoShouldBeFound("sede.in=" + DEFAULT_SEDE + "," + UPDATED_SEDE);

        // Get all the instituicaoEnsinoList where sede equals to UPDATED_SEDE
        defaultInstituicaoEnsinoShouldNotBeFound("sede.in=" + UPDATED_SEDE);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosBySedeIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where sede is not null
        defaultInstituicaoEnsinoShouldBeFound("sede.specified=true");

        // Get all the instituicaoEnsinoList where sede is null
        defaultInstituicaoEnsinoShouldNotBeFound("sede.specified=false");
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoVinculoIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoVinculo equals to DEFAULT_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldBeFound("tipoVinculo.equals=" + DEFAULT_TIPO_VINCULO);

        // Get all the instituicaoEnsinoList where tipoVinculo equals to UPDATED_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoVinculo.equals=" + UPDATED_TIPO_VINCULO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoVinculoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoVinculo not equals to DEFAULT_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoVinculo.notEquals=" + DEFAULT_TIPO_VINCULO);

        // Get all the instituicaoEnsinoList where tipoVinculo not equals to UPDATED_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldBeFound("tipoVinculo.notEquals=" + UPDATED_TIPO_VINCULO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoVinculoIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoVinculo in DEFAULT_TIPO_VINCULO or UPDATED_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldBeFound("tipoVinculo.in=" + DEFAULT_TIPO_VINCULO + "," + UPDATED_TIPO_VINCULO);

        // Get all the instituicaoEnsinoList where tipoVinculo equals to UPDATED_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoVinculo.in=" + UPDATED_TIPO_VINCULO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoVinculoIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoVinculo is not null
        defaultInstituicaoEnsinoShouldBeFound("tipoVinculo.specified=true");

        // Get all the instituicaoEnsinoList where tipoVinculo is null
        defaultInstituicaoEnsinoShouldNotBeFound("tipoVinculo.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoVinculoContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoVinculo contains DEFAULT_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldBeFound("tipoVinculo.contains=" + DEFAULT_TIPO_VINCULO);

        // Get all the instituicaoEnsinoList where tipoVinculo contains UPDATED_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoVinculo.contains=" + UPDATED_TIPO_VINCULO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoVinculoNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoVinculo does not contain DEFAULT_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoVinculo.doesNotContain=" + DEFAULT_TIPO_VINCULO);

        // Get all the instituicaoEnsinoList where tipoVinculo does not contain UPDATED_TIPO_VINCULO
        defaultInstituicaoEnsinoShouldBeFound("tipoVinculo.doesNotContain=" + UPDATED_TIPO_VINCULO);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByUnidadePagadoraIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where unidadePagadora equals to DEFAULT_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldBeFound("unidadePagadora.equals=" + DEFAULT_UNIDADE_PAGADORA);

        // Get all the instituicaoEnsinoList where unidadePagadora equals to UPDATED_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldNotBeFound("unidadePagadora.equals=" + UPDATED_UNIDADE_PAGADORA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByUnidadePagadoraIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where unidadePagadora not equals to DEFAULT_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldNotBeFound("unidadePagadora.notEquals=" + DEFAULT_UNIDADE_PAGADORA);

        // Get all the instituicaoEnsinoList where unidadePagadora not equals to UPDATED_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldBeFound("unidadePagadora.notEquals=" + UPDATED_UNIDADE_PAGADORA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByUnidadePagadoraIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where unidadePagadora in DEFAULT_UNIDADE_PAGADORA or UPDATED_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldBeFound("unidadePagadora.in=" + DEFAULT_UNIDADE_PAGADORA + "," + UPDATED_UNIDADE_PAGADORA);

        // Get all the instituicaoEnsinoList where unidadePagadora equals to UPDATED_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldNotBeFound("unidadePagadora.in=" + UPDATED_UNIDADE_PAGADORA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByUnidadePagadoraIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where unidadePagadora is not null
        defaultInstituicaoEnsinoShouldBeFound("unidadePagadora.specified=true");

        // Get all the instituicaoEnsinoList where unidadePagadora is null
        defaultInstituicaoEnsinoShouldNotBeFound("unidadePagadora.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByUnidadePagadoraContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where unidadePagadora contains DEFAULT_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldBeFound("unidadePagadora.contains=" + DEFAULT_UNIDADE_PAGADORA);

        // Get all the instituicaoEnsinoList where unidadePagadora contains UPDATED_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldNotBeFound("unidadePagadora.contains=" + UPDATED_UNIDADE_PAGADORA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByUnidadePagadoraNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where unidadePagadora does not contain DEFAULT_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldNotBeFound("unidadePagadora.doesNotContain=" + DEFAULT_UNIDADE_PAGADORA);

        // Get all the instituicaoEnsinoList where unidadePagadora does not contain UPDATED_UNIDADE_PAGADORA
        defaultInstituicaoEnsinoShouldBeFound("unidadePagadora.doesNotContain=" + UPDATED_UNIDADE_PAGADORA);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoInstalacaoIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoInstalacao equals to DEFAULT_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldBeFound("tipoInstalacao.equals=" + DEFAULT_TIPO_INSTALACAO);

        // Get all the instituicaoEnsinoList where tipoInstalacao equals to UPDATED_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoInstalacao.equals=" + UPDATED_TIPO_INSTALACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoInstalacaoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoInstalacao not equals to DEFAULT_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoInstalacao.notEquals=" + DEFAULT_TIPO_INSTALACAO);

        // Get all the instituicaoEnsinoList where tipoInstalacao not equals to UPDATED_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldBeFound("tipoInstalacao.notEquals=" + UPDATED_TIPO_INSTALACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoInstalacaoIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoInstalacao in DEFAULT_TIPO_INSTALACAO or UPDATED_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldBeFound("tipoInstalacao.in=" + DEFAULT_TIPO_INSTALACAO + "," + UPDATED_TIPO_INSTALACAO);

        // Get all the instituicaoEnsinoList where tipoInstalacao equals to UPDATED_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoInstalacao.in=" + UPDATED_TIPO_INSTALACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoInstalacaoIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoInstalacao is not null
        defaultInstituicaoEnsinoShouldBeFound("tipoInstalacao.specified=true");

        // Get all the instituicaoEnsinoList where tipoInstalacao is null
        defaultInstituicaoEnsinoShouldNotBeFound("tipoInstalacao.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoInstalacaoContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoInstalacao contains DEFAULT_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldBeFound("tipoInstalacao.contains=" + DEFAULT_TIPO_INSTALACAO);

        // Get all the instituicaoEnsinoList where tipoInstalacao contains UPDATED_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoInstalacao.contains=" + UPDATED_TIPO_INSTALACAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByTipoInstalacaoNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where tipoInstalacao does not contain DEFAULT_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldNotBeFound("tipoInstalacao.doesNotContain=" + DEFAULT_TIPO_INSTALACAO);

        // Get all the instituicaoEnsinoList where tipoInstalacao does not contain UPDATED_TIPO_INSTALACAO
        defaultInstituicaoEnsinoShouldBeFound("tipoInstalacao.doesNotContain=" + UPDATED_TIPO_INSTALACAO);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByProvinciaIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where provincia equals to DEFAULT_PROVINCIA
        defaultInstituicaoEnsinoShouldBeFound("provincia.equals=" + DEFAULT_PROVINCIA);

        // Get all the instituicaoEnsinoList where provincia equals to UPDATED_PROVINCIA
        defaultInstituicaoEnsinoShouldNotBeFound("provincia.equals=" + UPDATED_PROVINCIA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByProvinciaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where provincia not equals to DEFAULT_PROVINCIA
        defaultInstituicaoEnsinoShouldNotBeFound("provincia.notEquals=" + DEFAULT_PROVINCIA);

        // Get all the instituicaoEnsinoList where provincia not equals to UPDATED_PROVINCIA
        defaultInstituicaoEnsinoShouldBeFound("provincia.notEquals=" + UPDATED_PROVINCIA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByProvinciaIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where provincia in DEFAULT_PROVINCIA or UPDATED_PROVINCIA
        defaultInstituicaoEnsinoShouldBeFound("provincia.in=" + DEFAULT_PROVINCIA + "," + UPDATED_PROVINCIA);

        // Get all the instituicaoEnsinoList where provincia equals to UPDATED_PROVINCIA
        defaultInstituicaoEnsinoShouldNotBeFound("provincia.in=" + UPDATED_PROVINCIA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByProvinciaIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where provincia is not null
        defaultInstituicaoEnsinoShouldBeFound("provincia.specified=true");

        // Get all the instituicaoEnsinoList where provincia is null
        defaultInstituicaoEnsinoShouldNotBeFound("provincia.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByProvinciaContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where provincia contains DEFAULT_PROVINCIA
        defaultInstituicaoEnsinoShouldBeFound("provincia.contains=" + DEFAULT_PROVINCIA);

        // Get all the instituicaoEnsinoList where provincia contains UPDATED_PROVINCIA
        defaultInstituicaoEnsinoShouldNotBeFound("provincia.contains=" + UPDATED_PROVINCIA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByProvinciaNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where provincia does not contain DEFAULT_PROVINCIA
        defaultInstituicaoEnsinoShouldNotBeFound("provincia.doesNotContain=" + DEFAULT_PROVINCIA);

        // Get all the instituicaoEnsinoList where provincia does not contain UPDATED_PROVINCIA
        defaultInstituicaoEnsinoShouldBeFound("provincia.doesNotContain=" + UPDATED_PROVINCIA);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByMunicipioIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where municipio equals to DEFAULT_MUNICIPIO
        defaultInstituicaoEnsinoShouldBeFound("municipio.equals=" + DEFAULT_MUNICIPIO);

        // Get all the instituicaoEnsinoList where municipio equals to UPDATED_MUNICIPIO
        defaultInstituicaoEnsinoShouldNotBeFound("municipio.equals=" + UPDATED_MUNICIPIO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByMunicipioIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where municipio not equals to DEFAULT_MUNICIPIO
        defaultInstituicaoEnsinoShouldNotBeFound("municipio.notEquals=" + DEFAULT_MUNICIPIO);

        // Get all the instituicaoEnsinoList where municipio not equals to UPDATED_MUNICIPIO
        defaultInstituicaoEnsinoShouldBeFound("municipio.notEquals=" + UPDATED_MUNICIPIO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByMunicipioIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where municipio in DEFAULT_MUNICIPIO or UPDATED_MUNICIPIO
        defaultInstituicaoEnsinoShouldBeFound("municipio.in=" + DEFAULT_MUNICIPIO + "," + UPDATED_MUNICIPIO);

        // Get all the instituicaoEnsinoList where municipio equals to UPDATED_MUNICIPIO
        defaultInstituicaoEnsinoShouldNotBeFound("municipio.in=" + UPDATED_MUNICIPIO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByMunicipioIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where municipio is not null
        defaultInstituicaoEnsinoShouldBeFound("municipio.specified=true");

        // Get all the instituicaoEnsinoList where municipio is null
        defaultInstituicaoEnsinoShouldNotBeFound("municipio.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByMunicipioContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where municipio contains DEFAULT_MUNICIPIO
        defaultInstituicaoEnsinoShouldBeFound("municipio.contains=" + DEFAULT_MUNICIPIO);

        // Get all the instituicaoEnsinoList where municipio contains UPDATED_MUNICIPIO
        defaultInstituicaoEnsinoShouldNotBeFound("municipio.contains=" + UPDATED_MUNICIPIO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByMunicipioNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where municipio does not contain DEFAULT_MUNICIPIO
        defaultInstituicaoEnsinoShouldNotBeFound("municipio.doesNotContain=" + DEFAULT_MUNICIPIO);

        // Get all the instituicaoEnsinoList where municipio does not contain UPDATED_MUNICIPIO
        defaultInstituicaoEnsinoShouldBeFound("municipio.doesNotContain=" + UPDATED_MUNICIPIO);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByBairroIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where bairro equals to DEFAULT_BAIRRO
        defaultInstituicaoEnsinoShouldBeFound("bairro.equals=" + DEFAULT_BAIRRO);

        // Get all the instituicaoEnsinoList where bairro equals to UPDATED_BAIRRO
        defaultInstituicaoEnsinoShouldNotBeFound("bairro.equals=" + UPDATED_BAIRRO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByBairroIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where bairro not equals to DEFAULT_BAIRRO
        defaultInstituicaoEnsinoShouldNotBeFound("bairro.notEquals=" + DEFAULT_BAIRRO);

        // Get all the instituicaoEnsinoList where bairro not equals to UPDATED_BAIRRO
        defaultInstituicaoEnsinoShouldBeFound("bairro.notEquals=" + UPDATED_BAIRRO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByBairroIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where bairro in DEFAULT_BAIRRO or UPDATED_BAIRRO
        defaultInstituicaoEnsinoShouldBeFound("bairro.in=" + DEFAULT_BAIRRO + "," + UPDATED_BAIRRO);

        // Get all the instituicaoEnsinoList where bairro equals to UPDATED_BAIRRO
        defaultInstituicaoEnsinoShouldNotBeFound("bairro.in=" + UPDATED_BAIRRO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByBairroIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where bairro is not null
        defaultInstituicaoEnsinoShouldBeFound("bairro.specified=true");

        // Get all the instituicaoEnsinoList where bairro is null
        defaultInstituicaoEnsinoShouldNotBeFound("bairro.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByBairroContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where bairro contains DEFAULT_BAIRRO
        defaultInstituicaoEnsinoShouldBeFound("bairro.contains=" + DEFAULT_BAIRRO);

        // Get all the instituicaoEnsinoList where bairro contains UPDATED_BAIRRO
        defaultInstituicaoEnsinoShouldNotBeFound("bairro.contains=" + UPDATED_BAIRRO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByBairroNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where bairro does not contain DEFAULT_BAIRRO
        defaultInstituicaoEnsinoShouldNotBeFound("bairro.doesNotContain=" + DEFAULT_BAIRRO);

        // Get all the instituicaoEnsinoList where bairro does not contain UPDATED_BAIRRO
        defaultInstituicaoEnsinoShouldBeFound("bairro.doesNotContain=" + UPDATED_BAIRRO);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByRuaIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where rua equals to DEFAULT_RUA
        defaultInstituicaoEnsinoShouldBeFound("rua.equals=" + DEFAULT_RUA);

        // Get all the instituicaoEnsinoList where rua equals to UPDATED_RUA
        defaultInstituicaoEnsinoShouldNotBeFound("rua.equals=" + UPDATED_RUA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByRuaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where rua not equals to DEFAULT_RUA
        defaultInstituicaoEnsinoShouldNotBeFound("rua.notEquals=" + DEFAULT_RUA);

        // Get all the instituicaoEnsinoList where rua not equals to UPDATED_RUA
        defaultInstituicaoEnsinoShouldBeFound("rua.notEquals=" + UPDATED_RUA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByRuaIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where rua in DEFAULT_RUA or UPDATED_RUA
        defaultInstituicaoEnsinoShouldBeFound("rua.in=" + DEFAULT_RUA + "," + UPDATED_RUA);

        // Get all the instituicaoEnsinoList where rua equals to UPDATED_RUA
        defaultInstituicaoEnsinoShouldNotBeFound("rua.in=" + UPDATED_RUA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByRuaIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where rua is not null
        defaultInstituicaoEnsinoShouldBeFound("rua.specified=true");

        // Get all the instituicaoEnsinoList where rua is null
        defaultInstituicaoEnsinoShouldNotBeFound("rua.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByRuaContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where rua contains DEFAULT_RUA
        defaultInstituicaoEnsinoShouldBeFound("rua.contains=" + DEFAULT_RUA);

        // Get all the instituicaoEnsinoList where rua contains UPDATED_RUA
        defaultInstituicaoEnsinoShouldNotBeFound("rua.contains=" + UPDATED_RUA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByRuaNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where rua does not contain DEFAULT_RUA
        defaultInstituicaoEnsinoShouldNotBeFound("rua.doesNotContain=" + DEFAULT_RUA);

        // Get all the instituicaoEnsinoList where rua does not contain UPDATED_RUA
        defaultInstituicaoEnsinoShouldBeFound("rua.doesNotContain=" + UPDATED_RUA);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByQuarteiraoIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where quarteirao equals to DEFAULT_QUARTEIRAO
        defaultInstituicaoEnsinoShouldBeFound("quarteirao.equals=" + DEFAULT_QUARTEIRAO);

        // Get all the instituicaoEnsinoList where quarteirao equals to UPDATED_QUARTEIRAO
        defaultInstituicaoEnsinoShouldNotBeFound("quarteirao.equals=" + UPDATED_QUARTEIRAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByQuarteiraoIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where quarteirao not equals to DEFAULT_QUARTEIRAO
        defaultInstituicaoEnsinoShouldNotBeFound("quarteirao.notEquals=" + DEFAULT_QUARTEIRAO);

        // Get all the instituicaoEnsinoList where quarteirao not equals to UPDATED_QUARTEIRAO
        defaultInstituicaoEnsinoShouldBeFound("quarteirao.notEquals=" + UPDATED_QUARTEIRAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByQuarteiraoIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where quarteirao in DEFAULT_QUARTEIRAO or UPDATED_QUARTEIRAO
        defaultInstituicaoEnsinoShouldBeFound("quarteirao.in=" + DEFAULT_QUARTEIRAO + "," + UPDATED_QUARTEIRAO);

        // Get all the instituicaoEnsinoList where quarteirao equals to UPDATED_QUARTEIRAO
        defaultInstituicaoEnsinoShouldNotBeFound("quarteirao.in=" + UPDATED_QUARTEIRAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByQuarteiraoIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where quarteirao is not null
        defaultInstituicaoEnsinoShouldBeFound("quarteirao.specified=true");

        // Get all the instituicaoEnsinoList where quarteirao is null
        defaultInstituicaoEnsinoShouldNotBeFound("quarteirao.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByQuarteiraoContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where quarteirao contains DEFAULT_QUARTEIRAO
        defaultInstituicaoEnsinoShouldBeFound("quarteirao.contains=" + DEFAULT_QUARTEIRAO);

        // Get all the instituicaoEnsinoList where quarteirao contains UPDATED_QUARTEIRAO
        defaultInstituicaoEnsinoShouldNotBeFound("quarteirao.contains=" + UPDATED_QUARTEIRAO);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByQuarteiraoNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where quarteirao does not contain DEFAULT_QUARTEIRAO
        defaultInstituicaoEnsinoShouldNotBeFound("quarteirao.doesNotContain=" + DEFAULT_QUARTEIRAO);

        // Get all the instituicaoEnsinoList where quarteirao does not contain UPDATED_QUARTEIRAO
        defaultInstituicaoEnsinoShouldBeFound("quarteirao.doesNotContain=" + UPDATED_QUARTEIRAO);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroPortaIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numeroPorta equals to DEFAULT_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldBeFound("numeroPorta.equals=" + DEFAULT_NUMERO_PORTA);

        // Get all the instituicaoEnsinoList where numeroPorta equals to UPDATED_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldNotBeFound("numeroPorta.equals=" + UPDATED_NUMERO_PORTA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroPortaIsNotEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numeroPorta not equals to DEFAULT_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldNotBeFound("numeroPorta.notEquals=" + DEFAULT_NUMERO_PORTA);

        // Get all the instituicaoEnsinoList where numeroPorta not equals to UPDATED_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldBeFound("numeroPorta.notEquals=" + UPDATED_NUMERO_PORTA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroPortaIsInShouldWork() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numeroPorta in DEFAULT_NUMERO_PORTA or UPDATED_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldBeFound("numeroPorta.in=" + DEFAULT_NUMERO_PORTA + "," + UPDATED_NUMERO_PORTA);

        // Get all the instituicaoEnsinoList where numeroPorta equals to UPDATED_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldNotBeFound("numeroPorta.in=" + UPDATED_NUMERO_PORTA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroPortaIsNullOrNotNull() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numeroPorta is not null
        defaultInstituicaoEnsinoShouldBeFound("numeroPorta.specified=true");

        // Get all the instituicaoEnsinoList where numeroPorta is null
        defaultInstituicaoEnsinoShouldNotBeFound("numeroPorta.specified=false");
    }
                @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroPortaContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numeroPorta contains DEFAULT_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldBeFound("numeroPorta.contains=" + DEFAULT_NUMERO_PORTA);

        // Get all the instituicaoEnsinoList where numeroPorta contains UPDATED_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldNotBeFound("numeroPorta.contains=" + UPDATED_NUMERO_PORTA);
    }

    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByNumeroPortaNotContainsSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        // Get all the instituicaoEnsinoList where numeroPorta does not contain DEFAULT_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldNotBeFound("numeroPorta.doesNotContain=" + DEFAULT_NUMERO_PORTA);

        // Get all the instituicaoEnsinoList where numeroPorta does not contain UPDATED_NUMERO_PORTA
        defaultInstituicaoEnsinoShouldBeFound("numeroPorta.doesNotContain=" + UPDATED_NUMERO_PORTA);
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByInstituicaoEnsinoIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        InstituicaoEnsino instituicaoEnsino = InstituicaoEnsinoResourceIT.createEntity(em);
        em.persist(instituicaoEnsino);
        em.flush();
        instituicaoEnsino.addInstituicaoEnsino(instituicaoEnsino);
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        Long instituicaoEnsinoId = instituicaoEnsino.getId();

        // Get all the instituicaoEnsinoList where instituicaoEnsino equals to instituicaoEnsinoId
        defaultInstituicaoEnsinoShouldBeFound("instituicaoEnsinoId.equals=" + instituicaoEnsinoId);

        // Get all the instituicaoEnsinoList where instituicaoEnsino equals to instituicaoEnsinoId + 1
        defaultInstituicaoEnsinoShouldNotBeFound("instituicaoEnsinoId.equals=" + (instituicaoEnsinoId + 1));
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByContactoInstituicaoIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        ContactoInstituicao contactoInstituicao = ContactoInstituicaoResourceIT.createEntity(em);
        em.persist(contactoInstituicao);
        em.flush();
        instituicaoEnsino.addContactoInstituicao(contactoInstituicao);
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        Long contactoInstituicaoId = contactoInstituicao.getId();

        // Get all the instituicaoEnsinoList where contactoInstituicao equals to contactoInstituicaoId
        defaultInstituicaoEnsinoShouldBeFound("contactoInstituicaoId.equals=" + contactoInstituicaoId);

        // Get all the instituicaoEnsinoList where contactoInstituicao equals to contactoInstituicaoId + 1
        defaultInstituicaoEnsinoShouldNotBeFound("contactoInstituicaoId.equals=" + (contactoInstituicaoId + 1));
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByLicencaSoftwareIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        LicencaSoftware licencaSoftware = LicencaSoftwareResourceIT.createEntity(em);
        em.persist(licencaSoftware);
        em.flush();
        instituicaoEnsino.addLicencaSoftware(licencaSoftware);
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        Long licencaSoftwareId = licencaSoftware.getId();

        // Get all the instituicaoEnsinoList where licencaSoftware equals to licencaSoftwareId
        defaultInstituicaoEnsinoShouldBeFound("licencaSoftwareId.equals=" + licencaSoftwareId);

        // Get all the instituicaoEnsinoList where licencaSoftware equals to licencaSoftwareId + 1
        defaultInstituicaoEnsinoShouldNotBeFound("licencaSoftwareId.equals=" + (licencaSoftwareId + 1));
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByAssinaturaDigitalIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        AssinaturaDigital assinaturaDigital = AssinaturaDigitalResourceIT.createEntity(em);
        em.persist(assinaturaDigital);
        em.flush();
        instituicaoEnsino.addAssinaturaDigital(assinaturaDigital);
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        Long assinaturaDigitalId = assinaturaDigital.getId();

        // Get all the instituicaoEnsinoList where assinaturaDigital equals to assinaturaDigitalId
        defaultInstituicaoEnsinoShouldBeFound("assinaturaDigitalId.equals=" + assinaturaDigitalId);

        // Get all the instituicaoEnsinoList where assinaturaDigital equals to assinaturaDigitalId + 1
        defaultInstituicaoEnsinoShouldNotBeFound("assinaturaDigitalId.equals=" + (assinaturaDigitalId + 1));
    }


    @Test
    @Transactional
    public void getAllInstituicaoEnsinosByHierarquiaIsEqualToSomething() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        InstituicaoEnsino hierarquia = InstituicaoEnsinoResourceIT.createEntity(em);
        em.persist(hierarquia);
        em.flush();
        instituicaoEnsino.setHierarquia(hierarquia);
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        Long hierarquiaId = hierarquia.getId();

        // Get all the instituicaoEnsinoList where hierarquia equals to hierarquiaId
        defaultInstituicaoEnsinoShouldBeFound("hierarquiaId.equals=" + hierarquiaId);

        // Get all the instituicaoEnsinoList where hierarquia equals to hierarquiaId + 1
        defaultInstituicaoEnsinoShouldNotBeFound("hierarquiaId.equals=" + (hierarquiaId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultInstituicaoEnsinoShouldBeFound(String filter) throws Exception {
        restInstituicaoEnsinoMockMvc.perform(get("/api/instituicao-ensinos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instituicaoEnsino.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].logotipoContentType").value(hasItem(DEFAULT_LOGOTIPO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logotipo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGOTIPO))))
            .andExpect(jsonPath("$.[*].fundacao").value(hasItem(DEFAULT_FUNDACAO.toString())))
            .andExpect(jsonPath("$.[*].fundador").value(hasItem(DEFAULT_FUNDADOR)))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].dimensao").value(hasItem(DEFAULT_DIMENSAO)))
            .andExpect(jsonPath("$.[*].sede").value(hasItem(DEFAULT_SEDE.booleanValue())))
            .andExpect(jsonPath("$.[*].tipoVinculo").value(hasItem(DEFAULT_TIPO_VINCULO)))
            .andExpect(jsonPath("$.[*].unidadePagadora").value(hasItem(DEFAULT_UNIDADE_PAGADORA)))
            .andExpect(jsonPath("$.[*].tipoInstalacao").value(hasItem(DEFAULT_TIPO_INSTALACAO)))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA)))
            .andExpect(jsonPath("$.[*].municipio").value(hasItem(DEFAULT_MUNICIPIO)))
            .andExpect(jsonPath("$.[*].bairro").value(hasItem(DEFAULT_BAIRRO)))
            .andExpect(jsonPath("$.[*].rua").value(hasItem(DEFAULT_RUA)))
            .andExpect(jsonPath("$.[*].quarteirao").value(hasItem(DEFAULT_QUARTEIRAO)))
            .andExpect(jsonPath("$.[*].numeroPorta").value(hasItem(DEFAULT_NUMERO_PORTA)));

        // Check, that the count call also returns 1
        restInstituicaoEnsinoMockMvc.perform(get("/api/instituicao-ensinos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultInstituicaoEnsinoShouldNotBeFound(String filter) throws Exception {
        restInstituicaoEnsinoMockMvc.perform(get("/api/instituicao-ensinos?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restInstituicaoEnsinoMockMvc.perform(get("/api/instituicao-ensinos/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(content().string("0"));
    }


    @Test
    @Transactional
    public void getNonExistingInstituicaoEnsino() throws Exception {
        // Get the instituicaoEnsino
        restInstituicaoEnsinoMockMvc.perform(get("/api/instituicao-ensinos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInstituicaoEnsino() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        int databaseSizeBeforeUpdate = instituicaoEnsinoRepository.findAll().size();

        // Update the instituicaoEnsino
        InstituicaoEnsino updatedInstituicaoEnsino = instituicaoEnsinoRepository.findById(instituicaoEnsino.getId()).get();
        // Disconnect from session so that the updates on updatedInstituicaoEnsino are not directly saved in db
        em.detach(updatedInstituicaoEnsino);
        updatedInstituicaoEnsino
            .nome(UPDATED_NOME)
            .logotipo(UPDATED_LOGOTIPO)
            .logotipoContentType(UPDATED_LOGOTIPO_CONTENT_TYPE)
            .fundacao(UPDATED_FUNDACAO)
            .fundador(UPDATED_FUNDADOR)
            .numero(UPDATED_NUMERO)
            .dimensao(UPDATED_DIMENSAO)
            .sede(UPDATED_SEDE)
            .tipoVinculo(UPDATED_TIPO_VINCULO)
            .unidadePagadora(UPDATED_UNIDADE_PAGADORA)
            .tipoInstalacao(UPDATED_TIPO_INSTALACAO)
            .provincia(UPDATED_PROVINCIA)
            .municipio(UPDATED_MUNICIPIO)
            .bairro(UPDATED_BAIRRO)
            .rua(UPDATED_RUA)
            .quarteirao(UPDATED_QUARTEIRAO)
            .numeroPorta(UPDATED_NUMERO_PORTA);
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(updatedInstituicaoEnsino);

        restInstituicaoEnsinoMockMvc.perform(put("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isOk());

        // Validate the InstituicaoEnsino in the database
        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeUpdate);
        InstituicaoEnsino testInstituicaoEnsino = instituicaoEnsinoList.get(instituicaoEnsinoList.size() - 1);
        assertThat(testInstituicaoEnsino.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testInstituicaoEnsino.getLogotipo()).isEqualTo(UPDATED_LOGOTIPO);
        assertThat(testInstituicaoEnsino.getLogotipoContentType()).isEqualTo(UPDATED_LOGOTIPO_CONTENT_TYPE);
        assertThat(testInstituicaoEnsino.getFundacao()).isEqualTo(UPDATED_FUNDACAO);
        assertThat(testInstituicaoEnsino.getFundador()).isEqualTo(UPDATED_FUNDADOR);
        assertThat(testInstituicaoEnsino.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testInstituicaoEnsino.getDimensao()).isEqualTo(UPDATED_DIMENSAO);
        assertThat(testInstituicaoEnsino.isSede()).isEqualTo(UPDATED_SEDE);
        assertThat(testInstituicaoEnsino.getTipoVinculo()).isEqualTo(UPDATED_TIPO_VINCULO);
        assertThat(testInstituicaoEnsino.getUnidadePagadora()).isEqualTo(UPDATED_UNIDADE_PAGADORA);
        assertThat(testInstituicaoEnsino.getTipoInstalacao()).isEqualTo(UPDATED_TIPO_INSTALACAO);
        assertThat(testInstituicaoEnsino.getProvincia()).isEqualTo(UPDATED_PROVINCIA);
        assertThat(testInstituicaoEnsino.getMunicipio()).isEqualTo(UPDATED_MUNICIPIO);
        assertThat(testInstituicaoEnsino.getBairro()).isEqualTo(UPDATED_BAIRRO);
        assertThat(testInstituicaoEnsino.getRua()).isEqualTo(UPDATED_RUA);
        assertThat(testInstituicaoEnsino.getQuarteirao()).isEqualTo(UPDATED_QUARTEIRAO);
        assertThat(testInstituicaoEnsino.getNumeroPorta()).isEqualTo(UPDATED_NUMERO_PORTA);

        // Validate the InstituicaoEnsino in Elasticsearch
        verify(mockInstituicaoEnsinoSearchRepository, times(1)).save(testInstituicaoEnsino);
    }

    @Test
    @Transactional
    public void updateNonExistingInstituicaoEnsino() throws Exception {
        int databaseSizeBeforeUpdate = instituicaoEnsinoRepository.findAll().size();

        // Create the InstituicaoEnsino
        InstituicaoEnsinoDTO instituicaoEnsinoDTO = instituicaoEnsinoMapper.toDto(instituicaoEnsino);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInstituicaoEnsinoMockMvc.perform(put("/api/instituicao-ensinos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(instituicaoEnsinoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the InstituicaoEnsino in the database
        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeUpdate);

        // Validate the InstituicaoEnsino in Elasticsearch
        verify(mockInstituicaoEnsinoSearchRepository, times(0)).save(instituicaoEnsino);
    }

    @Test
    @Transactional
    public void deleteInstituicaoEnsino() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);

        int databaseSizeBeforeDelete = instituicaoEnsinoRepository.findAll().size();

        // Delete the instituicaoEnsino
        restInstituicaoEnsinoMockMvc.perform(delete("/api/instituicao-ensinos/{id}", instituicaoEnsino.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InstituicaoEnsino> instituicaoEnsinoList = instituicaoEnsinoRepository.findAll();
        assertThat(instituicaoEnsinoList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the InstituicaoEnsino in Elasticsearch
        verify(mockInstituicaoEnsinoSearchRepository, times(1)).deleteById(instituicaoEnsino.getId());
    }

    @Test
    @Transactional
    public void searchInstituicaoEnsino() throws Exception {
        // Initialize the database
        instituicaoEnsinoRepository.saveAndFlush(instituicaoEnsino);
        when(mockInstituicaoEnsinoSearchRepository.search(queryStringQuery("id:" + instituicaoEnsino.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(instituicaoEnsino), PageRequest.of(0, 1), 1));
        // Search the instituicaoEnsino
        restInstituicaoEnsinoMockMvc.perform(get("/api/_search/instituicao-ensinos?query=id:" + instituicaoEnsino.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(instituicaoEnsino.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].logotipoContentType").value(hasItem(DEFAULT_LOGOTIPO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logotipo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGOTIPO))))
            .andExpect(jsonPath("$.[*].fundacao").value(hasItem(DEFAULT_FUNDACAO.toString())))
            .andExpect(jsonPath("$.[*].fundador").value(hasItem(DEFAULT_FUNDADOR)))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO)))
            .andExpect(jsonPath("$.[*].dimensao").value(hasItem(DEFAULT_DIMENSAO)))
            .andExpect(jsonPath("$.[*].sede").value(hasItem(DEFAULT_SEDE.booleanValue())))
            .andExpect(jsonPath("$.[*].tipoVinculo").value(hasItem(DEFAULT_TIPO_VINCULO)))
            .andExpect(jsonPath("$.[*].unidadePagadora").value(hasItem(DEFAULT_UNIDADE_PAGADORA)))
            .andExpect(jsonPath("$.[*].tipoInstalacao").value(hasItem(DEFAULT_TIPO_INSTALACAO)))
            .andExpect(jsonPath("$.[*].provincia").value(hasItem(DEFAULT_PROVINCIA)))
            .andExpect(jsonPath("$.[*].municipio").value(hasItem(DEFAULT_MUNICIPIO)))
            .andExpect(jsonPath("$.[*].bairro").value(hasItem(DEFAULT_BAIRRO)))
            .andExpect(jsonPath("$.[*].rua").value(hasItem(DEFAULT_RUA)))
            .andExpect(jsonPath("$.[*].quarteirao").value(hasItem(DEFAULT_QUARTEIRAO)))
            .andExpect(jsonPath("$.[*].numeroPorta").value(hasItem(DEFAULT_NUMERO_PORTA)));
    }
}
