package org.springframework.samples.petclinic.repository.springdatajpa;

import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.samples.petclinic.model.Owner;

/**
 * Custom implementation for SpringDataOwnerRepository methods that need manual Page construction
 */
public class SpringDataOwnerRepositoryImpl implements SpringDataOwnerRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @SuppressWarnings("unchecked")
    @Override
    public Page<Owner> findPageByLastName(String lastName, Pageable pageable) {
        Query query = this.em.createQuery("SELECT DISTINCT owner FROM Owner owner left join fetch owner.pets WHERE owner.lastName LIKE :lastName");
        query.setParameter("lastName", lastName + "%");
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        List<Owner> owners = query.getResultList();

        Query countQuery = this.em.createQuery("SELECT COUNT(DISTINCT owner.id) FROM Owner owner WHERE owner.lastName LIKE :lastName");
        countQuery.setParameter("lastName", lastName + "%");
        long total = (Long) countQuery.getSingleResult();

        return new PageImpl<>(owners, pageable, total);
    }

    @SuppressWarnings("unchecked")
    @Override
    public Page<Owner> findPage(Pageable pageable) {
        Query query = this.em.createQuery("SELECT DISTINCT owner FROM Owner owner left join fetch owner.pets");
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());
        List<Owner> owners = query.getResultList();

        Query countQuery = this.em.createQuery("SELECT COUNT(owner.id) FROM Owner owner");
        long total = (Long) countQuery.getSingleResult();

        return new PageImpl<>(owners, pageable, total);
    }
}
