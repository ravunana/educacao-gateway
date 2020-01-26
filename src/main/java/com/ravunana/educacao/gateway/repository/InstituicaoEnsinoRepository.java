package com.ravunana.educacao.gateway.repository;

import com.ravunana.educacao.gateway.domain.InstituicaoEnsino;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the InstituicaoEnsino entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InstituicaoEnsinoRepository extends JpaRepository<InstituicaoEnsino, Long> {

}
