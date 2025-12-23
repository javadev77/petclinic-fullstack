package org.springframework.samples.petclinic.repository.springdatajpa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.samples.petclinic.model.Owner;

/**
 * Custom repository interface for methods that need manual Page construction
 */
public interface SpringDataOwnerRepositoryCustom {

    Page<Owner> findPageByLastName(String lastName, Pageable pageable);

    Page<Owner> findPage(Pageable pageable);
}
