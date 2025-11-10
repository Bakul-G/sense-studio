package com.bank.frauddetection.ruleservice.model;

/**
 * Enum representing deployment environments
 */
public enum Environment {
    DEV("Development"),
    STAGING("Staging"),
    PROD("Production");

    private final String displayName;

    Environment(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
