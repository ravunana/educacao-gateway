package com.ravunana.educacao.gateway.repository;

import com.ravunana.educacao.gateway.domain.Lookup;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Lookup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LookupRepository extends JpaRepository<Lookup, Long> {

}
