package com.ravunana.educacao.gateway.repository;

import com.ravunana.educacao.gateway.domain.LicencaSoftware;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the LicencaSoftware entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LicencaSoftwareRepository extends JpaRepository<LicencaSoftware, Long> {

}
