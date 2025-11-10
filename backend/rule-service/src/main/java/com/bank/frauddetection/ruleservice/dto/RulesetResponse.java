package com.bank.frauddetection.ruleservice.dto;

import com.bank.frauddetection.ruleservice.model.Domain;
import com.bank.frauddetection.ruleservice.model.Environment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

/**
 * DTO for Ruleset response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RulesetResponse {
    private String id;
    private String name;
    private String description;
    private Domain domain;
    private Boolean isActive;
    private Integer version;
    private List<RuleResponse> rules;
    private Set<Environment> deployedEnvironments;
    private String createdBy;
    private LocalDateTime createdAt;
    private String updatedBy;
    private LocalDateTime updatedAt;
}
