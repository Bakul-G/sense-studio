-- Demo/Seed Data for Fraud Detection Portal
-- This script populates the database with sample data for testing and demonstration

-- ====================================
-- USERS
-- ====================================

INSERT INTO users (id, username, email, password_hash, first_name, last_name, role, department, is_active) VALUES
(uuid_generate_v4(), 'admin', 'admin@bank.com', '$2a$10$demohashdemohashdemohashdemohashdemohashdemohashdemo', 'System', 'Administrator', 'SUPER_ADMIN', 'IT Security', true),
(uuid_generate_v4(), 'john.doe', 'john.doe@bank.com', '$2a$10$demohashdemohashdemohashdemohashdemohashdemohashdemo', 'John', 'Doe', 'ADMIN', 'Risk Management', true),
(uuid_generate_v4(), 'jane.smith', 'jane.smith@bank.com', '$2a$10$demohashdemohashdemohashdemohashdemohashdemohashdemo', 'Jane', 'Smith', 'MAKER', 'Fraud Prevention', true),
(uuid_generate_v4(), 'bob.wilson', 'bob.wilson@bank.com', '$2a$10$demohashdemohashdemohashdemohashdemohashdemohashdemo', 'Bob', 'Wilson', 'CHECKER', 'Compliance', true),
(uuid_generate_v4(), 'alice.jones', 'alice.jones@bank.com', '$2a$10$demohashdemohashdemohashdemohashdemohashdemohashdemo', 'Alice', 'Jones', 'VIEWER', 'Analytics', true);

-- ====================================
-- DATA DICTIONARY
-- ====================================

INSERT INTO data_fields (name, display_name, description, data_type, domain, source, is_nullable, default_value, created_by) VALUES
('transaction_amount', 'Transaction Amount', 'The monetary value of the transaction', 'DECIMAL', 'RETAIL', 'TRANSACTION_TABLE', false, '0.00', 'admin'),
('customer_id', 'Customer ID', 'Unique identifier for the customer', 'STRING', 'RETAIL', 'CUSTOMER_TABLE', false, null, 'admin'),
('transaction_count', 'Transaction Count', 'Number of transactions in a time window', 'NUMBER', 'RETAIL', 'CALCULATED', true, '0', 'admin'),
('account_age_days', 'Account Age (Days)', 'Number of days since account creation', 'NUMBER', 'RETAIL', 'CALCULATED', false, null, 'admin'),
('transaction_location', 'Transaction Location', 'Geographic location of the transaction', 'STRING', 'RETAIL', 'TRANSACTION_TABLE', true, null, 'admin'),
('card_number', 'Card Number', 'Masked credit card number', 'STRING', 'CREDIT', 'CARD_TABLE', false, null, 'admin'),
('cvv', 'CVV', 'Card security code', 'STRING', 'CREDIT', 'CARD_TABLE', true, null, 'admin'),
('credit_limit', 'Credit Limit', 'Maximum credit available', 'DECIMAL', 'CREDIT', 'CARD_TABLE', false, '0.00', 'admin'),
('available_credit', 'Available Credit', 'Remaining credit available', 'DECIMAL', 'CREDIT', 'CALCULATED', false, '0.00', 'admin'),
('debit_balance', 'Debit Balance', 'Current account balance', 'DECIMAL', 'DEBIT', 'ACCOUNT_TABLE', false, '0.00', 'admin');

-- ====================================
-- FEATURES
-- ====================================

INSERT INTO features (name, display_name, description, data_type, calculation_logic, dependencies, domain, is_active, created_by) VALUES
('transaction_velocity', 'Transaction Velocity', 'Number of transactions in last 10 minutes', 'NUMBER', 'COUNT(transactions) WHERE timestamp > NOW() - INTERVAL ''10 minutes''', ARRAY['customer_id', 'transaction_timestamp'], 'RETAIL', true, 'admin'),
('amount_deviation', 'Amount Deviation', 'Deviation from customer average transaction amount', 'DECIMAL', '(current_amount - AVG(historical_amounts)) / STDDEV(historical_amounts)', ARRAY['transaction_amount', 'customer_id'], 'RETAIL', true, 'admin'),
('location_risk_score', 'Location Risk Score', 'Risk score based on transaction location', 'DECIMAL', 'LOOKUP(location_risk_table, transaction_location)', ARRAY['transaction_location'], 'RETAIL', true, 'admin'),
('time_since_last_transaction', 'Time Since Last Transaction', 'Minutes since previous transaction', 'NUMBER', 'DATEDIFF(current_timestamp, last_transaction_timestamp)', ARRAY['customer_id'], 'RETAIL', true, 'admin'),
('credit_utilization', 'Credit Utilization', 'Percentage of credit limit used', 'DECIMAL', '(credit_limit - available_credit) / credit_limit * 100', ARRAY['credit_limit', 'available_credit'], 'CREDIT', true, 'admin');

-- ====================================
-- RULESETS
-- ====================================

