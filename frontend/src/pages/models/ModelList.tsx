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
  LinearProgress,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  CloudUpload as DeployIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  AttachFile as AttachFileIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Model } from '../../types/index';
import { DOMAINS, ENVIRONMENTS } from '../../constants/index';

// Comprehensive demo data
const mockModels: Model[] = [
  {
    id: '1',
    name: 'Retail Fraud Classifier v3',
    description: 'XGBoost model for retail transaction fraud detection with enhanced feature engineering',
    type: 'CLASSIFICATION',
    version: '3.0.1',
    domain: 'RETAIL',
    features: ['transaction_velocity', 'amount_deviation', 'location_risk_score', 'time_since_last_transaction'],
    accuracy: 0.9542,
    precision: 0.9421,
    recall: 0.9287,
    f1Score: 0.9353,
    trainedDate: '2024-01-15T10:00:00Z',
    deployedDate: '2024-01-20T14:30:00Z',
    isActive: true,
    createdBy: 'john.doe',
  },
  {
    id: '2',
    name: 'Credit Risk Neural Net',
    description: 'Deep learning model for credit card fraud detection using transaction patterns',
    type: 'NEURAL_NETWORK',
    version: '2.1.0',
    domain: 'CREDIT',
    features: ['credit_utilization', 'transaction_velocity', 'location_risk_score', 'merchant_category_risk'],
    accuracy: 0.9625,
    precision: 0.9512,
    recall: 0.9438,
    f1Score: 0.9474,
    trainedDate: '2024-01-10T09:00:00Z',
    deployedDate: '2024-01-18T11:00:00Z',
    isActive: true,
    createdBy: 'jane.smith',
  },
  {
    id: '3',
    name: 'Debit Anomaly Detector',
    description: 'Isolation forest for debit card anomaly detection and unusual spending patterns',
    type: 'CLUSTERING',
    version: '1.0.5',
    domain: 'DEBIT',
    features: ['transaction_amount', 'transaction_velocity', 'location_risk_score', 'balance_change_velocity'],
    accuracy: 0.8934,
    precision: 0.8721,
    recall: 0.8856,
    f1Score: 0.8788,
    trainedDate: '2024-01-05T08:00:00Z',
    deployedDate: undefined,
    isActive: false,
    createdBy: 'bob.wilson',
  },
  {
    id: '4',
    name: 'Account Takeover Predictor',
    description: 'Random Forest model to predict account takeover attempts based on login patterns',
    type: 'CLASSIFICATION',
    version: '1.5.2',
    domain: 'RETAIL',
    features: ['device_fingerprint_match', 'location_risk_score', 'time_since_last_transaction'],
    accuracy: 0.9156,
    precision: 0.8987,
    recall: 0.9234,
    f1Score: 0.9109,
    trainedDate: '2024-01-12T14:20:00Z',
    deployedDate: '2024-01-22T09:15:00Z',
    isActive: true,
    createdBy: 'jane.smith',
  },
  {
    id: '5',
    name: 'Transaction Amount Regressor',
    description: 'Regression model to predict expected transaction amounts for anomaly detection',
    type: 'REGRESSION',
    version: '2.0.0',
    domain: 'RETAIL',
    features: ['avg_transaction_amount_30d', 'customer_id', 'merchant_category_risk'],
    accuracy: 0.8765,
    precision: 0.8543,
    recall: 0.8912,
    f1Score: 0.8724,
    trainedDate: '2024-01-20T11:30:00Z',
    deployedDate: '2024-01-25T16:45:00Z',
    isActive: true,
    createdBy: 'admin',
  },
  {
    id: '6',
    name: 'Credit Card Velocity Model',
    description: 'Ensemble model for detecting rapid fire credit card transactions',
    type: 'CLASSIFICATION',
    version: '1.2.3',
    domain: 'CREDIT',
    features: ['transaction_velocity', 'credit_utilization', 'cross_border_transaction_flag'],
    accuracy: 0.9378,
    precision: 0.9245,
    recall: 0.9456,
    f1Score: 0.9349,
    trainedDate: '2024-01-18T10:00:00Z',
    deployedDate: '2024-01-23T13:20:00Z',
    isActive: true,
    createdBy: 'john.doe',
  },
];

