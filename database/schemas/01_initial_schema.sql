-- Fraud Detection Portal Database Schema
-- PostgreSQL 14+

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enums
CREATE TYPE domain_type AS ENUM ('RETAIL', 'CREDIT', 'DEBIT');
CREATE TYPE environment_type AS ENUM ('DEV', 'STAGING', 'PROD');
CREATE TYPE rule_status_type AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE');
CREATE TYPE user_role_type AS ENUM ('ADMIN', 'MAKER', 'CHECKER', 'VIEWER', 'SUPER_ADMIN');
CREATE TYPE approval_status_type AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE change_type AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'DEPLOY');
CREATE TYPE data_type AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'DATE', 'DECIMAL', 'ENUM');

-- ====================================
-- USER MANAGEMENT
-- ====================================

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role user_role_type NOT NULL DEFAULT 'VIEWER',
    department VARCHAR(100),
    is_active BOOLEAN NOT NULL DEFAULT true,
    last_login TIMESTAMP,
    failed_login_attempts INTEGER DEFAULT 0,
    account_locked_until TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100)
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_is_active ON users(is_active);

-- ====================================
-- RULE MANAGEMENT
-- ====================================

CREATE TABLE rulesets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    domain domain_type NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) NOT NULL,
    updated_by VARCHAR(100)
);

CREATE UNIQUE INDEX idx_rulesets_name ON rulesets(LOWER(name));
CREATE INDEX idx_rulesets_domain ON rulesets(domain);
CREATE INDEX idx_rulesets_is_active ON rulesets(is_active);
CREATE INDEX idx_rulesets_created_by ON rulesets(created_by);

CREATE TABLE ruleset_deployments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ruleset_id UUID NOT NULL REFERENCES rulesets(id) ON DELETE CASCADE,
    environment environment_type NOT NULL,
    deployed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deployed_by VARCHAR(100) NOT NULL,
    version INTEGER NOT NULL,
    UNIQUE(ruleset_id, environment)
);

CREATE INDEX idx_ruleset_deployments_ruleset ON ruleset_deployments(ruleset_id);
CREATE INDEX idx_ruleset_deployments_environment ON ruleset_deployments(environment);

CREATE TABLE rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ruleset_id UUID NOT NULL REFERENCES rulesets(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    domain domain_type NOT NULL,
    condition JSONB NOT NULL,
    action JSONB NOT NULL,
    priority INTEGER NOT NULL DEFAULT 1,
    status rule_status_type NOT NULL DEFAULT 'DRAFT',
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) NOT NULL,
    updated_by VARCHAR(100)
);

CREATE INDEX idx_rules_ruleset ON rules(ruleset_id);
CREATE INDEX idx_rules_status ON rules(status);
CREATE INDEX idx_rules_priority ON rules(priority);
CREATE INDEX idx_rules_domain ON rules(domain);
CREATE INDEX idx_rules_condition_gin ON rules USING gin(condition);
CREATE INDEX idx_rules_action_gin ON rules USING gin(action);

-- ====================================
-- DATA DICTIONARY
-- ====================================

CREATE TABLE data_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    display_name VARCHAR(200) NOT NULL,
    description TEXT,
    data_type data_type NOT NULL,
    domain domain_type NOT NULL,
    source VARCHAR(200) NOT NULL,
    is_nullable BOOLEAN NOT NULL DEFAULT true,
    default_value TEXT,
    validation_rules JSONB,
    enum_values TEXT[],
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_by VARCHAR(100),
    UNIQUE(name, domain)
);

CREATE INDEX idx_data_fields_name ON data_fields(name);
CREATE INDEX idx_data_fields_domain ON data_fields(domain);
CREATE INDEX idx_data_fields_data_type ON data_fields(data_type);

-- ====================================
-- FEATURE MANAGEMENT
-- ====================================

CREATE TABLE features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL UNIQUE,
    display_name VARCHAR(200) NOT NULL,
    description TEXT,
    data_type data_type NOT NULL,
    calculation_logic TEXT NOT NULL,
    dependencies TEXT[],
    domain domain_type NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) NOT NULL,
    updated_by VARCHAR(100)
);

CREATE INDEX idx_features_name ON features(name);
CREATE INDEX idx_features_domain ON features(domain);
CREATE INDEX idx_features_is_active ON features(is_active);

-- ====================================
-- MODEL MANAGEMENT
-- ====================================

CREATE TABLE models (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    version VARCHAR(50) NOT NULL,
    domain domain_type NOT NULL,
    features TEXT[],
    accuracy DECIMAL(5, 4),
    precision DECIMAL(5, 4),
    recall DECIMAL(5, 4),
    f1_score DECIMAL(5, 4),
    trained_date TIMESTAMP NOT NULL,
    deployed_date TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT true,
    model_metadata JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) NOT NULL,
    updated_by VARCHAR(100)
);

