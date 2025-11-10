// API Endpoints
export const API_BASE_URL = '/api/v1';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    ME: `${API_BASE_URL}/auth/me`,
  },
  // Rules
  RULES: {
    BASE: `${API_BASE_URL}/rules`,
    BY_ID: (id: string) => `${API_BASE_URL}/rules/${id}`,
    BY_RULESET: (rulesetId: string) => `${API_BASE_URL}/rulesets/${rulesetId}/rules`,
  },
  // Rulesets
  RULESETS: {
    BASE: `${API_BASE_URL}/rulesets`,
    BY_ID: (id: string) => `${API_BASE_URL}/rulesets/${id}`,
    DEPLOY: (id: string) => `${API_BASE_URL}/rulesets/${id}/deploy`,
    VERSIONS: (id: string) => `${API_BASE_URL}/rulesets/${id}/versions`,
  },
  // Data Dictionary
  DATA_DICTIONARY: {
    BASE: `${API_BASE_URL}/data-dictionary`,
    BY_ID: (id: string) => `${API_BASE_URL}/data-dictionary/${id}`,
    BY_DOMAIN: (domain: string) => `${API_BASE_URL}/data-dictionary/domain/${domain}`,
  },
  // Features
  FEATURES: {
    BASE: `${API_BASE_URL}/features`,
    BY_ID: (id: string) => `${API_BASE_URL}/features/${id}`,
    BY_DOMAIN: (domain: string) => `${API_BASE_URL}/features/domain/${domain}`,
  },
  // Models
  MODELS: {
    BASE: `${API_BASE_URL}/models`,
    BY_ID: (id: string) => `${API_BASE_URL}/models/${id}`,
    DEPLOY: (id: string) => `${API_BASE_URL}/models/${id}/deploy`,
  },
  // Maker-Checker
  CHANGE_REQUESTS: {
    BASE: `${API_BASE_URL}/change-requests`,
    BY_ID: (id: string) => `${API_BASE_URL}/change-requests/${id}`,
    APPROVE: (id: string) => `${API_BASE_URL}/change-requests/${id}/approve`,
    REJECT: (id: string) => `${API_BASE_URL}/change-requests/${id}/reject`,
    PENDING: `${API_BASE_URL}/change-requests/pending`,
  },
  // Efficacy
  EFFICACY: {
    BASE: `${API_BASE_URL}/efficacy`,
    BY_RULESET: (rulesetId: string) => `${API_BASE_URL}/efficacy/ruleset/${rulesetId}`,
    DASHBOARD: `${API_BASE_URL}/efficacy/dashboard`,
  },
  // Admin
  ADMIN: {
    USERS: `${API_BASE_URL}/admin/users`,
    USER_BY_ID: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
    AUDIT_LOGS: `${API_BASE_URL}/admin/audit-logs`,
    SYSTEM_CONFIG: `${API_BASE_URL}/admin/config`,
  },
};

// Domain Options
export const DOMAINS = [
  { value: 'RETAIL', label: 'Retail Banking' },
  { value: 'CREDIT', label: 'Credit Cards' },
  { value: 'DEBIT', label: 'Debit Cards' },
];

// Environment Options
export const ENVIRONMENTS = [
  { value: 'DEV', label: 'Development', color: '#2196f3' },
  { value: 'STAGING', label: 'Staging', color: '#ff9800' },
  { value: 'PROD', label: 'Production', color: '#4caf50' },
];

// Rule Status Options
export const RULE_STATUSES = [
  { value: 'DRAFT', label: 'Draft', color: '#9e9e9e' },
  { value: 'PENDING_APPROVAL', label: 'Pending Approval', color: '#ff9800' },
  { value: 'APPROVED', label: 'Approved', color: '#4caf50' },
  { value: 'REJECTED', label: 'Rejected', color: '#f44336' },
  { value: 'ACTIVE', label: 'Active', color: '#2196f3' },
  { value: 'INACTIVE', label: 'Inactive', color: '#9e9e9e' },
];

// Data Type Options
export const DATA_TYPES = [
  { value: 'STRING', label: 'String' },
  { value: 'NUMBER', label: 'Number' },
  { value: 'BOOLEAN', label: 'Boolean' },
  { value: 'DATE', label: 'Date' },
  { value: 'DECIMAL', label: 'Decimal' },
  { value: 'ENUM', label: 'Enumeration' },
];

// Operator Options
export const OPERATORS = [
  { value: 'EQUALS', label: 'Equals (=)', symbol: '==' },
  { value: 'NOT_EQUALS', label: 'Not Equals (≠)', symbol: '!=' },
  { value: 'GREATER_THAN', label: 'Greater Than (>)', symbol: '>' },
  { value: 'LESS_THAN', label: 'Less Than (<)', symbol: '<' },
  { value: 'GREATER_THAN_OR_EQUAL', label: 'Greater Than or Equal (≥)', symbol: '>=' },
  { value: 'LESS_THAN_OR_EQUAL', label: 'Less Than or Equal (≤)', symbol: '<=' },
  { value: 'CONTAINS', label: 'Contains', symbol: 'contains' },
  { value: 'IN', label: 'In List', symbol: 'in' },
  { value: 'BETWEEN', label: 'Between', symbol: 'between' },
];

// Action Types
export const ACTION_TYPES = [
  { value: 'BLOCK', label: 'Block Transaction', color: '#f44336', icon: 'block' },
  { value: 'ALLOW', label: 'Allow Transaction', color: '#4caf50', icon: 'check_circle' },
  { value: 'REVIEW', label: 'Manual Review', color: '#ff9800', icon: 'rate_review' },
  { value: 'SCORE', label: 'Assign Risk Score', color: '#2196f3', icon: 'analytics' },
  { value: 'FLAG', label: 'Flag for Investigation', color: '#9c27b0', icon: 'flag' },
];

// User Roles
export const USER_ROLES = [
  { value: 'ADMIN', label: 'Administrator', description: 'Full system access and configuration' },
  { value: 'MAKER', label: 'Maker', description: 'Can create and modify rules' },
  { value: 'CHECKER', label: 'Checker', description: 'Can approve or reject changes' },
  { value: 'VIEWER', label: 'Viewer', description: 'Read-only access' },
  { value: 'SUPER_ADMIN', label: 'Super Administrator', description: 'Complete system control' },
];

// Table Page Size Options
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// Session Timeout (in minutes)
export const SESSION_TIMEOUT = 30;

// Chart Colors
export const CHART_COLORS = {
  primary: '#1976d2',
  secondary: '#dc004e',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  DISPLAY_WITH_TIME: 'MMM dd, yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss",
  API: 'yyyy-MM-dd',
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  MIN_LENGTH: (min: number) => `Minimum ${min} characters required`,
  MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
  INVALID_FORMAT: 'Invalid format',
};
