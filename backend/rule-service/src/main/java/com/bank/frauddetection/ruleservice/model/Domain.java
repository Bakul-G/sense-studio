package com.bank.frauddetection.ruleservice.model;

/**
 * Enum representing banking domains
 */
public enum Domain {
    RETAIL("Retail Banking"),
    CREDIT("Credit Cards"),
    DEBIT("Debit Cards");

    private final String displayName;

    Domain(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
