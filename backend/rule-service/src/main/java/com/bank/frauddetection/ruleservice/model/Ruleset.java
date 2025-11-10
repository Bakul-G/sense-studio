package com.bank.frauddetection.ruleservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Entity representing a collection of fraud detection rules
 */
@Entity
@Table(name = "rulesets", indexes = {
    @Index(name = "idx_ruleset_domain", columnList = "domain"),
    @Index(name = "idx_ruleset_active", columnList = "is_active")
})
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ruleset {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Domain domain;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    @Builder.Default
    private Integer version = 1;

    @OneToMany(mappedBy = "ruleset", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @Builder.Default
    private List<Rule> rules = new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "ruleset_deployments",
        joinColumns = @JoinColumn(name = "ruleset_id"))
    @Column(name = "environment")
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Set<Environment> deployedEnvironments = new HashSet<>();

    @CreatedBy
    @Column(name = "created_by", nullable = false, updatable = false)
    private String createdBy;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedBy
    @Column(name = "updated_by")
    private String updatedBy;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Helper methods
    public void addRule(Rule rule) {
        rules.add(rule);
        rule.setRuleset(this);
    }

    public void removeRule(Rule rule) {
        rules.remove(rule);
        rule.setRuleset(null);
    }

    public void addDeployment(Environment environment) {
        deployedEnvironments.add(environment);
    }

    public void removeDeployment(Environment environment) {
        deployedEnvironments.remove(environment);
    }
}