INSERT INTO rulesets (id, name, description, domain, is_active, version, created_by) VALUES
('11111111-1111-1111-1111-111111111111', 'High Risk Transaction Rules', 'Rules to detect high-risk transactions based on amount and velocity', 'RETAIL', true, 3, 'john.doe'),
('22222222-2222-2222-2222-222222222222', 'Credit Card Fraud Detection', 'ML-based rules for credit card fraud patterns', 'CREDIT', true, 5, 'jane.smith'),
('33333333-3333-3333-3333-333333333333', 'Debit Card Security Rules', 'Rules for debit card transaction monitoring', 'DEBIT', false, 2, 'bob.wilson');

-- ====================================
-- RULESET DEPLOYMENTS
-- ====================================

INSERT INTO ruleset_deployments (ruleset_id, environment, deployed_by, version) VALUES
('11111111-1111-1111-1111-111111111111', 'DEV', 'john.doe', 3),
('11111111-1111-1111-1111-111111111111', 'STAGING', 'john.doe', 3),
('11111111-1111-1111-1111-111111111111', 'PROD', 'bob.wilson', 2),
('22222222-2222-2222-2222-222222222222', 'DEV', 'jane.smith', 5),
('22222222-2222-2222-2222-222222222222', 'STAGING', 'jane.smith', 5),
('33333333-3333-3333-3333-333333333333', 'DEV', 'bob.wilson', 2);

-- ====================================
-- RULES
-- ====================================

INSERT INTO rules (id, ruleset_id, name, description, domain, condition, action, priority, status, created_by) VALUES
('r1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Large Amount Transaction', 'Block transactions above $10,000',
'RETAIL',
'{"expression": "transaction_amount > 10000", "operator": "AND", "fields": ["transaction_amount"], "conditions": [{"field": "transaction_amount", "operator": "GREATER_THAN", "value": 10000, "dataType": "DECIMAL"}]}'::jsonb,
'{"type": "BLOCK", "reason": "Transaction amount exceeds limit", "notifications": ["risk@bank.com"]}'::jsonb,
1, 'ACTIVE', 'john.doe'),

('r2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Rapid Transaction Velocity', 'Flag accounts with more than 5 transactions in 10 minutes',
'RETAIL',
'{"expression": "transaction_count > 5 AND time_window < 10", "operator": "AND", "fields": ["transaction_count", "time_window"], "conditions": [{"field": "transaction_count", "operator": "GREATER_THAN", "value": 5, "dataType": "NUMBER"}, {"field": "time_window", "operator": "LESS_THAN", "value": 10, "dataType": "NUMBER"}]}'::jsonb,
'{"type": "REVIEW", "reason": "Unusual transaction velocity", "notifications": ["fraud@bank.com"]}'::jsonb,
2, 'ACTIVE', 'john.doe'),

('r3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'New Account High Amount', 'Review high-value transactions from new accounts',
'RETAIL',
'{"expression": "account_age_days < 30 AND transaction_amount > 5000", "operator": "AND", "fields": ["account_age_days", "transaction_amount"], "conditions": [{"field": "account_age_days", "operator": "LESS_THAN", "value": 30, "dataType": "NUMBER"}, {"field": "transaction_amount", "operator": "GREATER_THAN", "value": 5000, "dataType": "DECIMAL"}]}'::jsonb,
'{"type": "REVIEW", "reason": "High amount from new account", "score": 75}'::jsonb,
3, 'ACTIVE', 'john.doe'),

('r4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Credit Limit Breach', 'Block transactions exceeding credit limit',
'CREDIT',
'{"expression": "transaction_amount > available_credit", "operator": "AND", "fields": ["transaction_amount", "available_credit"], "conditions": [{"field": "transaction_amount", "operator": "GREATER_THAN", "value": "available_credit", "dataType": "DECIMAL"}]}'::jsonb,
'{"type": "BLOCK", "reason": "Insufficient credit", "notifications": ["credit@bank.com"]}'::jsonb,
1, 'ACTIVE', 'jane.smith'),

('r5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'High Utilization Alert', 'Flag cards with >90% utilization',
'CREDIT',
'{"expression": "credit_utilization > 90", "operator": "AND", "fields": ["credit_utilization"], "conditions": [{"field": "credit_utilization", "operator": "GREATER_THAN", "value": 90, "dataType": "DECIMAL"}]}'::jsonb,
'{"type": "FLAG", "reason": "High credit utilization", "score": 60}'::jsonb,
2, 'ACTIVE', 'jane.smith');

-- ====================================
-- MODELS
-- ====================================

INSERT INTO models (name, description, type, version, domain, features, accuracy, precision, recall, f1_score, trained_date, deployed_date, is_active, created_by) VALUES
('Retail Fraud Classifier v3', 'XGBoost model for retail transaction fraud detection', 'CLASSIFICATION', '3.0.1', 'RETAIL',
ARRAY['transaction_velocity', 'amount_deviation', 'location_risk_score', 'time_since_last_transaction'],
0.9542, 0.9421, 0.9287, 0.9353,
'2024-01-15 10:00:00', '2024-01-20 14:30:00', true, 'john.doe'),

