package com.bank.frauddetection.ruleservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import io.hypersistence.utils.hibernate.type.json.JsonType;

import java.time.LocalDateTime;

/**
 * Entity representing a single fraud detection rule
 */
@Entity
@Table(name = "rules", indexes = {
    @Index(name = "idx_rule_ruleset", columnList = "ruleset_id"),
    @Index(name = "idx_rule_status", columnList = "status"),
    @Index(name = "idx_rule_priority", columnList = "priority")
})
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Rule {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ruleset_id", nullable = false)
    private Ruleset ruleset;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private Domain domain;

    @Column(columnDefinition = "jsonb", nullable = false)
    private String condition;

    @Column(columnDefinition = "jsonb", nullable = false)
    private String action;

    @Column(nullable = false)
    @Builder.Default
    private Integer priority = 1;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    @Builder.Default
    private RuleStatus status = RuleStatus.DRAFT;

    @Column(nullable = false)
    @Builder.Default
    private Integer version = 1;

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
    public boolean isActive() {
        return status == RuleStatus.ACTIVE;
    }

    public boolean canBeModified() {
        return status == RuleStatus.DRAFT || status == RuleStatus.REJECTED;
    }
}
