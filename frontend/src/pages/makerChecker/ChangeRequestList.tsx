import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  TextField,
  Typography,
  MenuItem,
  Grid,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  Pending as PendingIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ChangeRequest } from '../../types/index';

// Comprehensive demo data
const mockChangeRequests: ChangeRequest[] = [
  {
    id: '1',
    type: 'UPDATE',
    entityType: 'RULE',
    entityId: 'rule-123',
    entityName: 'Large Amount Transaction',
    changes: {
      old: { priority: 1, threshold: 10000 },
      new: { priority: 2, threshold: 15000 },
    },
    reason: 'Adjusting priority and threshold based on recent efficacy analysis showing false positive rate reduction',
    status: 'PENDING',
    createdBy: 'jane.smith',
    createdAt: '2024-01-25T10:00:00Z',
    reviewedBy: undefined,
    reviewedAt: undefined,
    reviewComments: undefined,
  },
  {
    id: '2',
    type: 'CREATE',
    entityType: 'RULESET',
    entityId: null,
    entityName: 'Mobile Banking Rules',
    changes: {
      name: 'Mobile Banking Rules',
      domain: 'RETAIL',
      description: 'Rules specific to mobile app transactions',
    },
    reason: 'New ruleset required for mobile channel fraud detection based on app-specific risk vectors',
    status: 'APPROVED',
    createdBy: 'john.doe',
    createdAt: '2024-01-22T15:30:00Z',
    reviewedBy: 'bob.wilson',
    reviewedAt: '2024-01-23T09:15:00Z',
    reviewComments: 'Approved. Excellent addition to our fraud prevention strategy.',
  },
  {
    id: '3',
    type: 'DEPLOY',
    entityType: 'RULESET',
    entityId: 'ruleset-456',
    entityName: 'Credit Card Fraud Detection',
    changes: {
      environment: 'PROD',
      version: 5,
    },
    reason: 'Deploying tested rules to production after successful staging validation',
    status: 'PENDING',
    createdBy: 'jane.smith',
    createdAt: '2024-01-26T11:45:00Z',
    reviewedBy: undefined,
    reviewedAt: undefined,
    reviewComments: undefined,
  },
  {
    id: '4',
    type: 'UPDATE',
    entityType: 'FEATURE',
    entityId: 'feature-789',
    entityName: 'transaction_velocity',
    changes: {
      old: { calculationLogic: 'COUNT(*) WHERE time < 10min' },
      new: { calculationLogic: 'COUNT(*) WHERE time < 5min' },
    },
    reason: 'Reducing time window to 5 minutes for more accurate velocity detection',
    status: 'REJECTED',
    createdBy: 'bob.wilson',
    createdAt: '2024-01-20T14:20:00Z',
    reviewedBy: 'john.doe',
    reviewedAt: '2024-01-21T10:30:00Z',
    reviewComments: 'Rejected. 5-minute window may cause too many false positives. Please provide impact analysis.',
  },
  {
    id: '5',
    type: 'DELETE',
    entityType: 'RULE',
    entityId: 'rule-999',
    entityName: 'Legacy IP Check',
    changes: {
      ruleId: 'rule-999',
      ruleName: 'Legacy IP Check',
    },
    reason: 'Removing deprecated rule that has been replaced by device fingerprint matching',
    status: 'PENDING',
    createdBy: 'john.doe',
    createdAt: '2024-01-27T09:00:00Z',
    reviewedBy: undefined,
    reviewedAt: undefined,
    reviewComments: undefined,
  },
  {
    id: '6',
    type: 'CREATE',
    entityType: 'MODEL',
    entityId: null,
    entityName: 'Enhanced Neural Network v4',
    changes: {
      name: 'Enhanced Neural Network v4',
      type: 'NEURAL_NETWORK',
      accuracy: 0.9712,
    },
    reason: 'Deploying new model version with improved accuracy (+2.3% over v3)',
    status: 'PENDING',
    createdBy: 'jane.smith',
    createdAt: '2024-01-26T16:30:00Z',
    reviewedBy: undefined,
    reviewedAt: undefined,
    reviewComments: undefined,
  },
  {
    id: '7',
    type: 'UPDATE',
    entityType: 'DATA_FIELD',
    entityId: 'field-321',
    entityName: 'transaction_amount',
    changes: {
      old: { validationRule: 'max: 50000' },
      new: { validationRule: 'max: 100000' },
    },
    reason: 'Increasing maximum transaction amount limit for high-value merchant accounts',
    status: 'APPROVED',
    createdBy: 'bob.wilson',
    createdAt: '2024-01-24T11:00:00Z',
    reviewedBy: 'jane.smith',
    reviewedAt: '2024-01-24T15:45:00Z',
    reviewComments: 'Approved after verification with business requirements.',
  },
];

