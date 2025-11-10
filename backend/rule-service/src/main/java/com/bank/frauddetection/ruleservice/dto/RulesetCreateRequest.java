package com.bank.frauddetection.ruleservice.dto;

import com.bank.frauddetection.ruleservice.model.Domain;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating a new ruleset
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RulesetCreateRequest {

    @NotBlank(message = "Ruleset name is required")
    @Size(max = 200, message = "Name must not exceed 200 characters")
    private String name;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    @NotNull(message = "Domain is required")
    private Domain domain;
}
