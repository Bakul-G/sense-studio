import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  TextField,
  Typography,
  MenuItem,
  Grid,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FileDownload as ExportIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CloudUpload as DeployIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AuditLog } from '../../types/index';

// Comprehensive demo data for audit logs
const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    userId: '2',
    username: 'john.doe',
    action: 'CREATE_RULE',
    entityType: 'RULE',
    entityId: 'rule-001',
    changes: {
      name: 'Large Amount Transaction',
      condition: { field: 'transaction_amount', operator: '>', value: 10000 },
      action: 'BLOCK',
    },
    ipAddress: '192.168.1.45',
    timestamp: '2024-01-30T15:45:23Z',
    status: 'SUCCESS',
  },
  {
    id: '2',
    userId: '3',
    username: 'jane.smith',
    action: 'UPDATE_RULESET',
    entityType: 'RULESET',
    entityId: 'ruleset-001',
    changes: {
      old: { status: 'DRAFT', priority: 1 },
      new: { status: 'ACTIVE', priority: 2 },
    },
    ipAddress: '192.168.1.78',
    timestamp: '2024-01-30T14:32:15Z',
    status: 'SUCCESS',
  },
  {
    id: '3',
    userId: '4',
    username: 'bob.wilson',
    action: 'APPROVE_CHANGE',
    entityType: 'CHANGE_REQUEST',
    entityId: 'cr-001',
    changes: {
      changeRequestId: 'cr-001',
      decision: 'APPROVED',
      comment: 'Approved after review',
    },
    ipAddress: '192.168.1.92',
    timestamp: '2024-01-30T13:15:42Z',
    status: 'SUCCESS',
  },
  {
    id: '4',
    userId: '2',
    username: 'john.doe',
    action: 'DELETE_RULE',
    entityType: 'RULE',
    entityId: 'rule-old-001',
    changes: {
      ruleName: 'Deprecated Velocity Check',
      reason: 'Rule no longer needed',
    },
    ipAddress: '192.168.1.45',
    timestamp: '2024-01-30T12:28:33Z',
    status: 'SUCCESS',
  },
  {
    id: '5',
    userId: '3',
    username: 'jane.smith',
    action: 'DEPLOY_RULESET',
    entityType: 'RULESET',
    entityId: 'ruleset-002',
    changes: {
      environment: 'PROD',
      version: '2.1.0',
      ruleCount: 5,
    },
    ipAddress: '192.168.1.78',
    timestamp: '2024-01-30T11:45:18Z',
    status: 'SUCCESS',
  },
  {
    id: '6',
    userId: '5',
    username: 'alice.brown',
    action: 'CREATE_FEATURE',
    entityType: 'FEATURE',
    entityId: 'feature-001',
    changes: {
      name: 'transaction_velocity',
      calculationLogic: 'COUNT(transactions) WHERE timestamp > NOW() - INTERVAL "10 minutes"',
    },
    ipAddress: '192.168.1.103',
    timestamp: '2024-01-30T10:52:07Z',
    status: 'SUCCESS',
  },
  {
    id: '7',
    userId: '2',
    username: 'john.doe',
    action: 'UPDATE_DATA_FIELD',
    entityType: 'DATA_FIELD',
    entityId: 'field-001',
    changes: {
      old: { dataType: 'STRING', maxLength: 50 },
      new: { dataType: 'STRING', maxLength: 100 },
    },
    ipAddress: '192.168.1.45',
    timestamp: '2024-01-30T09:33:55Z',
    status: 'SUCCESS',
  },
  {
    id: '8',
    userId: '8',
    username: 'edward.jones',
    action: 'UPLOAD_MODEL',
    entityType: 'MODEL',
    entityId: 'model-001',
    changes: {
      modelName: 'Fraud Classifier v3',
      modelType: 'CLASSIFICATION',
      accuracy: 0.9542,
    },
    ipAddress: '192.168.1.156',
    timestamp: '2024-01-29T16:22:44Z',
    status: 'SUCCESS',
  },
  {
    id: '9',
    userId: '4',
    username: 'bob.wilson',
    action: 'REJECT_CHANGE',
    entityType: 'CHANGE_REQUEST',
    entityId: 'cr-002',
    changes: {
      changeRequestId: 'cr-002',
      decision: 'REJECTED',
      comment: 'Insufficient justification',
    },
    ipAddress: '192.168.1.92',
    timestamp: '2024-01-29T15:18:31Z',
    status: 'SUCCESS',
  },
  {
    id: '10',
    userId: '3',
    username: 'jane.smith',
    action: 'CREATE_RULESET',
    entityType: 'RULESET',
    entityId: 'ruleset-003',
    changes: {
      name: 'Credit Card Fraud Detection',
      domain: 'CREDIT',
      ruleCount: 0,
    },
    ipAddress: '192.168.1.78',
    timestamp: '2024-01-29T14:05:22Z',
    status: 'SUCCESS',
  },
  {
    id: '11',
    userId: '2',
    username: 'john.doe',
    action: 'LOGIN',
    entityType: 'USER',
    entityId: '2',
    changes: {
      loginMethod: 'PASSWORD',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    ipAddress: '192.168.1.45',
    timestamp: '2024-01-29T09:00:12Z',
    status: 'SUCCESS',
  },
  {
    id: '12',
    userId: '11',
    username: 'hannah.lee',
    action: 'UPDATE_MODEL',
    entityType: 'MODEL',
    entityId: 'model-002',
    changes: {
      old: { version: '1.0.0', accuracy: 0.9245 },
      new: { version: '1.1.0', accuracy: 0.9378 },
    },
    ipAddress: '192.168.1.187',
    timestamp: '2024-01-29T13:42:09Z',
    status: 'SUCCESS',
  },
  {
    id: '13',
    userId: '5',
    username: 'alice.brown',
    action: 'DELETE_FEATURE',
    entityType: 'FEATURE',
    entityId: 'feature-old-001',
    changes: {
      featureName: 'deprecated_metric',
      reason: 'No longer used in any model',
    },
    ipAddress: '192.168.1.103',
    timestamp: '2024-01-29T11:27:55Z',
    status: 'SUCCESS',
  },
  {
    id: '14',
    userId: '3',
    username: 'jane.smith',
    action: 'DEPLOY_MODEL',
    entityType: 'MODEL',
    entityId: 'model-003',
    changes: {
      environment: 'PROD',
      modelVersion: '2.0.0',
      deploymentTime: 'immediate',
    },
    ipAddress: '192.168.1.78',
    timestamp: '2024-01-28T16:55:33Z',
    status: 'SUCCESS',
  },
  {
    id: '15',
    userId: '2',
    username: 'john.doe',
    action: 'UPDATE_RULE',
    entityType: 'RULE',
    entityId: 'rule-002',
    changes: {
      old: { threshold: 5000, action: 'REVIEW' },
      new: { threshold: 7500, action: 'REVIEW' },
    },
    ipAddress: '192.168.1.45',
    timestamp: '2024-01-28T15:20:18Z',
    status: 'SUCCESS',
  },
  {
    id: '16',
    userId: '10',
    username: 'george.martinez',
    action: 'LOGIN',
    entityType: 'USER',
    entityId: '10',
    changes: {
      loginMethod: 'PASSWORD',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
    ipAddress: '192.168.1.210',
    timestamp: '2024-01-28T14:12:45Z',
    status: 'FAILURE',
    errorMessage: 'Account is deactivated',
  },
  {
    id: '17',
    userId: '4',
    username: 'bob.wilson',
    action: 'APPROVE_CHANGE',
    entityType: 'CHANGE_REQUEST',
    entityId: 'cr-003',
    changes: {
      changeRequestId: 'cr-003',
      decision: 'APPROVED',
      comment: 'Changes look good',
    },
    ipAddress: '192.168.1.92',
    timestamp: '2024-01-28T13:08:27Z',
    status: 'SUCCESS',
  },
  {
    id: '18',
    userId: '8',
    username: 'edward.jones',
    action: 'CREATE_DATA_FIELD',
    entityType: 'DATA_FIELD',
    entityId: 'field-new-001',
    changes: {
      name: 'merchant_risk_score',
      dataType: 'DECIMAL',
      domain: 'RETAIL',
    },
    ipAddress: '192.168.1.156',
    timestamp: '2024-01-28T11:45:52Z',
    status: 'SUCCESS',
  },
  {
    id: '19',
    userId: '3',
    username: 'jane.smith',
    action: 'UPDATE_USER',
    entityType: 'USER',
    entityId: '7',
    changes: {
      old: { role: 'VIEWER', department: 'Analytics' },
      new: { role: 'MAKER', department: 'Analytics' },
    },
    ipAddress: '192.168.1.78',
    timestamp: '2024-01-27T16:33:19Z',
    status: 'SUCCESS',
  },
  {
    id: '20',
    userId: '2',
    username: 'john.doe',
    action: 'EXPORT_DATA',
    entityType: 'AUDIT_LOG',
    entityId: 'export-001',
    changes: {
      dateRange: { start: '2024-01-01', end: '2024-01-27' },
      format: 'CSV',
      recordCount: 145,
    },
    ipAddress: '192.168.1.45',
    timestamp: '2024-01-27T15:22:08Z',
    status: 'SUCCESS',
  },
  {
    id: '21',
    userId: '5',
    username: 'alice.brown',
    action: 'CREATE_RULE',
    entityType: 'RULE',
    entityId: 'rule-003',
    changes: {
      name: 'High Credit Utilization',
      condition: { field: 'credit_utilization', operator: '>', value: 0.9 },
      action: 'FLAG',
    },
    ipAddress: '192.168.1.103',
    timestamp: '2024-01-27T14:10:44Z',
    status: 'SUCCESS',
  },
  {
    id: '22',
    userId: '1',
    username: 'admin',
    action: 'CREATE_USER',
    entityType: 'USER',
    entityId: '12',
    changes: {
      username: 'ian.thompson',
      role: 'VIEWER',
      department: 'Customer Support',
    },
    ipAddress: '192.168.1.10',
    timestamp: '2024-01-27T10:55:31Z',
    status: 'SUCCESS',
  },
  {
    id: '23',
    userId: '2',
    username: 'john.doe',
    action: 'DELETE_RULESET',
    entityType: 'RULESET',
    entityId: 'ruleset-old-001',
    changes: {
      rulesetName: 'Old Transaction Rules',
      reason: 'Replaced by new ruleset',
    },
    ipAddress: '192.168.1.45',
    timestamp: '2024-01-26T16:40:22Z',
    status: 'SUCCESS',
  },
  {
    id: '24',
    userId: '11',
    username: 'hannah.lee',
    action: 'UPDATE_FEATURE',
    entityType: 'FEATURE',
    entityId: 'feature-002',
    changes: {
      old: { calculationLogic: 'AVG(amount) OVER (PARTITION BY customer_id)' },
      new: { calculationLogic: 'AVG(amount) OVER (PARTITION BY customer_id ORDER BY timestamp)' },
    },
    ipAddress: '192.168.1.187',
    timestamp: '2024-01-26T14:25:17Z',
    status: 'SUCCESS',
  },
  {
    id: '25',
    userId: '6',
    username: 'charlie.davis',
    action: 'APPROVE_CHANGE',
    entityType: 'CHANGE_REQUEST',
    entityId: 'cr-004',
    changes: {
      changeRequestId: 'cr-004',
      decision: 'APPROVED',
      comment: 'Compliance verified',
    },
    ipAddress: '192.168.1.125',
    timestamp: '2024-01-26T13:12:09Z',
    status: 'SUCCESS',
  },
  {
    id: '26',
    userId: '3',
    username: 'jane.smith',
    action: 'LOGIN',
    entityType: 'USER',
    entityId: '3',
    changes: {
      loginMethod: 'PASSWORD',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    },
    ipAddress: '192.168.1.78',
    timestamp: '2024-01-26T09:05:33Z',
    status: 'SUCCESS',
  },
  {
    id: '27',
    userId: '8',
    username: 'edward.jones',
    action: 'DEPLOY_RULESET',
    entityType: 'RULESET',
    entityId: 'ruleset-004',
    changes: {
      environment: 'STAGING',
      version: '1.5.0',
      ruleCount: 3,
    },
    ipAddress: '192.168.1.156',
    timestamp: '2024-01-25T17:48:26Z',
    status: 'SUCCESS',
  },
  {
    id: '28',
    userId: '5',
    username: 'alice.brown',
    action: 'LOGIN',
    entityType: 'USER',
    entityId: '5',
    changes: {
      loginMethod: 'SSO',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    },
    ipAddress: '192.168.1.103',
    timestamp: '2024-01-25T08:30:15Z',
    status: 'FAILURE',
    errorMessage: 'SSO token expired',
  },
];

const actionIcons: Record<string, React.ReactElement> = {
  CREATE_RULE: <AddIcon fontSize="small" />,
  UPDATE_RULE: <EditIcon fontSize="small" />,
  DELETE_RULE: <DeleteIcon fontSize="small" />,
  CREATE_RULESET: <AddIcon fontSize="small" />,
  UPDATE_RULESET: <EditIcon fontSize="small" />,
  DELETE_RULESET: <DeleteIcon fontSize="small" />,
  DEPLOY_RULESET: <DeployIcon fontSize="small" />,
  DEPLOY_MODEL: <DeployIcon fontSize="small" />,
  CREATE_FEATURE: <AddIcon fontSize="small" />,
  UPDATE_FEATURE: <EditIcon fontSize="small" />,
  DELETE_FEATURE: <DeleteIcon fontSize="small" />,
  CREATE_DATA_FIELD: <AddIcon fontSize="small" />,
  UPDATE_DATA_FIELD: <EditIcon fontSize="small" />,
  APPROVE_CHANGE: <SuccessIcon fontSize="small" />,
  REJECT_CHANGE: <ErrorIcon fontSize="small" />,
};

const AuditLogs: React.FC = () => {
  const [auditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedEntityType, setSelectedEntityType] = useState<string>('all');

  const handleExportLogs = () => {
    console.log('Export audit logs');
    alert('Export Audit Logs\n\nThis would export the filtered audit logs to CSV or Excel format for compliance and reporting in a real application.');
  };

  const columns: GridColDef[] = [
    {
      field: 'timestamp',
      headerName: 'Timestamp',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </Typography>
      ),
    },
    {
      field: 'username',
      headerName: 'User',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 180,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1}>
          {actionIcons[params.value] || <EditIcon fontSize="small" />}
          <Typography variant="body2">{params.value.replace(/_/g, ' ')}</Typography>
        </Box>
      ),
    },
    {
      field: 'entityType',
      headerName: 'Entity Type',
      width: 140,
      renderCell: (params) => <Chip label={params.value} size="small" variant="outlined" />,
    },
    {
      field: 'entityId',
      headerName: 'Entity ID',
      width: 150,
      renderCell: (params) => (
        <Typography variant="body2" fontFamily="monospace" fontSize="0.75rem">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'ipAddress',
      headerName: 'IP Address',
      width: 140,
      renderCell: (params) => (
        <Typography variant="body2" fontFamily="monospace" fontSize="0.75rem">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          icon={params.value === 'SUCCESS' ? <SuccessIcon /> : <ErrorIcon />}
          label={params.value}
          size="small"
          color={params.value === 'SUCCESS' ? 'success' : 'error'}
        />
      ),
    },
    {
      field: 'errorMessage',
      headerName: 'Details',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        if (params.row.errorMessage) {
          return (
            <Tooltip title={params.row.errorMessage}>
              <Typography variant="body2" color="error" noWrap>
                {params.row.errorMessage}
              </Typography>
            </Tooltip>
          );
        }
        const changes = params.row.changes;
        const changesSummary = Object.keys(changes).slice(0, 2).join(', ');
        return (
          <Tooltip title={JSON.stringify(changes, null, 2)}>
            <Typography variant="body2" color="text.secondary" noWrap>
              {changesSummary}
            </Typography>
          </Tooltip>
        );
      },
    },
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = selectedAction === 'all' || log.action === selectedAction;
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    const matchesEntityType = selectedEntityType === 'all' || log.entityType === selectedEntityType;
    return matchesSearch && matchesAction && matchesStatus && matchesEntityType;
  });

  const successCount = auditLogs.filter((log) => log.status === 'SUCCESS').length;
  const failureCount = auditLogs.filter((log) => log.status === 'FAILURE').length;
  const uniqueUsers = new Set(auditLogs.map((log) => log.username)).size;
  const uniqueActions = new Set(auditLogs.map((log) => log.action)).size;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Audit Logs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View system audit trail and user activity
          </Typography>
        </Box>
        <Button variant="outlined" startIcon={<ExportIcon />} onClick={handleExportLogs}>
          Export Logs
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Total Events
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {filteredLogs.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Successful
              </Typography>
              <Typography variant="h4" fontWeight={600} color="success.main">
                {successCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {((successCount / auditLogs.length) * 100).toFixed(1)}% success rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Failed
              </Typography>
              <Typography variant="h4" fontWeight={600} color="error.main">
                {failureCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {((failureCount / auditLogs.length) * 100).toFixed(1)}% failure rate
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Active Users
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {uniqueUsers}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {uniqueActions} different actions
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                aria-label="Search audit logs"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Action"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
              >
                <MenuItem value="all">All Actions</MenuItem>
                <MenuItem value="CREATE_RULE">Create Rule</MenuItem>
                <MenuItem value="UPDATE_RULE">Update Rule</MenuItem>
                <MenuItem value="DELETE_RULE">Delete Rule</MenuItem>
                <MenuItem value="DEPLOY_RULESET">Deploy Ruleset</MenuItem>
                <MenuItem value="APPROVE_CHANGE">Approve Change</MenuItem>
                <MenuItem value="REJECT_CHANGE">Reject Change</MenuItem>
                <MenuItem value="LOGIN">Login</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Entity Type"
                value={selectedEntityType}
                onChange={(e) => setSelectedEntityType(e.target.value)}
              >
                <MenuItem value="all">All Entity Types</MenuItem>
                <MenuItem value="RULE">Rule</MenuItem>
                <MenuItem value="RULESET">Ruleset</MenuItem>
                <MenuItem value="FEATURE">Feature</MenuItem>
                <MenuItem value="MODEL">Model</MenuItem>
                <MenuItem value="DATA_FIELD">Data Field</MenuItem>
                <MenuItem value="USER">User</MenuItem>
                <MenuItem value="CHANGE_REQUEST">Change Request</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="SUCCESS">Success</MenuItem>
                <MenuItem value="FAILURE">Failure</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <DataGrid
          rows={filteredLogs}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
            sorting: {
              sortModel: [{ field: 'timestamp', sort: 'desc' }],
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          checkboxSelection
          disableRowSelectionOnClick
          autoHeight
          sx={{
            border: 'none',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          }}
        />
      </Card>
    </Box>
  );
};

export default AuditLogs;
