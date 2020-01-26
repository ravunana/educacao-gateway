package com.ravunana.educacao.gateway.repository;

import com.ravunana.educacao.gateway.domain.ContactoInstituicao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ContactoInstituicao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactoInstituicaoRepository extends JpaRepository<ContactoInstituicao, Long> {

}
