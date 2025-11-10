// Domain Types
export type Domain = 'RETAIL' | 'CREDIT' | 'DEBIT';
export type Environment = 'DEV' | 'STAGING' | 'PROD';
export type RuleStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'INACTIVE';
export type FieldDataType = 'STRING' | 'NUMBER' | 'BOOLEAN' | 'DATE' | 'DECIMAL' | 'ENUM';
export type UserRole = 'ADMIN' | 'MAKER' | 'CHECKER' | 'VIEWER' | 'SUPER_ADMIN';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type ChangeType = 'CREATE' | 'UPDATE' | 'DELETE' | 'DEPLOY';

// User & Auth Types
export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  department: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Rule Types
export interface Rule {
  id: string;
  name: string;
  description: string;
  rulesetId: string;
  domain: Domain;
  condition: RuleCondition;
  action: RuleAction;
  priority: number;
  status: RuleStatus;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface RuleCondition {
  expression: string;
  fields: string[];
  operator: 'AND' | 'OR';
  conditions: SubCondition[];
}

export interface SubCondition {
  field: string;
  operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS' | 'IN' | 'BETWEEN';
  value: any;
  dataType: FieldDataType;
}

export interface RuleAction {
  type: 'BLOCK' | 'ALLOW' | 'REVIEW' | 'SCORE' | 'FLAG';
  score?: number;
  reason: string;
  notifications?: string[];
}

export interface Ruleset {
  id: string;
  name: string;
  description: string;
  domain: Domain;
  rules: Rule[];
  isActive: boolean;
  version: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deployedEnvironments: Environment[];
}

// Data Dictionary Types
export interface DataDictionary {
  id: string;
  name: string;
  description: string;
  domain: Domain;
  version: number;
  status: 'ACTIVE' | 'DEPRECATED' | 'DRAFT';
  fields: DataField[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  deployedEnvironments: Environment[];
}

export interface DataField {
  id: string;
  name: string;
  displayName: string;
  description: string;
  dataType: FieldDataType;
  source: string;
  category: string;
  isNullable: boolean;
  defaultValue?: string;
  validationRules?: ValidationRule[];
  enumValues?: string[];
}

export interface ValidationRule {
  type: 'REGEX' | 'RANGE' | 'LENGTH' | 'CUSTOM';
  value: string;
  errorMessage: string;
}

// Feature Types
export interface Feature {
  id: string;
  name: string;
  displayName: string;
  description: string;
  dataType: FieldDataType;
  calculationLogic: string;
  dependencies: string[];
  domain: Domain;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

// Model Types
export interface Model {
  id: string;
  name: string;
  description: string;
  type: 'CLASSIFICATION' | 'REGRESSION' | 'CLUSTERING' | 'NEURAL_NETWORK';
  version: string;
  domain: Domain;
  features: string[];
  accuracy?: number;
  precision?: number;
  recall?: number;
  f1Score?: number;
  trainedDate: string;
  deployedDate?: string;
  isActive: boolean;
  createdBy: string;
}

// Maker-Checker Types
export interface ChangeRequest {
  id: string;
  type: ChangeType;
  entityType: 'RULE' | 'RULESET' | 'FEATURE' | 'MODEL' | 'DATA_FIELD';
  entityId: string;
  entityName: string;
  changes: any;
  reason: string;
  status: ApprovalStatus;
  createdBy: string;
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewComments?: string;
}

// Efficacy Types
export interface EfficacyMetrics {
  rulesetId: string;
  rulesetName: string;
  domain: Domain;
  environment: Environment;
  period: {
    start: string;
    end: string;
  };
  metrics: {
    totalTransactions: number;
    flaggedTransactions: number;
    blockedTransactions: number;
    truePositives: number;
    falsePositives: number;
    trueNegatives: number;
    falseNegatives: number;
    precision: number;
    recall: number;
    f1Score: number;
    accuracy: number;
  };
  rulePerformance: RulePerformance[];
}

export interface RulePerformance {
  ruleId: string;
  ruleName: string;
  triggeredCount: number;
  truePositives: number;
  falsePositives: number;
  precision: number;
  avgProcessingTime: number;
}

// Audit Types
export interface AuditLog {
  id: string;
  userId: string;
  username: string;
  action: string;
  entityType: string;
  entityId: string;
  changes: any;
  ipAddress: string;
  timestamp: string;
  status: 'SUCCESS' | 'FAILURE';
  errorMessage?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface FilterParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filters?: Record<string, any>;
}
