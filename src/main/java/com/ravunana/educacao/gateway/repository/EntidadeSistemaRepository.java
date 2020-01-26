package com.ravunana.educacao.gateway.repository;

import com.ravunana.educacao.gateway.domain.EntidadeSistema;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EntidadeSistema entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntidadeSistemaRepository extends JpaRepository<EntidadeSistema, Long> {

}
