# Fraud Detection Portal - Comprehensive Project Summary

## Table of Contents

1. [Project Structure](#project-structure)
2. [Frontend Components](#frontend-components)
3. [API Specifications](#api-specifications)
4. [Database Schema](#database-schema)
5. [Configuration Files](#configuration-files)
6. [Demo Data](#demo-data)
7. [Deployment Notes](#deployment-notes)

---

## Project Structure

### Complete Folder Hierarchy

```
fraud-detection-portal/
│
├── frontend/                                 # React + TypeScript Frontend
│   ├── src/
│   │   ├── components/                      # React Components
│   │   │   ├── common/                      # Shared components (buttons, modals, etc.)
│   │   │   ├── rules/                       # Rule management components
│   │   │   ├── dataDictionary/              # Data dictionary management
│   │   │   ├── features/                    # Feature management
│   │   │   ├── models/                      # ML model management
│   │   │   ├── makerChecker/                # Approval workflow components
│   │   │   ├── efficacy/                    # Monitoring dashboards
│   │   │   ├── admin/                       # Admin panels
│   │   │   └── auth/                        # Authentication components
│   │   │
│   │   ├── pages/                           # Page-level components
│   │   │   ├── Dashboard.tsx                # Main dashboard
│   │   │   ├── Login.tsx                    # Login page
│   │   │   ├── rules/
│   │   │   │   ├── RulesetList.tsx          # List all rulesets
│   │   │   │   ├── RulesetDetail.tsx        # Ruleset details & rules
│   │   │   │   └── RuleEditor.tsx           # Create/edit rules
│   │   │   ├── dataDictionary/
│   │   │   │   └── DataDictionaryList.tsx   # Manage data fields
│   │   │   ├── features/
│   │   │   │   └── FeatureList.tsx          # Manage features
│   │   │   ├── models/
│   │   │   │   └── ModelList.tsx            # Manage ML models
│   │   │   ├── makerChecker/
│   │   │   │   └── ChangeRequestList.tsx    # Approval queue
│   │   │   ├── efficacy/
│   │   │   │   └── EfficacyDashboard.tsx    # Performance metrics
│   │   │   └── admin/
│   │   │       ├── UserManagement.tsx       # User administration
│   │   │       └── AuditLogs.tsx            # Audit trail viewer
│   │   │
│   │   ├── services/                        # API service layer
│   │   │   ├── api.ts                       # Base API configuration
│   │   │   ├── ruleService.ts               # Rule API calls
│   │   │   ├── authService.ts               # Authentication
│   │   │   └── ...                          # Other services
│   │   │
│   │   ├── store/                           # Redux state management
│   │   │   ├── index.ts                     # Store configuration
│   │   │   ├── slices/                      # Redux slices
│   │   │   │   ├── authSlice.ts
│   │   │   │   ├── ruleSlice.ts
│   │   │   │   └── ...
│   │   │   └── hooks.ts                     # Typed Redux hooks
│   │   │
│   │   ├── types/                           # TypeScript type definitions
│   │   │   └── index.ts                     # All interface definitions
│   │   │
│   │   ├── utils/                           # Utility functions
│   │   │   ├── validation.ts
│   │   │   ├── formatting.ts
│   │   │   └── helpers.ts
│   │   │
│   │   ├── hooks/                           # Custom React hooks
│   │   │   ├── useAuth.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── usePagination.ts
│   │   │
│   │   ├── layouts/                         # Layout components
│   │   │   ├── MainLayout.tsx               # Main app layout with sidebar
│   │   │   └── AuthLayout.tsx               # Authentication layout
│   │   │
│   │   ├── constants/                       # Constants and configurations
│   │   │   └── index.ts                     # API endpoints, enums, etc.
│   │   │
│   │   ├── App.tsx                          # Main app component
│   │   └── main.tsx                         # Entry point
│   │
│   ├── public/                              # Static assets
│   │   ├── index.html
│   │   └── favicon.ico
│   │
│   ├── tests/                               # Test files
│   │   ├── unit/
│   │   └── integration/
│   │
│   ├── package.json                         # Dependencies
│   ├── tsconfig.json                        # TypeScript config
│   ├── vite.config.ts                       # Vite build config
│   ├── .eslintrc.js                         # ESLint config
│   ├── Dockerfile                           # Docker build
│   └── nginx.conf                           # Nginx configuration
│
├── backend/                                 # Spring Boot Microservices
│   │
│   ├── rule-service/                        # Rule management service (Port 8081)
│   │   ├── src/main/java/com/bank/frauddetection/ruleservice/
│   │   │   ├── RuleServiceApplication.java  # Main application
│   │   │   ├── controller/                  # REST controllers
│   │   │   │   ├── RulesetController.java
│   │   │   │   └── RuleController.java
│   │   │   ├── service/                     # Business logic
│   │   │   │   ├── RulesetService.java
│   │   │   │   └── RuleService.java
│   │   │   ├── repository/                  # JPA repositories
│   │   │   │   ├── RulesetRepository.java
│   │   │   │   └── RuleRepository.java
│   │   │   ├── model/                       # Entity models
│   │   │   │   ├── Ruleset.java
│   │   │   │   ├── Rule.java
│   │   │   │   ├── Domain.java              # Enum
│   │   │   │   ├── Environment.java         # Enum
│   │   │   │   └── RuleStatus.java          # Enum
│   │   │   ├── dto/                         # Data transfer objects
│   │   │   │   ├── RulesetRequest.java
│   │   │   │   ├── RulesetResponse.java
│   │   │   │   └── RuleResponse.java
│   │   │   ├── config/                      # Configuration classes
│   │   │   │   ├── SecurityConfig.java
│   │   │   │   ├── JpaConfig.java
│   │   │   │   └── SwaggerConfig.java
│   │   │   └── exception/                   # Exception handling
│   │   │       ├── GlobalExceptionHandler.java
│   │   │       └── CustomExceptions.java
│   │   │
│   │   ├── src/main/resources/
│   │   │   ├── application.yml              # Application config
│   │   │   └── db/migration/                # Flyway migrations
│   │   │
│   │   ├── src/test/                        # Test files
│   │   ├── pom.xml                          # Maven dependencies
│   │   └── Dockerfile                       # Docker build
│   │
│   ├── data-dictionary-service/             # Data dictionary service (Port 8082)
│   │   └── [Similar structure to rule-service]
│   │
│   ├── feature-service/                     # Feature management service (Port 8083)
│   │   └── [Similar structure to rule-service]
│   │
│   ├── model-service/                       # Model management service (Port 8084)
│   │   └── [Similar structure to rule-service]
│   │
│   ├── maker-checker-service/               # Approval workflow service (Port 8085)
│   │   └── [Similar structure to rule-service]
│   │
│   ├── efficacy-service/                    # Monitoring service (Port 8086)
│   │   └── [Similar structure to rule-service]
│   │
│   ├── admin-service/                       # Admin & audit service (Port 8087)
│   │   └── [Similar structure to rule-service]
│   │
│   └── common/                              # Shared libraries
│       ├── security/                        # Security utilities
│       ├── exceptions/                      # Common exceptions
│       └── utils/                           # Helper utilities
│
├── database/                                # Database scripts
│   ├── schemas/                             # Schema definitions
│   │   └── 01_initial_schema.sql            # Complete database schema
│   ├── migrations/                          # Flyway migrations
│   │   ├── V1__create_users.sql
│   │   ├── V2__create_rulesets.sql
│   │   └── ...
│   └── seeds/                               # Seed/demo data
│       └── 01_demo_data.sql                 # Demo data for testing
│
├── deployment/                              # Deployment configurations
│   ├── docker/                              # Docker setup
│   │   ├── docker-compose.yml               # Complete stack
│   │   └── nginx.conf                       # API gateway config
│   ├── kubernetes/                          # Kubernetes manifests
│   │   ├── deployments/
│   │   ├── services/
│   │   └── ingress/
│   └── terraform/                           # Infrastructure as code
│       ├── main.tf                          # AWS infrastructure
│       ├── variables.tf
│       └── outputs.tf
│
├── docs/                                    # Documentation
│   ├── API_DOCUMENTATION.md                 # Complete API reference
│   ├── architecture/                        # Architecture diagrams
│   │   ├── system-architecture.png
│   │   └── data-flow.png
│   └── user-guide/                          # User guides
│       ├── maker-guide.md
│       └── checker-guide.md
│
├── README.md                                # Main documentation
├── COMPREHENSIVE_SUMMARY.md                 # This file
└── .gitignore                               # Git ignore rules
```

---

## Frontend Components

### Key React Components with Purposes and Accessibility

#### 1. **MainLayout** (`layouts/MainLayout.tsx`)
- **Purpose**: Main application layout with navigation sidebar and header
- **Key Props**: None (uses React Router Outlet)
- **Accessibility Features**:
  - ARIA labels on navigation items
  - Keyboard navigation support
  - Screen reader announcements for route changes
  - Skip to main content link
  - Focus management
  - Responsive mobile drawer with proper focus trapping

#### 2. **Dashboard** (`pages/Dashboard.tsx`)
- **Purpose**: Overview dashboard with key metrics and charts
- **Key Props**: None
- **Features**:
  - Real-time fraud statistics
  - Trend charts (Recharts with accessible labels)
  - Recent alerts feed
  - System health indicators
- **Accessibility**:
  - Chart descriptions for screen readers
  - Data tables with proper headers
  - Color-blind friendly color schemes
  - Keyboard accessible charts

#### 3. **RulesetList** (`pages/rules/RulesetList.tsx`)
- **Purpose**: List and manage fraud detection rulesets
- **Key Props**: None (fetches data internally)
- **Features**:
  - Searchable data grid
  - Filter by domain and status
  - Bulk actions
  - Pagination
- **Accessibility**:
  - Data grid with ARIA labels
  - Accessible search input
  - Keyboard navigation in table
  - Row selection with keyboard

#### 4. **RulesetDetail** (`pages/rules/RulesetDetail.tsx`)
- **Purpose**: View ruleset details and its rules
- **Key Props**: `id` (from URL params)
- **Features**:
  - Ruleset metadata display
  - Rules list with DataGrid
  - Version history
  - Deployment history
  - Performance metrics
- **Accessibility**:
  - Tabbed interface with ARIA tabs
  - Accessible data tables
  - Clear focus indicators

#### 5. **RuleEditor** (`pages/rules/RuleEditor.tsx`)
- **Purpose**: Create and edit fraud detection rules
- **Key Props**: `rulesetId`, `ruleId` (from URL params)
- **Features**:
  - Dynamic condition builder
  - Multiple condition support (AND/OR)
  - Action configuration
  - Real-time rule preview
  - Formik validation
- **Accessibility**:
  - Form labels associated with inputs
  - Error announcements
  - Required field indicators
  - Keyboard accessible form controls
  - Clear validation messages

#### 6. **DataDictionaryList** (`pages/dataDictionary/DataDictionaryList.tsx`)
- **Purpose**: Manage data field definitions
- **Key Props**: None
- **Features**:
  - Field CRUD operations
  - Data type management
  - Validation rule definition
  - Domain filtering
- **Accessibility**:
  - Accessible modal dialogs
  - Form validation
  - Screen reader friendly tables

#### 7. **ChangeRequestList** (`pages/makerChecker/ChangeRequestList.tsx`)
- **Purpose**: Approval queue for makers and checkers
- **Key Props**: None
- **Features**:
  - Pending approvals list
  - Approve/reject actions
  - Change diff viewer
  - Comments system
- **Accessibility**:
  - Status announcements
  - Accessible action buttons
  - Clear visual indicators

#### 8. **EfficacyDashboard** (`pages/efficacy/EfficacyDashboard.tsx`)
- **Purpose**: Monitor ruleset performance
- **Key Props**: None
- **Features**:
  - Performance metrics
  - Confusion matrix
  - Time-series charts
  - Rule-level analytics
- **Accessibility**:
  - Chart descriptions
  - Data table alternatives
  - Keyboard accessible filters

#### 9. **UserManagement** (`pages/admin/UserManagement.tsx`)
- **Purpose**: Administer user accounts
- **Key Props**: None (Admin role required)
- **Features**:
  - User CRUD operations
  - Role assignment
  - Account activation/deactivation
- **Accessibility**:
  - Accessible forms
  - Role indicators
  - Status announcements

#### 10. **AuditLogs** (`pages/admin/AuditLogs.tsx`)
- **Purpose**: View system audit trail
- **Key Props**: None (Admin role required)
- **Features**:
  - Comprehensive audit log viewer
  - Advanced filtering
  - Export capabilities
- **Accessibility**:
  - Searchable and filterable
  - Keyboard navigation
  - Screen reader support

### Accessibility Standards Compliance

All components follow WCAG 2.1 AA standards:

1. **Semantic HTML**: Proper heading hierarchy, landmarks
2. **ARIA Attributes**: Labels, roles, states, live regions
3. **Keyboard Navigation**: Tab order, focus management, shortcuts
4. **Color Contrast**: Minimum 4.5:1 for text
5. **Form Accessibility**: Labels, error messages, required indicators
6. **Focus Indicators**: Visible focus states
7. **Screen Reader Support**: Announcements, descriptions
8. **Responsive Design**: Mobile-friendly, touch targets ≥44px

---

## API Specifications

### REST API Endpoints with Authentication Requirements

#### Base URL: `/api/v1`

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| POST | `/auth/login` | User login | No | - |
| POST | `/auth/logout` | User logout | Yes | All |
| POST | `/auth/refresh` | Refresh token | Yes | All |
| GET | `/auth/me` | Get current user | Yes | All |

### Rule Management Endpoints

| Method | Endpoint | Description | Auth | Roles | Request Body | Response |
|--------|----------|-------------|------|-------|--------------|----------|
| GET | `/rulesets` | List all rulesets | Yes | All | - | Paginated list of rulesets |
| GET | `/rulesets/{id}` | Get ruleset by ID | Yes | All | - | Ruleset with rules |
| POST | `/rulesets` | Create ruleset | Yes | ADMIN, MAKER | RulesetCreateRequest | Created ruleset |
| PUT | `/rulesets/{id}` | Update ruleset | Yes | ADMIN, MAKER | RulesetUpdateRequest | Updated ruleset |
| DELETE | `/rulesets/{id}` | Delete ruleset | Yes | ADMIN | - | 204 No Content |
| POST | `/rulesets/{id}/deploy` | Deploy ruleset | Yes | ADMIN, CHECKER | {environment} | Deployment status |
| GET | `/rulesets/{id}/versions` | Version history | Yes | All | - | List of versions |
| GET | `/rules` | List all rules | Yes | All | - | Paginated list of rules |
| GET | `/rules/{id}` | Get rule by ID | Yes | All | - | Rule details |
| POST | `/rules` | Create rule | Yes | ADMIN, MAKER | RuleCreateRequest | Created rule |
| PUT | `/rules/{id}` | Update rule | Yes | ADMIN, MAKER | RuleUpdateRequest | Updated rule |
| DELETE | `/rules/{id}` | Delete rule | Yes | ADMIN | - | 204 No Content |

### Data Dictionary Endpoints

| Method | Endpoint | Description | Auth | Roles | Request Body | Response |
|--------|----------|-------------|------|-------|--------------|----------|
| GET | `/data-dictionary` | List data fields | Yes | All | - | Paginated list |
| GET | `/data-dictionary/{id}` | Get field by ID | Yes | All | - | Field details |
| POST | `/data-dictionary` | Create field | Yes | ADMIN, MAKER | DataFieldRequest | Created field |
| PUT | `/data-dictionary/{id}` | Update field | Yes | ADMIN, MAKER | DataFieldRequest | Updated field |
| DELETE | `/data-dictionary/{id}` | Delete field | Yes | ADMIN | - | 204 No Content |
| GET | `/data-dictionary/domain/{domain}` | Fields by domain | Yes | All | - | List of fields |

### Feature Management Endpoints

| Method | Endpoint | Description | Auth | Roles |
|--------|----------|-------------|------|-------|
| GET | `/features` | List features | Yes | All |
| POST | `/features` | Create feature | Yes | ADMIN, MAKER |
| PUT | `/features/{id}` | Update feature | Yes | ADMIN, MAKER |
| DELETE | `/features/{id}` | Delete feature | Yes | ADMIN |

### Model Management Endpoints

| Method | Endpoint | Description | Auth | Roles |
|--------|----------|-------------|------|-------|
| GET | `/models` | List models | Yes | All |
| POST | `/models` | Upload model | Yes | ADMIN, MAKER |
| PUT | `/models/{id}` | Update model | Yes | ADMIN, MAKER |
| POST | `/models/{id}/deploy` | Deploy model | Yes | ADMIN, CHECKER |
| DELETE | `/models/{id}` | Delete model | Yes | ADMIN |

### Maker-Checker Endpoints

| Method | Endpoint | Description | Auth | Roles |
|--------|----------|-------------|------|-------|
| GET | `/change-requests` | List change requests | Yes | All |
| GET | `/change-requests/pending` | Pending requests | Yes | CHECKER, ADMIN |
| POST | `/change-requests` | Create request | Yes | MAKER |
| POST | `/change-requests/{id}/approve` | Approve request | Yes | CHECKER, ADMIN |
| POST | `/change-requests/{id}/reject` | Reject request | Yes | CHECKER, ADMIN |

### Efficacy Monitoring Endpoints

| Method | Endpoint | Description | Auth | Roles |
|--------|----------|-------------|------|-------|
| GET | `/efficacy/dashboard` | Overview metrics | Yes | All |
| GET | `/efficacy/ruleset/{id}` | Ruleset metrics | Yes | All |
| GET | `/efficacy/rule/{id}` | Rule metrics | Yes | All |

### Admin Endpoints

| Method | Endpoint | Description | Auth | Roles |
|--------|----------|-------------|------|-------|
| GET | `/admin/users` | List users | Yes | ADMIN, SUPER_ADMIN |
| POST | `/admin/users` | Create user | Yes | ADMIN, SUPER_ADMIN |
| PUT | `/admin/users/{id}` | Update user | Yes | ADMIN, SUPER_ADMIN |
| DELETE | `/admin/users/{id}` | Delete user | Yes | SUPER_ADMIN |
| GET | `/admin/audit-logs` | View audit logs | Yes | ADMIN, SUPER_ADMIN |
| GET | `/admin/config` | System config | Yes | SUPER_ADMIN |
| PUT | `/admin/config` | Update config | Yes | SUPER_ADMIN |

### Common Request/Response Schemas

#### Request: RulesetCreateRequest
```json
{
  "name": "string (required, max 200)",
  "description": "string (max 1000)",
  "domain": "RETAIL | CREDIT | DEBIT (required)"
}
```

#### Response: RulesetResponse
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "domain": "RETAIL | CREDIT | DEBIT",
  "isActive": boolean,
  "version": number,
  "rules": [RuleResponse],
  "deployedEnvironments": ["DEV", "STAGING", "PROD"],
  "createdBy": "string",
  "createdAt": "ISO-8601 timestamp",
  "updatedAt": "ISO-8601 timestamp"
}
```

---

## Database Schema

### PostgreSQL Table Definitions with Relationships

#### Users Table
```sql
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
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

#### Rulesets Table
```sql
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
    updated_by VARCHAR(100),
    CONSTRAINT unique_ruleset_name UNIQUE(LOWER(name))
);
```

#### Rules Table
```sql
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
```

### Indexes

```sql
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_rulesets_domain ON rulesets(domain);
CREATE INDEX idx_rulesets_is_active ON rulesets(is_active);
CREATE INDEX idx_rules_ruleset ON rules(ruleset_id);
CREATE INDEX idx_rules_status ON rules(status);
CREATE INDEX idx_rules_priority ON rules(priority);
CREATE INDEX idx_rules_condition_gin ON rules USING gin(condition);
```

### Entity Relationships

```
users (1) ----< (many) audit_logs
users (1) ----< (many) rulesets (created_by)
users (1) ----< (many) change_requests

rulesets (1) ----< (many) rules
rulesets (1) ----< (many) ruleset_deployments
rulesets (1) ----< (many) efficacy_metrics

rules (1) ----< (many) rule_performance

models (1) ----< (many) model_deployments

change_requests (many) ----< (1) users (reviewed_by)

efficacy_metrics (1) ----< (many) rule_performance
```

### Enums

```sql
CREATE TYPE domain_type AS ENUM ('RETAIL', 'CREDIT', 'DEBIT');
CREATE TYPE environment_type AS ENUM ('DEV', 'STAGING', 'PROD');
CREATE TYPE rule_status_type AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED', 'ACTIVE', 'INACTIVE');
CREATE TYPE user_role_type AS ENUM ('ADMIN', 'MAKER', 'CHECKER', 'VIEWER', 'SUPER_ADMIN');
CREATE TYPE approval_status_type AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE change_type AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'DEPLOY');
CREATE TYPE data_type AS ENUM ('STRING', 'NUMBER', 'BOOLEAN', 'DATE', 'DECIMAL', 'ENUM');
```

---

## Configuration Files

### Frontend Configuration

#### package.json
```json
{
  "name": "fraud-detection-portal-frontend",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@mui/material": "^5.15.0",
    "@reduxjs/toolkit": "^2.0.1",
    "axios": "^1.6.2",
    "formik": "^2.4.5",
    "yup": "^1.3.3",
    "recharts": "^2.10.3"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "test": "vitest"
  }
}
```

#### vite.config.ts
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
});
```

### Backend Configuration

#### application.yml (Rule Service)
```yaml
server:
  port: 8081
  servlet:
    context-path: /api/v1

spring:
  application:
    name: rule-service
  datasource:
    url: jdbc:postgresql://localhost:5432/fraud_detection_db
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

security:
  jwt:
    secret: your-256-bit-secret
    expiration: 86400000

management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics
```

#### pom.xml (Maven Dependencies)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
    <dependency>
        <groupId>io.jsonwebtoken</groupId>
        <artifactId>jjwt-api</artifactId>
    </dependency>
</dependencies>
```

### Docker Configuration

#### docker-compose.yml
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: fraud_detection_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"

  rule-service:
    build: ./backend/rule-service
    ports:
      - "8081:8081"
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - rule-service
```

---

## Demo Data

### Sample Data Structures

#### Demo Users
```
1. Admin User
   - Username: admin
   - Email: admin@bank.com
   - Role: SUPER_ADMIN
   - Password: admin123 (hashed)

2. Maker User
   - Username: jane.smith
   - Email: jane.smith@bank.com
   - Role: MAKER
   - Password: password123 (hashed)

3. Checker User
   - Username: bob.wilson
   - Email: bob.wilson@bank.com
   - Role: CHECKER
   - Password: password123 (hashed)
```

#### Demo Rulesets
```
1. High Risk Transaction Rules (RETAIL)
   - 3 active rules
   - Deployed to: DEV, STAGING, PROD
   - Version: 3

2. Credit Card Fraud Detection (CREDIT)
   - 5 active rules
   - Deployed to: DEV, STAGING
   - Version: 5

3. Debit Card Security Rules (DEBIT)
   - 2 inactive rules
   - Deployed to: DEV
   - Version: 2
```

#### Demo Rules
```
1. Large Amount Transaction
   - Condition: transaction_amount > 10000
   - Action: BLOCK
   - Priority: 1

2. Rapid Transaction Velocity
   - Condition: transaction_count > 5 AND time_window < 10
   - Action: REVIEW
   - Priority: 2

3. New Account High Amount
   - Condition: account_age_days < 30 AND transaction_amount > 5000
   - Action: REVIEW with score 75
   - Priority: 3
```

#### Demo Data Fields
```
1. transaction_amount (DECIMAL)
2. customer_id (STRING)
3. transaction_count (NUMBER)
4. account_age_days (NUMBER)
5. transaction_location (STRING)
6. card_number (STRING)
7. credit_limit (DECIMAL)
```

#### Demo Features
```
1. transaction_velocity
   - Calculation: COUNT(transactions) in last 10 minutes
   - Dependencies: customer_id, transaction_timestamp

2. amount_deviation
   - Calculation: Deviation from average
   - Dependencies: transaction_amount, customer_id

3. location_risk_score
   - Calculation: Lookup risk table
   - Dependencies: transaction_location
```

---

## Deployment Notes

### AWS Deployment Architecture

#### Infrastructure Components

1. **Networking**
   - VPC with public and private subnets across 3 AZs
   - Internet Gateway for public subnets
   - NAT Gateway for private subnets
   - Security Groups for each service

2. **Compute**
   - ECS Fargate for container orchestration
   - Application Load Balancer (ALB) for traffic distribution
   - Auto Scaling for backend services
   - CloudFront CDN for frontend assets

3. **Database**
   - RDS PostgreSQL 14 (Multi-AZ deployment)
   - Read replicas for reporting queries
   - Automated backups (7-day retention)
   - Encryption at rest and in transit

4. **Caching & Session**
   - ElastiCache Redis for session storage
   - CloudFront for CDN caching

5. **Security**
   - WAF (Web Application Firewall)
   - AWS Secrets Manager for credentials
   - KMS for encryption keys
   - IAM roles for service authentication

6. **Monitoring & Logging**
   - CloudWatch for logs and metrics
   - X-Ray for distributed tracing
   - SNS for alerting
   - CloudTrail for audit logs

#### Deployment Process

**1. Infrastructure Provisioning (Terraform)**
```bash
cd deployment/terraform
terraform init
terraform plan
terraform apply
```

**2. Database Setup**
```bash
# Run migrations
flyway migrate

# Load initial data (optional)
psql -h <rds-endpoint> -U postgres -d fraud_detection_db -f database/seeds/01_demo_data.sql
```

**3. Build & Push Docker Images**
```bash
# Authenticate with ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Build and push each service
docker build -t fraud-detection/rule-service ./backend/rule-service
docker tag fraud-detection/rule-service:latest <ecr-url>/rule-service:latest
docker push <ecr-url>/rule-service:latest
```

**4. Deploy to ECS**
```bash
# Update ECS service
aws ecs update-service --cluster fraud-detection-cluster --service rule-service --force-new-deployment
```

#### Environment Variables

**Required Environment Variables:**
```
# Database
DB_HOST=<rds-endpoint>
DB_NAME=fraud_detection_db
DB_USERNAME=postgres
DB_PASSWORD=<from-secrets-manager>

# Security
JWT_SECRET=<from-secrets-manager>
ENCRYPTION_KEY=<from-kms>

# Application
ALLOWED_ORIGINS=https://fraud-detection.bank.com
ENVIRONMENT=prod

# AWS
AWS_REGION=us-east-1
S3_BUCKET=fraud-detection-assets
```

#### Scaling Configuration

**Auto Scaling Policies:**
- Scale up: CPU > 70% for 5 minutes
- Scale down: CPU < 30% for 10 minutes
- Min instances: 2
- Max instances: 10

**Database Connection Pool:**
- Min connections: 5
- Max connections: 20
- Connection timeout: 30s

#### Disaster Recovery

**Backup Strategy:**
- Database: Automated daily backups, 7-day retention
- Application configs: Stored in S3 with versioning
- Secrets: AWS Secrets Manager with rotation

**RTO (Recovery Time Objective):** 4 hours
**RPO (Recovery Point Objective):** 1 hour

#### Monitoring & Alerts

**Key Metrics to Monitor:**
- API response time (p95, p99)
- Error rate
- Database connections
- CPU/Memory utilization
- Rule execution time
- False positive rate

**Alert Thresholds:**
- API error rate > 5%
- API response time > 1000ms
- Database CPU > 80%
- Failed deployments

#### Cost Optimization

**Estimated Monthly Costs (Production):**
- ECS Fargate: $500-800
- RDS PostgreSQL: $300-500
- Load Balancer: $50-75
- CloudFront: $25-50
- Data Transfer: $50-100
- **Total: ~$1,000-1,500/month**

**Cost Saving Strategies:**
- Use spot instances for non-critical services
- Enable auto-scaling to reduce idle resources
- Use S3 lifecycle policies for logs
- Reserved instances for predictable workloads

#### Security Considerations

**Authentication & Authorization:**
- JWT tokens with 24-hour expiration
- Refresh token rotation
- Role-based access control (RBAC)
- Failed login attempt tracking

**Network Security:**
- Private subnets for backend services
- Security groups limiting traffic
- WAF rules for common attacks
- DDoS protection via AWS Shield

**Data Security:**
- Encryption at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PII data masking in logs
- Regular security audits

**Compliance:**
- SOC 2 Type II
- PCI DSS Level 1
- GDPR compliance
- Regular penetration testing

---

## Quick Start Guide

### Local Development

```bash
# 1. Start database
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:14

# 2. Run migrations
psql -U postgres -f database/schemas/01_initial_schema.sql

# 3. Load demo data
psql -U postgres -f database/seeds/01_demo_data.sql

# 4. Start backend services
cd backend/rule-service
mvn spring-boot:run

# 5. Start frontend
cd frontend
npm install
npm run dev

# Access the application at http://localhost:3000
```

### Docker Deployment

```bash
cd deployment/docker
docker-compose up -d
```

---

## Support & Maintenance

**For Technical Support:**
- Email: fraud-detection-support@bank.com
- Slack: #fraud-detection-portal
- On-call: +1-xxx-xxx-xxxx

**Documentation:**
- User Guide: /docs/user-guide/
- API Docs: /docs/API_DOCUMENTATION.md
- Architecture: /docs/architecture/

**Code Repository:**
- GitHub: github.com/bank/fraud-detection-portal
- Branch Strategy: GitFlow (main, develop, feature/*, release/*)

---

*Last Updated: January 2025*
*Version: 1.0.0*
