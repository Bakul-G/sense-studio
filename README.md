# Fraud Detection Portal

A comprehensive enterprise banking fraud detection system designed for managing fraud detection rules, features, models, and monitoring their efficacy across retail, credit, and debit card domains.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Fraud Detection Portal is a full-stack enterprise application that enables fraud analysts and risk managers to:

- **Create and manage fraud detection rules** across multiple banking domains
- **Define and maintain data dictionaries** for available fields
- **Engineer features** that can be used in rule creation
- **Manage ML models** for fraud detection
- **Implement maker-checker workflows** for compliance
- **Deploy rules** across different environments (Dev, Staging, Production)
- **Monitor efficacy** of rulesets and individual rules
- **Administer users** and maintain audit trails

## Features

### Core Capabilities

1. **Rule Management**
   - Create, edit, and delete fraud detection rules
   - Organize rules into rulesets by domain (Retail/Credit/Debit)
   - Define complex conditions using logical operators
   - Configure actions (Block, Allow, Review, Score, Flag)
   - Priority-based rule execution

2. **Data Dictionary**
   - Define data fields and their properties
   - Support for multiple data types (String, Number, Date, etc.)
   - Validation rules and enum values
   - Domain-specific field organization

3. **Feature Management**
   - Create engineered features for rule building
   - Define calculation logic and dependencies
   - Version control for features

4. **Model Management**
   - Upload and manage ML models
   - Track model performance metrics (accuracy, precision, recall, F1)
   - Deploy models across environments

5. **Maker-Checker Workflow**
   - Four-eyes principle for critical changes
   - Approval workflow for rule modifications
   - Change request tracking and audit

6. **Environment Management**
   - Deploy rulesets to Dev, Staging, and Production
   - Version control for deployments
   - Rollback capabilities

7. **Efficacy Monitoring**
   - Real-time performance dashboards
   - Rule-level and ruleset-level metrics
   - False positive/negative tracking
   - Historical trend analysis

8. **Administration**
   - User management with RBAC
   - Role-based permissions (Admin, Maker, Checker, Viewer)
   - Comprehensive audit logging
   - System configuration

### Accessibility

- WCAG 2.1 AA compliant
- Screen reader support
- Keyboard navigation
- High contrast mode support
- Focus indicators

## Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  - React 18 + TypeScript                                     │
│  - Material-UI components                                    │
│  - Redux Toolkit for state management                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTPS/REST
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                   API Gateway (Nginx)                        │
│  - Rate limiting                                             │
│  - Load balancing                                            │
│  - SSL termination                                           │
└───────┬──────────────┬──────────────┬──────────────┬────────┘
        │              │              │              │
        ▼              ▼              ▼              ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│ Rule Service │ │ Data Dict│ │ Feature  │ │ Model Service│
│              │ │ Service  │ │ Service  │ │              │
└──────┬───────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘
       │              │            │              │
       └──────────────┴────────────┴──────────────┘
                      │
                      ▼
            ┌─────────────────┐
            │   PostgreSQL    │
            │   Database      │
            └─────────────────┘
```

### Microservices

1. **Rule Service** (Port 8081)
   - Rule and ruleset management
   - Rule execution logic
   - Deployment management

2. **Data Dictionary Service** (Port 8082)
   - Field definitions
   - Validation rules
   - Data type management

3. **Feature Service** (Port 8083)
   - Feature engineering
   - Feature calculation
   - Dependency management

4. **Model Service** (Port 8084)
   - ML model management
   - Model versioning
   - Performance tracking

5. **Maker-Checker Service** (Port 8085)
   - Approval workflows
   - Change request management

6. **Efficacy Service** (Port 8086)
   - Performance metrics
   - Analytics and reporting

7. **Admin Service** (Port 8087)
   - User management
   - Audit logging
   - System configuration

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI) v5
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query
- **Forms**: Formik + Yup
- **Charts**: Recharts
- **Build Tool**: Vite
- **Testing**: Vitest + React Testing Library

### Backend
- **Framework**: Spring Boot 3.2
- **Language**: Java 17
- **Architecture**: Microservices
- **API**: RESTful
- **Security**: Spring Security + JWT
- **Database Access**: Spring Data JPA
- **Validation**: Jakarta Validation
- **Documentation**: OpenAPI/Swagger

### Database
- **RDBMS**: PostgreSQL 14+
- **Migrations**: Flyway
- **Connection Pooling**: HikariCP

### DevOps & Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose / Kubernetes
- **Cloud Platform**: AWS
- **API Gateway**: Nginx
- **Caching**: Redis
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

## Prerequisites

- **Node.js**: 18.x or higher
- **Java**: 17 or higher
- **Maven**: 3.8 or higher
- **PostgreSQL**: 14 or higher
- **Docker**: 20.x or higher (for containerized deployment)
- **Git**: 2.x or higher

## Getting Started

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-org/fraud-detection-portal.git
cd fraud-detection-portal
```

#### 2. Database Setup

```bash
# Start PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE fraud_detection_db;

# Run schema
psql -U postgres -d fraud_detection_db -f database/schemas/01_initial_schema.sql

# Load demo data
psql -U postgres -d fraud_detection_db -f database/seeds/01_demo_data.sql
```

#### 3. Backend Setup

```bash
cd backend/rule-service

# Build the project
mvn clean install

# Run the service
mvn spring-boot:run

# Or run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

Repeat for other microservices (data-dictionary-service, feature-service, etc.)

#### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

### Docker Deployment

```bash
# Navigate to deployment directory
cd deployment/docker

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:3000
- API Gateway: http://localhost:8080
- PostgreSQL: localhost:5432

