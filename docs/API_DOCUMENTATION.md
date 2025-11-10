# API Documentation

## Overview

The Fraud Detection Portal exposes RESTful APIs for managing fraud detection rules, data dictionaries, features, models, and monitoring capabilities.

**Base URL:** `http://localhost:8080/api/v1`

**Authentication:** All endpoints require JWT authentication via `Authorization: Bearer <token>` header.

---

## Authentication

### Login

**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT token

**Request:**
```json
{
  "username": "john.doe",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "expiresIn": 86400,
    "user": {
      "id": "uuid",
      "username": "john.doe",
      "email": "john.doe@bank.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "ADMIN"
    }
  }
}
```

### Logout

**Endpoint:** `POST /auth/logout`

**Description:** Invalidate current session

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## Rule Management

### Get All Rulesets

**Endpoint:** `GET /rulesets`

**Description:** Retrieve all rulesets with pagination

**Query Parameters:**
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 10)
- `domain` (optional): Filter by domain (RETAIL, CREDIT, DEBIT)
- `isActive` (optional): Filter by active status (true/false)
- `search` (optional): Search in name and description

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "High Risk Transaction Rules",
        "description": "Rules to detect high-risk transactions",
        "domain": "RETAIL",
        "isActive": true,
        "version": 3,
        "rules": [],
        "deployedEnvironments": ["DEV", "STAGING", "PROD"],
        "createdBy": "john.doe",
        "createdAt": "2024-01-15T10:00:00Z",
        "updatedAt": "2024-01-20T14:30:00Z"
      }
    ],
    "totalItems": 50,
    "totalPages": 5,
    "currentPage": 0,
    "pageSize": 10
  }
}
```

### Get Ruleset by ID

**Endpoint:** `GET /rulesets/{id}`

**Description:** Retrieve a specific ruleset with all its rules

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "High Risk Transaction Rules",
    "description": "Rules to detect high-risk transactions",
    "domain": "RETAIL",
    "isActive": true,
    "version": 3,
    "rules": [
      {
        "id": "rule-uuid",
        "name": "Large Amount Transaction",
        "description": "Block transactions above $10,000",
        "condition": {
          "expression": "transaction_amount > 10000",
          "operator": "AND",
          "fields": ["transaction_amount"],
          "conditions": [
            {
              "field": "transaction_amount",
              "operator": "GREATER_THAN",
              "value": 10000,
              "dataType": "DECIMAL"
            }
          ]
        },
        "action": {
          "type": "BLOCK",
          "reason": "Transaction amount exceeds limit",
          "notifications": ["risk@bank.com"]
        },
        "priority": 1,
        "status": "ACTIVE",
        "version": 1
      }
    ],
    "deployedEnvironments": ["DEV", "STAGING", "PROD"],
    "createdBy": "john.doe",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-20T14:30:00Z"
  }
}
```

### Create Ruleset

**Endpoint:** `POST /rulesets`

**Description:** Create a new ruleset

**Required Roles:** ADMIN, MAKER

**Request:**
```json
{
  "name": "Mobile Banking Rules",
  "description": "Rules specific to mobile app transactions",
  "domain": "RETAIL"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "name": "Mobile Banking Rules",
    "description": "Rules specific to mobile app transactions",
    "domain": "RETAIL",
    "isActive": false,
    "version": 1,
    "rules": [],
    "deployedEnvironments": [],
    "createdBy": "current-user",
    "createdAt": "2024-01-25T10:00:00Z",
    "updatedAt": "2024-01-25T10:00:00Z"
  }
}
```

### Update Ruleset

**Endpoint:** `PUT /rulesets/{id}`

**Description:** Update an existing ruleset

**Required Roles:** ADMIN, MAKER

**Request:**
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "isActive": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Updated ruleset object
  }
}
```

### Delete Ruleset

**Endpoint:** `DELETE /rulesets/{id}`

**Description:** Delete a ruleset

**Required Roles:** ADMIN

**Response:**
```json
{
  "success": true,
  "message": "Ruleset deleted successfully"
}
```

### Deploy Ruleset

**Endpoint:** `POST /rulesets/{id}/deploy`

**Description:** Deploy ruleset to an environment

**Required Roles:** ADMIN, CHECKER

**Query Parameters:**
- `environment` (required): Target environment (DEV, STAGING, PROD)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "deployedEnvironments": ["DEV", "STAGING", "PROD"],
    "deploymentHistory": [
      {
        "environment": "PROD",
        "deployedAt": "2024-01-25T10:00:00Z",
        "deployedBy": "bob.wilson",
        "version": 3
      }
    ]
  }
}
```

---

## Data Dictionary

### Get All Data Fields

**Endpoint:** `GET /data-dictionary`

**Description:** Retrieve all data field definitions

