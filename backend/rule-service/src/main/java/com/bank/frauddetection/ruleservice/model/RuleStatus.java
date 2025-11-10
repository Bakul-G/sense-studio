package com.bank.frauddetection.ruleservice.model;

/**
 * Enum representing rule lifecycle status
 */
public enum RuleStatus {
    DRAFT("Draft"),
    PENDING_APPROVAL("Pending Approval"),
    APPROVED("Approved"),
    REJECTED("Rejected"),
    ACTIVE("Active"),
    INACTIVE("Inactive");

    private final String displayName;

    RuleStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public boolean canTransitionTo(RuleStatus newStatus) {
        return switch (this) {
            case DRAFT -> newStatus == PENDING_APPROVAL || newStatus == REJECTED;
            case PENDING_APPROVAL -> newStatus == APPROVED || newStatus == REJECTED;
            case APPROVED -> newStatus == ACTIVE || newStatus == INACTIVE;
            case REJECTED -> newStatus == DRAFT;
            case ACTIVE -> newStatus == INACTIVE;
            case INACTIVE -> newStatus == ACTIVE;
        };
    }
}