### Default Credentials (Demo)

**Super Admin:**
- Username: `admin`
- Password: `admin123` (Change in production!)

**Maker:**
- Username: `jane.smith`
- Password: `password123`

**Checker:**
- Username: `bob.wilson`
- Password: `password123`

## Project Structure

```
fraud-detection-portal/
├── frontend/                      # React frontend application
│   ├── src/
│   │   ├── components/           # React components
│   │   │   ├── common/          # Shared components
│   │   │   ├── rules/           # Rule management components
│   │   │   ├── dataDictionary/  # Data dictionary components
│   │   │   ├── features/        # Feature components
│   │   │   ├── models/          # Model components
│   │   │   ├── makerChecker/    # Approval workflow components
│   │   │   ├── efficacy/        # Monitoring components
│   │   │   └── admin/           # Admin components
│   │   ├── pages/               # Page components
│   │   ├── services/            # API service layer
│   │   ├── store/               # Redux store
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Utility functions
│   │   ├── hooks/               # Custom React hooks
│   │   ├── layouts/             # Layout components
│   │   ├── constants/           # Constants and enums
│   │   └── App.tsx              # Main app component
│   ├── public/                  # Static assets
│   ├── tests/                   # Test files
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── Dockerfile
│
├── backend/                      # Spring Boot microservices
│   ├── rule-service/
│   │   └── src/main/java/com/bank/frauddetection/ruleservice/
│   │       ├── controller/      # REST controllers
│   │       ├── service/         # Business logic
│   │       ├── repository/      # Data access
│   │       ├── model/           # JPA entities
│   │       ├── dto/             # Data transfer objects
│   │       ├── config/          # Configuration
│   │       └── exception/       # Exception handling
│   ├── data-dictionary-service/
│   ├── feature-service/
│   ├── model-service/
│   ├── maker-checker-service/
│   ├── efficacy-service/
│   ├── admin-service/
│   └── common/                  # Shared libraries
│
├── database/                     # Database scripts
│   ├── schemas/                 # Schema definitions
│   ├── migrations/              # Migration scripts
│   └── seeds/                   # Seed data
│
├── deployment/                   # Deployment configurations
│   ├── docker/                  # Docker configurations
│   │   ├── docker-compose.yml
│   │   └── nginx.conf
│   ├── kubernetes/              # Kubernetes manifests
│   └── terraform/               # Infrastructure as code
│
├── docs/                        # Documentation
│   ├── api/                     # API documentation
│   ├── architecture/            # Architecture diagrams
│   └── user-guide/              # User guides
│
└── README.md                    # This file
```

## API Documentation

API documentation is available via Swagger UI when running the services:

- Rule Service: http://localhost:8081/swagger-ui.html
- Data Dictionary: http://localhost:8082/swagger-ui.html
- Feature Service: http://localhost:8083/swagger-ui.html

### Sample API Endpoints

#### Rule Management

```
GET    /api/v1/rulesets              # List all rulesets
GET    /api/v1/rulesets/{id}         # Get ruleset by ID
POST   /api/v1/rulesets              # Create new ruleset
PUT    /api/v1/rulesets/{id}         # Update ruleset
DELETE /api/v1/rulesets/{id}         # Delete ruleset
POST   /api/v1/rulesets/{id}/deploy  # Deploy ruleset

GET    /api/v1/rules                 # List all rules
POST   /api/v1/rules                 # Create new rule
PUT    /api/v1/rules/{id}            # Update rule
DELETE /api/v1/rules/{id}            # Delete rule
```

#### Data Dictionary

```
GET    /api/v1/data-dictionary       # List all fields
POST   /api/v1/data-dictionary       # Create field
PUT    /api/v1/data-dictionary/{id}  # Update field
DELETE /api/v1/data-dictionary/{id}  # Delete field
```

See [API Documentation](./docs/api/README.md) for complete reference.

## Security

### Authentication & Authorization

- **JWT-based authentication** with refresh tokens
- **Role-based access control** (RBAC)
- **Session management** with timeout
- **Account lockout** after failed login attempts

### Security Features

- Password hashing with bcrypt
- HTTPS/TLS encryption
- CORS configuration
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting
- Input validation

### Compliance

- Comprehensive audit logging
- Data encryption at rest and in transit
- PII data masking
- Regulatory compliance (SOC 2, PCI DSS)

## Deployment

### AWS Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Route 53 (DNS)                        │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              CloudFront (CDN) + WAF                      │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│        Application Load Balancer (ALB)                  │
└───────┬──────────────────────────────────────┬──────────┘
        │                                      │
        ▼                                      ▼
┌──────────────────┐                  ┌──────────────────┐
│ ECS/Fargate      │                  │ ECS/Fargate      │
│ (Frontend)       │                  │ (Backend)        │
└──────────────────┘                  └─────────┬────────┘
                                               │
                                               ▼
                                      ┌──────────────────┐
                                      │ RDS PostgreSQL   │
                                      │ (Multi-AZ)       │
                                      └──────────────────┘
```

### Deployment Steps

1. **Infrastructure Setup** (Terraform)
2. **Database Migration** (Flyway)
3. **Build Docker Images**
4. **Push to ECR**
5. **Deploy to ECS/EKS**
6. **Configure Load Balancer**
7. **Set up monitoring**

See [Deployment Guide](./docs/deployment/README.md) for detailed instructions.

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is proprietary software owned by [Your Bank Name]. All rights reserved.

---

**For support or questions, contact:** fraud-detection-support@bank.com