const ModelList: React.FC = () => {
  const [models] = useState<Model[]>(mockModels);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Dialog states
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [openDeployDialog, setOpenDeployDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);

  // Upload form states
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadName, setUploadName] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadType, setUploadType] = useState('CLASSIFICATION');
  const [uploadDomain, setUploadDomain] = useState('RETAIL');
  const [uploadVersion, setUploadVersion] = useState('');

  const handleView = (model: Model) => {
    setSelectedModel(model);
    setOpenViewDialog(true);
  };

  const handleDeploy = (model: Model) => {
    setSelectedModel(model);
    setSelectedEnvironments([]);
    setOpenDeployDialog(true);
  };

  const handleConfirmDeploy = () => {
    console.log('Deploying model:', selectedModel?.name, 'to:', selectedEnvironments);
    alert(`Model "${selectedModel?.name}" deployed to: ${selectedEnvironments.join(', ')}`);
    setOpenDeployDialog(false);
  };

  const handleDelete = (model: Model) => {
    setSelectedModel(model);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log('Delete model:', selectedModel?.name);
    alert(`Model "${selectedModel?.name}" has been deleted`);
    setOpenDeleteDialog(false);
  };

  const handleUpload = () => {
    setUploadFileName('');
    setUploadName('');
    setUploadDescription('');
    setUploadType('CLASSIFICATION');
    setUploadDomain('RETAIL');
    setUploadVersion('');
    setOpenUploadDialog(true);
  };

  const handleConfirmUpload = () => {
    console.log('Uploading model:', uploadName);
    alert(`Model "${uploadName}" uploaded successfully!\n\nFile: ${uploadFileName}\nType: ${uploadType}\nDomain: ${uploadDomain}\nVersion: ${uploadVersion}`);
    setOpenUploadDialog(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadFileName(file.name);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Model Name',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Version {params.row.version}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      minWidth: 300,
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="secondary" variant="outlined" />
      ),
    },
    {
      field: 'domain',
      headerName: 'Domain',
      width: 120,
      renderCell: (params) => <Chip label={params.value} size="small" color="primary" />,
    },
    {
      field: 'accuracy',
      headerName: 'Accuracy',
      width: 150,
      renderCell: (params) => (
        <Box width="100%">
          <Box display="flex" justifyContent="space-between" mb={0.5}>
            <Typography variant="caption">{(params.value * 100).toFixed(2)}%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={params.value * 100}
            color={params.value > 0.95 ? 'success' : params.value > 0.90 ? 'primary' : 'warning'}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      ),
    },
    {
      field: 'f1Score',
      headerName: 'F1 Score',
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={500}>
          {(params.value * 100).toFixed(1)}%
        </Typography>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <ActiveIcon /> : <InactiveIcon />}
          label={params.value ? 'Deployed' : 'Not Deployed'}
          size="small"
          color={params.value ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      width: 130,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View Details">
            <IconButton size="small" onClick={() => handleView(params.row)} aria-label="View model">
              <ViewIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Deploy Model">
            <IconButton
              size="small"
              color="primary"
              disabled={params.row.isActive}
              onClick={() => handleDeploy(params.row)}
              aria-label="Deploy model"
            >
              <DeployIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Model">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row)}
              aria-label="Delete model"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || model.domain === selectedDomain;
    const matchesType = selectedType === 'all' || model.type === selectedType;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'deployed' && model.isActive) ||
      (selectedStatus === 'not-deployed' && !model.isActive);
    return matchesSearch && matchesDomain && matchesType && matchesStatus;
  });

  const avgAccuracy = filteredModels.reduce((sum, m) => sum + (m.accuracy || 0), 0) / filteredModels.length;
  const deployedCount = filteredModels.filter((m) => m.isActive).length;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Model Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage ML models for fraud detection
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleUpload}>
          Upload Model
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Total Models
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {filteredModels.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Deployed Models
              </Typography>
              <Typography variant="h4" fontWeight={600} color="success.main">
                {deployedCount}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Average Accuracy
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {(avgAccuracy * 100).toFixed(1)}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Model Types
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {new Set(filteredModels.map((m) => m.type)).size}
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
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                aria-label="Search models"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Domain"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                <MenuItem value="all">All Domains</MenuItem>
                {DOMAINS.map((domain) => (
                  <MenuItem key={domain.value} value={domain.value}>
                    {domain.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Model Type"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="CLASSIFICATION">Classification</MenuItem>
                <MenuItem value="REGRESSION">Regression</MenuItem>
                <MenuItem value="CLUSTERING">Clustering</MenuItem>
                <MenuItem value="NEURAL_NETWORK">Neural Network</MenuItem>
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
                <MenuItem value="deployed">Deployed</MenuItem>
                <MenuItem value="not-deployed">Not Deployed</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <DataGrid
          rows={filteredModels}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
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

      {/* View Model Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{selectedModel?.name}</Typography>
              <Box display="flex" gap={1} mt={1}>
                <Chip label={`v${selectedModel?.version}`} size="small" color="info" />
                <Chip
                  label={selectedModel?.isActive ? 'Deployed' : 'Not Deployed'}
                  size="small"
                  color={selectedModel?.isActive ? 'success' : 'default'}
                />
                <Chip label={selectedModel?.type} size="small" color="secondary" variant="outlined" />
                <Chip label={selectedModel?.domain} size="small" color="primary" />
              </Box>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            {selectedModel?.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Performance Metrics
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell><strong>Accuracy</strong></TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography>{((selectedModel?.accuracy || 0) * 100).toFixed(2)}%</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={(selectedModel?.accuracy || 0) * 100}
                      color={
                        (selectedModel?.accuracy || 0) > 0.95
                          ? 'success'
                          : (selectedModel?.accuracy || 0) > 0.90
                          ? 'primary'
                          : 'warning'
                      }
                      sx={{ width: 100, height: 6, borderRadius: 3 }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Precision</strong></TableCell>
                <TableCell>{((selectedModel?.precision || 0) * 100).toFixed(2)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Recall</strong></TableCell>
                <TableCell>{((selectedModel?.recall || 0) * 100).toFixed(2)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>F1 Score</strong></TableCell>
                <TableCell>{((selectedModel?.f1Score || 0) * 100).toFixed(2)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Model Information
          </Typography>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell><strong>Model Type</strong></TableCell>
                <TableCell>{selectedModel?.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Domain</strong></TableCell>
                <TableCell>{selectedModel?.domain}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Version</strong></TableCell>
                <TableCell>{selectedModel?.version}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Trained Date</strong></TableCell>
                <TableCell>{selectedModel?.trainedDate ? new Date(selectedModel.trainedDate).toLocaleString() : 'N/A'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Deployed Date</strong></TableCell>
                <TableCell>{selectedModel?.deployedDate ? new Date(selectedModel.deployedDate).toLocaleString() : 'Not deployed'}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Created By</strong></TableCell>
                <TableCell>{selectedModel?.createdBy}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Features ({selectedModel?.features.length || 0})
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {selectedModel?.features.map((feature, index) => (
              <Chip key={index} label={feature} size="small" variant="outlined" />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          {!selectedModel?.isActive && (
            <Button
              variant="contained"
              startIcon={<DeployIcon />}
              onClick={() => {
                setOpenViewDialog(false);
                if (selectedModel) handleDeploy(selectedModel);
              }}
            >
              Deploy Model
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Upload Model Dialog */}
      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Upload New Model</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFileIcon />}
                fullWidth
                sx={{ py: 2 }}
              >
                {uploadFileName || 'Select Model File (.pkl, .h5, .pt, .joblib)'}
                <input
                  type="file"
                  hidden
                  accept=".pkl,.h5,.pt,.joblib,.model"
                  onChange={handleFileSelect}
                />
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Supported formats: Pickle (.pkl), Keras (.h5), PyTorch (.pt), Joblib (.joblib)
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Model Name"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                placeholder="e.g., Credit Fraud Detector v2"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                placeholder="Describe the model's purpose and capabilities"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Model Type"
                value={uploadType}
                onChange={(e) => setUploadType(e.target.value)}
              >
                <MenuItem value="CLASSIFICATION">Classification</MenuItem>
                <MenuItem value="REGRESSION">Regression</MenuItem>
                <MenuItem value="CLUSTERING">Clustering</MenuItem>
                <MenuItem value="NEURAL_NETWORK">Neural Network</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Domain"
                value={uploadDomain}
                onChange={(e) => setUploadDomain(e.target.value)}
              >
                {DOMAINS.map((domain) => (
                  <MenuItem key={domain.value} value={domain.value}>
                    {domain.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Version"
                value={uploadVersion}
                onChange={(e) => setUploadVersion(e.target.value)}
                placeholder="e.g., 1.0.0"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                Once uploaded, the model will be validated and made available for deployment after approval.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirmUpload}
            disabled={!uploadFileName || !uploadName || !uploadVersion}
          >
            Upload Model
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deploy Model Dialog */}
      <Dialog open={openDeployDialog} onClose={() => setOpenDeployDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Deploy Model</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Deploy <strong>{selectedModel?.name}</strong> (v{selectedModel?.version}) to selected environments:
          </Typography>
          <Grid container spacing={2} mt={1}>
            {ENVIRONMENTS.map((env) => (
              <Grid item xs={12} key={env.value}>
                <Box
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: selectedEnvironments.includes(env.value) ? 'primary.main' : 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                    bgcolor: selectedEnvironments.includes(env.value) ? 'primary.50' : 'transparent',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => {
                    setSelectedEnvironments(prev =>
                      prev.includes(env.value)
                        ? prev.filter(e => e !== env.value)
                        : [...prev, env.value]
                    );
                  }}
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography variant="body1" fontWeight={500}>{env.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Click to {selectedEnvironments.includes(env.value) ? 'deselect' : 'select'}
                      </Typography>
                    </Box>
                    <Chip
                      label={selectedEnvironments.includes(env.value) ? 'Selected' : 'Select'}
                      size="small"
                      color={selectedEnvironments.includes(env.value) ? 'primary' : 'default'}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeployDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirmDeploy}
            disabled={selectedEnvironments.length === 0}
          >
            Deploy to {selectedEnvironments.length} Environment{selectedEnvironments.length !== 1 ? 's' : ''}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Model Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="sm">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete the model <strong>{selectedModel?.name}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This action cannot be undone. All model data, metrics, and deployment history will be permanently removed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete Model
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModelList;