CREATE INDEX idx_models_name ON models(name);
CREATE INDEX idx_models_domain ON models(domain);
CREATE INDEX idx_models_is_active ON models(is_active);
CREATE INDEX idx_models_type ON models(type);

-- ====================================
-- MAKER-CHECKER WORKFLOW
-- ====================================

CREATE TABLE change_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type change_type NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    entity_name VARCHAR(200) NOT NULL,
    changes JSONB NOT NULL,
    reason TEXT NOT NULL,
    status approval_status_type NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100) NOT NULL,
    reviewed_at TIMESTAMP,
    reviewed_by VARCHAR(100),
    review_comments TEXT
);

CREATE INDEX idx_change_requests_status ON change_requests(status);
CREATE INDEX idx_change_requests_entity_type ON change_requests(entity_type);
CREATE INDEX idx_change_requests_created_by ON change_requests(created_by);
CREATE INDEX idx_change_requests_reviewed_by ON change_requests(reviewed_by);

-- ====================================
-- EFFICACY MONITORING
-- ====================================

CREATE TABLE efficacy_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ruleset_id UUID NOT NULL REFERENCES rulesets(id) ON DELETE CASCADE,
    environment environment_type NOT NULL,
    period_start TIMESTAMP NOT NULL,
    period_end TIMESTAMP NOT NULL,
    total_transactions BIGINT NOT NULL,
    flagged_transactions BIGINT NOT NULL,
    blocked_transactions BIGINT NOT NULL,
    true_positives BIGINT NOT NULL,
    false_positives BIGINT NOT NULL,
    true_negatives BIGINT NOT NULL,
    false_negatives BIGINT NOT NULL,
    precision DECIMAL(5, 4),
    recall DECIMAL(5, 4),
    f1_score DECIMAL(5, 4),
    accuracy DECIMAL(5, 4),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_efficacy_metrics_ruleset ON efficacy_metrics(ruleset_id);
CREATE INDEX idx_efficacy_metrics_environment ON efficacy_metrics(environment);
CREATE INDEX idx_efficacy_metrics_period ON efficacy_metrics(period_start, period_end);

CREATE TABLE rule_performance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rule_id UUID NOT NULL REFERENCES rules(id) ON DELETE CASCADE,
    efficacy_metric_id UUID NOT NULL REFERENCES efficacy_metrics(id) ON DELETE CASCADE,
    triggered_count BIGINT NOT NULL,
    true_positives BIGINT NOT NULL,
    false_positives BIGINT NOT NULL,
    precision DECIMAL(5, 4),
    avg_processing_time_ms DECIMAL(10, 2),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_rule_performance_rule ON rule_performance(rule_id);
CREATE INDEX idx_rule_performance_efficacy_metric ON rule_performance(efficacy_metric_id);

-- ====================================
-- AUDIT LOGGING
-- ====================================

CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    username VARCHAR(100) NOT NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    changes JSONB,
    ip_address INET,
    user_agent TEXT,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL,
    error_message TEXT
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_username ON audit_logs(username);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_entity_type ON audit_logs(entity_type);
CREATE INDEX idx_audit_logs_entity_id ON audit_logs(entity_id);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp DESC);

-- ====================================
-- SYSTEM CONFIGURATION
-- ====================================

CREATE TABLE system_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(200) NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    description TEXT,
    is_sensitive BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100)
);

CREATE INDEX idx_system_config_key ON system_config(config_key);

-- ====================================
-- TRIGGERS FOR UPDATED_AT
-- ====================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rulesets_updated_at BEFORE UPDATE ON rulesets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rules_updated_at BEFORE UPDATE ON rules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_data_fields_updated_at BEFORE UPDATE ON data_fields
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_features_updated_at BEFORE UPDATE ON features
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_models_updated_at BEFORE UPDATE ON models
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_config_updated_at BEFORE UPDATE ON system_config
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- COMMENTS
-- ====================================

COMMENT ON TABLE users IS 'User accounts and authentication';
COMMENT ON TABLE rulesets IS 'Collections of fraud detection rules';
COMMENT ON TABLE rules IS 'Individual fraud detection rules';
COMMENT ON TABLE data_fields IS 'Data dictionary for available fields';
COMMENT ON TABLE features IS 'Engineered features for rule creation';
COMMENT ON TABLE models IS 'ML models for fraud detection';
COMMENT ON TABLE change_requests IS 'Maker-checker workflow requests';
COMMENT ON TABLE efficacy_metrics IS 'Ruleset performance metrics';
COMMENT ON TABLE rule_performance IS 'Individual rule performance metrics';
COMMENT ON TABLE audit_logs IS 'System audit trail';
COMMENT ON TABLE system_config IS 'System configuration parameters';