**Query Parameters:**
- `page`, `size`, `domain`, `search`

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "transaction_amount",
        "displayName": "Transaction Amount",
        "description": "The monetary value of the transaction",
        "dataType": "DECIMAL",
        "domain": "RETAIL",
        "source": "TRANSACTION_TABLE",
        "isNullable": false,
        "defaultValue": "0.00",
        "validationRules": [
          {
            "type": "RANGE",
            "value": "0-1000000",
            "errorMessage": "Amount must be between 0 and 1,000,000"
          }
        ],
        "createdAt": "2024-01-10T10:00:00Z",
        "updatedAt": "2024-01-20T14:30:00Z"
      }
    ],
    "totalItems": 25,
    "totalPages": 3,
    "currentPage": 0,
    "pageSize": 10
  }
}
```

### Create Data Field

**Endpoint:** `POST /data-dictionary`

**Description:** Create a new data field definition

**Required Roles:** ADMIN, MAKER

**Request:**
```json
{
  "name": "customer_risk_score",
  "displayName": "Customer Risk Score",
  "description": "Risk score calculated for the customer",
  "dataType": "NUMBER",
  "domain": "RETAIL",
  "source": "CALCULATED",
  "isNullable": true,
  "defaultValue": "0",
  "validationRules": [
    {
      "type": "RANGE",
      "value": "0-100",
      "errorMessage": "Risk score must be between 0 and 100"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    // Created data field object
  }
}
```

---

## Feature Management

### Get All Features

**Endpoint:** `GET /features`

**Description:** Retrieve all engineered features

**Query Parameters:**
- `page`, `size`, `domain`, `isActive`, `search`

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "transaction_velocity",
        "displayName": "Transaction Velocity",
        "description": "Number of transactions in last 10 minutes",
        "dataType": "NUMBER",
        "calculationLogic": "COUNT(transactions) WHERE timestamp > NOW() - INTERVAL '10 minutes'",
        "dependencies": ["customer_id", "transaction_timestamp"],
        "domain": "RETAIL",
        "isActive": true,
        "createdBy": "admin",
        "createdAt": "2024-01-10T10:00:00Z"
      }
    ],
    "totalItems": 15,
    "totalPages": 2,
    "currentPage": 0,
    "pageSize": 10
  }
}
```

### Create Feature

**Endpoint:** `POST /features`

**Description:** Create a new engineered feature

**Required Roles:** ADMIN, MAKER

**Request:**
```json
{
  "name": "avg_transaction_amount",
  "displayName": "Average Transaction Amount",
  "description": "Average transaction amount for customer in last 30 days",
  "dataType": "DECIMAL",
  "calculationLogic": "AVG(transaction_amount) WHERE customer_id = ? AND transaction_date >= NOW() - INTERVAL '30 days'",
  "dependencies": ["customer_id", "transaction_amount", "transaction_date"],
  "domain": "RETAIL"
}
```

---

## Model Management

### Get All Models

**Endpoint:** `GET /models`

**Description:** Retrieve all ML models

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "name": "Retail Fraud Classifier v3",
        "description": "XGBoost model for retail transaction fraud detection",
        "type": "CLASSIFICATION",
        "version": "3.0.1",
        "domain": "RETAIL",
        "features": ["transaction_velocity", "amount_deviation", "location_risk_score"],
        "accuracy": 0.9542,
        "precision": 0.9421,
        "recall": 0.9287,
        "f1Score": 0.9353,
        "trainedDate": "2024-01-15T10:00:00Z",
        "deployedDate": "2024-01-20T14:30:00Z",
        "isActive": true,
        "createdBy": "john.doe"
      }
    ]
  }
}
```

### Deploy Model

**Endpoint:** `POST /models/{id}/deploy`

**Description:** Deploy model to an environment

**Required Roles:** ADMIN, CHECKER

**Request:**
```json
{
  "environment": "PROD",
  "enableGradualRollout": true,
  "rolloutPercentage": 10
}
```

---

## Maker-Checker Workflow

### Get Change Requests

**Endpoint:** `GET /change-requests`

**Description:** Retrieve change requests

**Query Parameters:**
- `status` (optional): Filter by status (PENDING, APPROVED, REJECTED)
- `type` (optional): Filter by change type
- `createdBy` (optional): Filter by creator

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "type": "UPDATE",
        "entityType": "RULE",
        "entityId": "rule-uuid",
        "entityName": "Large Amount Transaction",
        "changes": {
          "old": {"priority": 1},
          "new": {"priority": 2}
        },
        "reason": "Adjusting priority based on efficacy analysis",
        "status": "PENDING",
        "createdAt": "2024-01-25T10:00:00Z",
        "createdBy": "jane.smith",
        "reviewedAt": null,
        "reviewedBy": null,
        "reviewComments": null
      }
    ]
  }
}
```

### Approve Change Request

**Endpoint:** `POST /change-requests/{id}/approve`

**Description:** Approve a pending change request

**Required Roles:** CHECKER, ADMIN

**Request:**
```json
{
  "comments": "Approved. Changes look good."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "APPROVED",
    "reviewedAt": "2024-01-25T11:00:00Z",
    "reviewedBy": "bob.wilson",
    "reviewComments": "Approved. Changes look good."
  }
}
```

### Reject Change Request

**Endpoint:** `POST /change-requests/{id}/reject`