('Credit Risk Neural Net', 'Deep learning model for credit card fraud', 'NEURAL_NETWORK', '2.1.0', 'CREDIT',
ARRAY['credit_utilization', 'transaction_velocity', 'location_risk_score'],
0.9625, 0.9512, 0.9438, 0.9474,
'2024-01-10 09:00:00', '2024-01-18 11:00:00', true, 'jane.smith'),

('Debit Anomaly Detector', 'Isolation forest for debit card anomaly detection', 'CLUSTERING', '1.0.5', 'DEBIT',
ARRAY['transaction_amount', 'transaction_velocity', 'location_risk_score'],
0.8934, 0.8721, 0.8856, 0.8788,
'2024-01-05 08:00:00', NULL, false, 'bob.wilson');

-- ====================================
-- CHANGE REQUESTS
-- ====================================

INSERT INTO change_requests (type, entity_type, entity_id, entity_name, changes, reason, status, created_by, reviewed_at, reviewed_by, review_comments) VALUES
('UPDATE', 'RULE', 'r1111111-1111-1111-1111-111111111111', 'Large Amount Transaction',
'{"old": {"priority": 1}, "new": {"priority": 2}}'::jsonb,
'Adjusting priority based on efficacy analysis', 'PENDING', 'jane.smith', NULL, NULL, NULL),

('CREATE', 'RULESET', NULL, 'Mobile Banking Rules',
'{"name": "Mobile Banking Rules", "domain": "RETAIL", "description": "Rules specific to mobile app transactions"}'::jsonb,
'New ruleset for mobile channel fraud', 'APPROVED', 'john.doe', '2024-01-22 15:30:00', 'bob.wilson', 'Approved. Good addition to our fraud prevention.'),

('DEPLOY', 'RULESET', '22222222-2222-2222-2222-222222222222', 'Credit Card Fraud Detection',
'{"environment": "PROD", "version": 5}'::jsonb,
'Deploying tested rules to production', 'PENDING', 'jane.smith', NULL, NULL, NULL);

-- ====================================
-- EFFICACY METRICS
-- ====================================

INSERT INTO efficacy_metrics (ruleset_id, environment, period_start, period_end, total_transactions, flagged_transactions, blocked_transactions,
true_positives, false_positives, true_negatives, false_negatives, precision, recall, f1_score, accuracy) VALUES
('11111111-1111-1111-1111-111111111111', 'PROD', '2024-01-01 00:00:00', '2024-01-31 23:59:59', 1250000, 8542, 3215,
3012, 203, 1241455, 330, 0.9369, 0.9013, 0.9187, 0.9957),

('11111111-1111-1111-1111-111111111111', 'PROD', '2024-02-01 00:00:00', '2024-02-29 23:59:59', 1180000, 7892, 2985,
2845, 140, 1176960, 55, 0.9531, 0.9810, 0.9668, 0.9983),

('22222222-2222-2222-2222-222222222222', 'STAGING', '2024-01-15 00:00:00', '2024-01-31 23:59:59', 456000, 3245, 1520,
1425, 95, 454480, 0, 0.9375, 1.0000, 0.9677, 0.9998);

-- ====================================
-- SYSTEM CONFIGURATION
-- ====================================

INSERT INTO system_config (config_key, config_value, description, is_sensitive) VALUES
('max_login_attempts', '5', 'Maximum number of failed login attempts before account lockout', false),
('session_timeout_minutes', '30', 'Session timeout duration in minutes', false),
('password_min_length', '12', 'Minimum password length', false),
('audit_retention_days', '90', 'Number of days to retain audit logs', false),
('api_rate_limit_per_minute', '100', 'Maximum API requests per minute per user', false),
('enable_2fa', 'true', 'Enable two-factor authentication', false),
('smtp_server', 'smtp.bank.com', 'SMTP server for email notifications', false),
('smtp_port', '587', 'SMTP server port', false),
('notification_email_from', 'fraud-detection@bank.com', 'From address for system notifications', false),
('max_rule_priority', '100', 'Maximum allowed priority value for rules', false);

-- ====================================
-- AUDIT LOGS (Sample)
-- ====================================

INSERT INTO audit_logs (username, action, entity_type, entity_id, changes, ip_address, status) VALUES
('john.doe', 'CREATE', 'RULESET', '11111111-1111-1111-1111-111111111111', '{"name": "High Risk Transaction Rules"}'::jsonb, '10.0.1.15', 'SUCCESS'),
('jane.smith', 'UPDATE', 'RULE', 'r1111111-1111-1111-1111-111111111111', '{"priority": {"from": 1, "to": 2}}'::jsonb, '10.0.1.22', 'SUCCESS'),
('bob.wilson', 'APPROVE', 'CHANGE_REQUEST', NULL, '{"id": "xxx", "type": "CREATE"}'::jsonb, '10.0.1.45', 'SUCCESS'),
('admin', 'LOGIN', 'USER', NULL, NULL, '10.0.1.1', 'SUCCESS'),
('alice.jones', 'VIEW', 'RULESET', '22222222-2222-2222-2222-222222222222', NULL, '10.0.1.33', 'SUCCESS');

-- Commit
COMMIT;
