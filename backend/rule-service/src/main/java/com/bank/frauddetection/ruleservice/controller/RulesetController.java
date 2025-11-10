package com.bank.frauddetection.ruleservice.controller;

import com.bank.frauddetection.ruleservice.dto.RulesetCreateRequest;
import com.bank.frauddetection.ruleservice.dto.RulesetResponse;
import com.bank.frauddetection.ruleservice.dto.RulesetUpdateRequest;
import com.bank.frauddetection.ruleservice.model.Domain;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for Ruleset management
 */
@RestController
@RequestMapping("/rulesets")
@RequiredArgsConstructor
@Tag(name = "Ruleset Management", description = "APIs for managing fraud detection rulesets")
public class RulesetController {

    @Operation(summary = "Get all rulesets")
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MAKER', 'CHECKER', 'VIEWER')")
    public ResponseEntity<Page<RulesetResponse>> getAllRulesets(
            @RequestParam(required = false) Domain domain,
            @RequestParam(required = false) Boolean isActive,
            @RequestParam(required = false) String search,
            Pageable pageable) {
        // Implementation would go here
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get ruleset by ID")
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAKER', 'CHECKER', 'VIEWER')")
    public ResponseEntity<RulesetResponse> getRulesetById(@PathVariable String id) {
        // Implementation would go here
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Create new ruleset")
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'MAKER')")
    public ResponseEntity<RulesetResponse> createRuleset(
            @Valid @RequestBody RulesetCreateRequest request) {
        // Implementation would go here
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @Operation(summary = "Update ruleset")
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAKER')")
    public ResponseEntity<RulesetResponse> updateRuleset(
            @PathVariable String id,
            @Valid @RequestBody RulesetUpdateRequest request) {
        // Implementation would go here
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Delete ruleset")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteRuleset(@PathVariable String id) {
        // Implementation would go here
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Deploy ruleset to environment")
    @PostMapping("/{id}/deploy")
    @PreAuthorize("hasAnyRole('ADMIN', 'CHECKER')")
    public ResponseEntity<RulesetResponse> deployRuleset(
            @PathVariable String id,
            @RequestParam String environment) {
        // Implementation would go here
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get ruleset version history")
    @GetMapping("/{id}/versions")
    @PreAuthorize("hasAnyRole('ADMIN', 'MAKER', 'CHECKER', 'VIEWER')")
    public ResponseEntity<List<RulesetResponse>> getRulesetVersions(@PathVariable String id) {
        // Implementation would go here
        return ResponseEntity.ok().build();
    }
}
