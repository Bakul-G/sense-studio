package com.bank.frauddetection.ruleservice.repository;

import com.bank.frauddetection.ruleservice.model.Domain;
import com.bank.frauddetection.ruleservice.model.Ruleset;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Ruleset entity operations
 */
@Repository
public interface RulesetRepository extends JpaRepository<Ruleset, String> {

    /**
     * Find all rulesets by domain
     */
    List<Ruleset> findByDomain(Domain domain);

    /**
     * Find all active rulesets
     */
    List<Ruleset> findByIsActiveTrue();

    /**
     * Find rulesets by domain and active status
     */
    List<Ruleset> findByDomainAndIsActive(Domain domain, Boolean isActive);

    /**
     * Find ruleset by name (case-insensitive)
     */
    Optional<Ruleset> findByNameIgnoreCase(String name);

    /**
     * Search rulesets by name or description
     */
    @Query("SELECT r FROM Ruleset r WHERE " +
           "LOWER(r.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(r.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Ruleset> searchRulesets(@Param("searchTerm") String searchTerm, Pageable pageable);

    /**
     * Find rulesets created by user
     */
    List<Ruleset> findByCreatedBy(String userId);

    /**
     * Check if ruleset name exists
     */
    boolean existsByNameIgnoreCase(String name);
}