const ChangeRequestList: React.FC = () => {
  const [requests] = useState<ChangeRequest[]>(mockChangeRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ChangeRequest | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [reviewComments, setReviewComments] = useState('');

  const handleView = (request: ChangeRequest) => {
    setSelectedRequest(request);
    setOpenDialog(true);
    setActionType(null);
  };

  const handleAction = (request: ChangeRequest, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setOpenDialog(true);
  };

  const handleSubmitAction = () => {
    console.log(`${actionType} request:`, selectedRequest?.id, reviewComments);
    const action = actionType === 'approve' ? 'Approved' : 'Rejected';
    alert(`Change Request ${action}\n\nEntity: ${selectedRequest?.entityName}\nComments: ${reviewComments}\n\nThe change request would be ${action.toLowerCase()} in a real application.`);
    setOpenDialog(false);
    setReviewComments('');
  };

  const columns: GridColDef[] = [
    {
      field: 'entityName',
      headerName: 'Entity',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.entityType}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'type',
      headerName: 'Change Type',
      width: 120,
      renderCell: (params) => {
        const colorMap: Record<string, 'primary' | 'success' | 'error' | 'warning'> = {
          CREATE: 'success',
          UPDATE: 'primary',
          DELETE: 'error',
          DEPLOY: 'warning',
        };
        return <Chip label={params.value} size="small" color={colorMap[params.value] || 'default'} />;
      },
    },
    {
      field: 'reason',
      headerName: 'Reason',
      flex: 2,
      minWidth: 300,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const colorMap: Record<string, 'warning' | 'success' | 'error'> = {
          PENDING: 'warning',
          APPROVED: 'success',
          REJECTED: 'error',
        };
        const iconMap: Record<string, React.ReactElement> = {
          PENDING: <PendingIcon />,
          APPROVED: <ApproveIcon />,
          REJECTED: <RejectIcon />,
        };
        return (
          <Chip
            icon={iconMap[params.value]}
            label={params.value}
            size="small"
            color={colorMap[params.value] || 'default'}
          />
        );
      },
    },
    {
      field: 'createdBy',
      headerName: 'Requested By',
      width: 130,
    },
    {
      field: 'createdAt',
      headerName: 'Requested Date',
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return <Typography variant="body2">{date.toLocaleDateString()}</Typography>;
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton size="small" onClick={() => handleView(params.row)} aria-label="View details">
            <ViewIcon fontSize="small" />
          </IconButton>
          {params.row.status === 'PENDING' && (
            <>
              <IconButton
                size="small"
                color="success"
                onClick={() => handleAction(params.row, 'approve')}
                aria-label="Approve request"
              >
                <ApproveIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => handleAction(params.row, 'reject')}
                aria-label="Reject request"
              >
                <RejectIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </Box>
      ),
    },
  ];

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.entityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.createdBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesType = selectedType === 'all' || request.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const pendingCount = requests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = requests.filter((r) => r.status === 'APPROVED').length;
  const rejectedCount = requests.filter((r) => r.status === 'REJECTED').length;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Pending Approvals
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review and approve change requests (Maker-Checker workflow)
          </Typography>
        </Box>
        {pendingCount > 0 && (
          <Chip
            label={`${pendingCount} Pending`}
            color="warning"
            icon={<PendingIcon />}
            sx={{ fontSize: '1rem', py: 2.5, px: 1 }}
          />
        )}
      </Box>

      {/* Statistics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Pending
              </Typography>
              <Typography variant="h3" fontWeight={600} color="warning.main">
                {pendingCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Approved
              </Typography>
              <Typography variant="h3" fontWeight={600} color="success.main">
                {approvedCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Rejected
              </Typography>
              <Typography variant="h3" fontWeight={600} color="error.main">
                {rejectedCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search change requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                aria-label="Search change requests"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
                <MenuItem value="APPROVED">Approved</MenuItem>
                <MenuItem value="REJECTED">Rejected</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Change Type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="CREATE">Create</MenuItem>
                <MenuItem value="UPDATE">Update</MenuItem>
                <MenuItem value="DELETE">Delete</MenuItem>
                <MenuItem value="DEPLOY">Deploy</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <DataGrid
          rows={filteredRequests}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
            sorting: {
              sortModel: [{ field: 'createdAt', sort: 'desc' }],
            },
          }}
          pageSizeOptions={[10, 25, 50]}
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

      {/* Detail/Action Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {actionType ? `${actionType === 'approve' ? 'Approve' : 'Reject'} Change Request` : 'Change Request Details'}
        </DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <Box mt={2}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Entity
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {selectedRequest.entityName} ({selectedRequest.entityType})
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Change Type
                  </Typography>
                  <Chip label={selectedRequest.type} size="small" sx={{ mt: 0.5 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip label={selectedRequest.status} size="small" sx={{ mt: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Reason
                  </Typography>
                  <Typography variant="body1">{selectedRequest.reason}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Changes
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: 'grey.100',
                      p: 2,
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                    }}
                  >
                    <pre>{JSON.stringify(selectedRequest.changes, null, 2)}</pre>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Requested By
                  </Typography>
                  <Typography variant="body1">{selectedRequest.createdBy}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Requested Date
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedRequest.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
                {selectedRequest.reviewedBy && (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Reviewed By
                      </Typography>
                      <Typography variant="body1">{selectedRequest.reviewedBy}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Reviewed Date
                      </Typography>
                      <Typography variant="body1">
                        {selectedRequest.reviewedAt && new Date(selectedRequest.reviewedAt).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Review Comments
                      </Typography>
                      <Alert severity={selectedRequest.status === 'APPROVED' ? 'success' : 'error'} sx={{ mt: 1 }}>
                        {selectedRequest.reviewComments}
                      </Alert>
                    </Grid>
                  </>
                )}
              </Grid>

              {actionType && (
                <Box mt={3}>
                  <TextField
                    fullWidth
                    label="Review Comments"
                    multiline
                    rows={3}
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    placeholder={`Enter your ${actionType} comments...`}
                    required
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            {actionType ? 'Cancel' : 'Close'}
          </Button>
          {actionType && (
            <Button
              variant="contained"
              color={actionType === 'approve' ? 'success' : 'error'}
              onClick={handleSubmitAction}
              disabled={!reviewComments.trim()}
            >
              {actionType === 'approve' ? 'Approve' : 'Reject'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChangeRequestList;