**Description:** Reject a pending change request

**Required Roles:** CHECKER, ADMIN

**Request:**
```json
{
  "comments": "Please provide more details on the impact analysis."
}
```

---

## Efficacy Monitoring

### Get Efficacy Dashboard

**Endpoint:** `GET /efficacy/dashboard`

**Description:** Get overall efficacy metrics

**Query Parameters:**
- `startDate` (optional): Start date (ISO format)
- `endDate` (optional): End date (ISO format)
- `domain` (optional): Filter by domain

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalRulesets": 15,
      "activeRulesets": 12,
      "totalRules": 248,
      "activeRules": 235,
      "overallAccuracy": 0.9625,
      "overallPrecision": 0.9512,
      "overallRecall": 0.9438
    },
    "trends": [
      {
        "date": "2024-01-01",
        "fraudDetected": 245,
        "falsePositives": 12,
        "precision": 0.9531
      }
    ],
    "topPerformingRules": [
      {
        "ruleId": "uuid",
        "ruleName": "Large Amount Transaction",
        "triggeredCount": 1523,
        "precision": 0.9712,
        "recall": 0.9634
      }
    ]
  }
}
```

### Get Ruleset Efficacy

**Endpoint:** `GET /efficacy/ruleset/{rulesetId}`

**Description:** Get efficacy metrics for a specific ruleset

**Query Parameters:**
- `environment` (optional): Filter by environment
- `startDate`, `endDate`

**Response:**
```json
{
  "success": true,
  "data": {
    "rulesetId": "uuid",
    "rulesetName": "High Risk Transaction Rules",
    "domain": "RETAIL",
    "environment": "PROD",
    "period": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-01-31T23:59:59Z"
    },
    "metrics": {
      "totalTransactions": 1250000,
      "flaggedTransactions": 8542,
      "blockedTransactions": 3215,
      "truePositives": 3012,
      "falsePositives": 203,
      "trueNegatives": 1241455,
      "falseNegatives": 330,
      "precision": 0.9369,
      "recall": 0.9013,
      "f1Score": 0.9187,
      "accuracy": 0.9957
    },
    "rulePerformance": [
      {
        "ruleId": "uuid",
        "ruleName": "Large Amount Transaction",
        "triggeredCount": 1523,
        "truePositives": 1445,
        "falsePositives": 78,
        "precision": 0.9488,
        "avgProcessingTime": 12.5
      }
    ]
  }
}
```

---

## Admin

### Get All Users

**Endpoint:** `GET /admin/users`

**Description:** Retrieve all users

**Required Roles:** ADMIN, SUPER_ADMIN

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "username": "john.doe",
        "email": "john.doe@bank.com",
        "firstName": "John",
        "lastName": "Doe",
        "role": "ADMIN",
        "department": "Risk Management",
        "isActive": true,
        "lastLogin": "2024-01-25T09:30:00Z",
        "createdAt": "2024-01-01T10:00:00Z"
      }
    ]
  }
}
```

### Create User

**Endpoint:** `POST /admin/users`

**Description:** Create a new user

**Required Roles:** ADMIN, SUPER_ADMIN

**Request:**
```json
{
  "username": "new.user",
  "email": "new.user@bank.com",
  "password": "SecurePassword123!",
  "firstName": "New",
  "lastName": "User",
  "role": "VIEWER",
  "department": "Analytics"
}
```

### Get Audit Logs

**Endpoint:** `GET /admin/audit-logs`

**Description:** Retrieve audit logs

**Required Roles:** ADMIN, SUPER_ADMIN

**Query Parameters:**
- `userId`, `username`, `action`, `entityType`, `startDate`, `endDate`

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "userId": "user-uuid",
        "username": "john.doe",
        "action": "CREATE",
        "entityType": "RULESET",
        "entityId": "ruleset-uuid",
        "changes": {
          "name": "High Risk Transaction Rules"
        },
        "ipAddress": "10.0.1.15",
        "userAgent": "Mozilla/5.0...",
        "timestamp": "2024-01-25T10:00:00Z",
        "status": "SUCCESS"
      }
    ]
  }
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    "Detailed error 1",
    "Detailed error 2"
  ],
  "timestamp": "2024-01-25T10:00:00Z",
  "path": "/api/v1/rulesets"
}
```

### HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **204 No Content**: Request successful, no content to return
- **400 Bad Request**: Invalid request parameters
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource conflict (e.g., duplicate name)
- **422 Unprocessable Entity**: Validation errors
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server error

---

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **100 requests per minute** per user
- **1000 requests per hour** per user

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706184000
```

---

## Pagination

List endpoints support pagination with these query parameters:

- `page`: Page number (0-indexed, default: 0)
- `size`: Items per page (default: 10, max: 100)
- `sortBy`: Field to sort by
- `sortOrder`: Sort direction (`asc` or `desc`)

---

## Filtering

Most list endpoints support filtering using query parameters matching the entity fields:

```
GET /rulesets?domain=RETAIL&isActive=true&search=fraud
```

---

For questions or support, contact: api-support@bank.com
