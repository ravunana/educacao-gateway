package com.ravunana.educacao.gateway.repository;

import com.ravunana.educacao.gateway.domain.AssinaturaDigital;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AssinaturaDigital entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssinaturaDigitalRepository extends JpaRepository<AssinaturaDigital, Long> {

}
