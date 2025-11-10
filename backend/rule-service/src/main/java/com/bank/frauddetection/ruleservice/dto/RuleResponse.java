package com.bank.frauddetection.ruleservice.dto;

import com.bank.frauddetection.ruleservice.model.Domain;
import com.bank.frauddetection.ruleservice.model.RuleStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * DTO for Rule response
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RuleResponse {
    private String id;
    private String name;
    private String description;
    private String rulesetId;
    private Domain domain;
    private Object condition;
    private Object action;
    private Integer priority;
    private RuleStatus status;
    private Integer version;
    private String createdBy;
    private LocalDateTime createdAt;
    private String updatedBy;
    private LocalDateTime updatedAt;
}
