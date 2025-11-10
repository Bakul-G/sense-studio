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
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Code as CodeIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Feature } from '../../types/index';
import { DOMAINS } from '../../constants/index';

// Comprehensive demo data
const mockFeatures: Feature[] = [
  {
    id: '1',
    name: 'transaction_velocity',
    displayName: 'Transaction Velocity',
    description: 'Number of transactions in last 10 minutes for a customer',
    dataType: 'NUMBER',
    calculationLogic: 'COUNT(transactions) WHERE customer_id = ? AND timestamp > NOW() - INTERVAL \'10 minutes\'',
    dependencies: ['customer_id', 'transaction_timestamp'],
    domain: 'RETAIL',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    name: 'amount_deviation',
    displayName: 'Amount Deviation Score',
    description: 'Standard deviation from customer average transaction amount',
    dataType: 'DECIMAL',
    calculationLogic: '(current_amount - AVG(historical_amounts)) / STDDEV(historical_amounts)',
    dependencies: ['transaction_amount', 'customer_id'],
    domain: 'RETAIL',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'location_risk_score',
    displayName: 'Location Risk Score',
    description: 'Risk score based on transaction location and history',
    dataType: 'DECIMAL',
    calculationLogic: 'LOOKUP(location_risk_table, transaction_location) * CASE WHEN is_new_location THEN 2.0 ELSE 1.0 END',
    dependencies: ['transaction_location', 'customer_location_history'],
    domain: 'RETAIL',
    isActive: true,
    createdBy: 'john.doe',
    createdAt: '2024-01-12T09:00:00Z',
    updatedAt: '2024-01-22T11:15:00Z',
  },
  {
    id: '4',
    name: 'time_since_last_transaction',
    displayName: 'Time Since Last Transaction',
    description: 'Minutes elapsed since previous transaction',
    dataType: 'NUMBER',
    calculationLogic: 'TIMESTAMPDIFF(MINUTE, last_transaction_timestamp, current_timestamp)',
    dependencies: ['customer_id', 'transaction_timestamp'],
    domain: 'RETAIL',
    isActive: true,
    createdBy: 'jane.smith',
    createdAt: '2024-01-15T14:00:00Z',
    updatedAt: '2024-01-25T10:30:00Z',
  },
  {
    id: '5',
    name: 'credit_utilization',
    displayName: 'Credit Utilization Rate',
    description: 'Percentage of credit limit currently used',
    dataType: 'DECIMAL',
    calculationLogic: '((credit_limit - available_credit) / credit_limit) * 100',
    dependencies: ['credit_limit', 'available_credit'],
    domain: 'CREDIT',
    isActive: true,
    createdBy: 'bob.wilson',
    createdAt: '2024-01-08T11:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
  },
  {
    id: '6',
    name: 'avg_transaction_amount_30d',
    displayName: 'Average Transaction Amount (30d)',
    description: 'Average transaction amount over last 30 days',
    dataType: 'DECIMAL',
    calculationLogic: 'AVG(transaction_amount) WHERE customer_id = ? AND transaction_date >= NOW() - INTERVAL \'30 days\'',
    dependencies: ['customer_id', 'transaction_amount', 'transaction_date'],
    domain: 'RETAIL',
    isActive: true,
    createdBy: 'admin',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-15T12:20:00Z',
  },
  {
    id: '7',
    name: 'merchant_category_risk',
    displayName: 'Merchant Category Risk',
    description: 'Risk score associated with merchant category code',
    dataType: 'DECIMAL',
    calculationLogic: 'CASE merchant_category_code WHEN \'6211\' THEN 8.5 WHEN \'5734\' THEN 6.2 ELSE 3.0 END',
    dependencies: ['merchant_category_code'],
    domain: 'CREDIT',
    isActive: true,
    createdBy: 'jane.smith',
    createdAt: '2024-01-20T09:30:00Z',
    updatedAt: '2024-01-28T15:10:00Z',
  },
  {
    id: '8',
    name: 'balance_change_velocity',
    displayName: 'Balance Change Velocity',
    description: 'Rate of change in account balance over last 7 days',
    dataType: 'DECIMAL',
    calculationLogic: '(current_balance - balance_7d_ago) / 7',
    dependencies: ['current_balance', 'historical_balance'],
    domain: 'DEBIT',
    isActive: true,
    createdBy: 'bob.wilson',
    createdAt: '2024-01-11T10:15:00Z',
    updatedAt: '2024-01-21T14:05:00Z',
  },
  {
    id: '9',
    name: 'cross_border_transaction_flag',
    displayName: 'Cross-Border Transaction Flag',
    description: 'Indicates if transaction is cross-border',
    dataType: 'BOOLEAN',
    calculationLogic: 'CASE WHEN transaction_country != customer_home_country THEN TRUE ELSE FALSE END',
    dependencies: ['transaction_country', 'customer_home_country'],
    domain: 'CREDIT',
    isActive: true,
    createdBy: 'john.doe',
    createdAt: '2024-01-18T13:45:00Z',
    updatedAt: '2024-01-26T09:20:00Z',
  },
  {
    id: '10',
    name: 'device_fingerprint_match',
    displayName: 'Device Fingerprint Match Score',
    description: 'Similarity score between current and known devices',
    dataType: 'DECIMAL',
    calculationLogic: 'CALCULATE_SIMILARITY(current_device_fingerprint, known_device_fingerprints)',
    dependencies: ['device_fingerprint', 'customer_known_devices'],
    domain: 'RETAIL',
    isActive: false,
    createdBy: 'jane.smith',
    createdAt: '2024-01-25T11:30:00Z',
    updatedAt: '2024-01-29T16:55:00Z',
  },
];

const FeatureList: React.FC = () => {
  const [features] = useState<Feature[]>(mockFeatures);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleView = (feature: Feature) => {
    setSelectedFeature(feature);
    setOpenDialog(true);
  };

  const handleEdit = (feature: Feature) => {
    setSelectedFeature(feature);
    setOpenDialog(true);
    // In a real app, this would enable edit mode
    console.log('Edit feature:', feature.name);
  };

  const handleDelete = (feature: Feature) => {
    // In a real app, this would show a confirmation dialog and delete
    console.log('Delete feature:', feature.name);
    alert(`Delete feature: ${feature.displayName}\n\nThis would delete the feature in a real application.`);
  };

  const handleCreate = () => {
    setSelectedFeature(null);
    setOpenDialog(true);
  };

  const handleDeploy = (feature: Feature) => {
    console.log('Deploy feature:', feature.name);
    alert(`Deploy feature: ${feature.displayName}\n\nThis would deploy the feature to production in a real application.`);
    setOpenDialog(false);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Feature Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontFamily="monospace" fontWeight={500}>
            {params.value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.displayName}
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
      field: 'dataType',
      headerName: 'Data Type',
      width: 120,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="primary" variant="outlined" />
      ),
    },
    {
      field: 'domain',
      headerName: 'Domain',
      width: 120,
      renderCell: (params) => <Chip label={params.value} size="small" />,
    },
    {
      field: 'dependencies',
      headerName: 'Dependencies',
      width: 150,
      renderCell: (params) => (
        <Tooltip title={(params.value as string[]).join(', ')}>
          <Chip label={`${params.value.length} fields`} size="small" color="info" />
        </Tooltip>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <ActiveIcon /> : <InactiveIcon />}
          label={params.value ? 'Active' : 'Inactive'}
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
          <IconButton size="small" onClick={() => handleView(params.row)} aria-label="View feature">
            <CodeIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleEdit(params.row)} aria-label="Edit feature">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(params.row)} aria-label="Delete feature">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  const filteredFeatures = features.filter((feature) => {
    const matchesSearch =
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === 'all' || feature.domain === selectedDomain;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && feature.isActive) ||
      (selectedStatus === 'inactive' && !feature.isActive);
    return matchesSearch && matchesDomain && matchesStatus;
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Feature Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage engineered features for fraud detection rules
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          New Feature
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="Search features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                aria-label="Search features"
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
                label="Status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <MenuItem value="all">All Status</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box display="flex" alignItems="center" height="100%">
                <Typography variant="body2" color="text.secondary">
                  Total: {filteredFeatures.length}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <DataGrid
          rows={filteredFeatures}
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

      {/* Feature Detail Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedFeature ? `Feature: ${selectedFeature.displayName}` : 'Create New Feature'}
        </DialogTitle>
        <DialogContent>
          {selectedFeature && (
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Feature Name
              </Typography>
              <Typography variant="body1" fontFamily="monospace" mb={2}>
                {selectedFeature.name}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" mb={2}>
                {selectedFeature.description}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Calculation Logic
              </Typography>
              <Box
                sx={{
                  bgcolor: 'grey.100',
                  p: 2,
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  mb: 2,
                  overflowX: 'auto',
                }}
              >
                {selectedFeature.calculationLogic}
              </Box>

              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Dependencies
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                {selectedFeature.dependencies.map((dep) => (
                  <Chip key={dep} label={dep} size="small" variant="outlined" />
                ))}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Domain
                  </Typography>
                  <Chip label={selectedFeature.domain} color="primary" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Data Type
                  </Typography>
                  <Chip label={selectedFeature.dataType} color="primary" variant="outlined" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Status
                  </Typography>
                  <Chip
                    icon={selectedFeature.isActive ? <ActiveIcon /> : <InactiveIcon />}
                    label={selectedFeature.isActive ? 'Active' : 'Inactive'}
                    color={selectedFeature.isActive ? 'success' : 'default'}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Created By
                  </Typography>
                  <Typography variant="body1">{selectedFeature.createdBy}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {selectedFeature && (
            <>
              <Button variant="outlined" onClick={() => handleEdit(selectedFeature)}>
                Edit
              </Button>
              <Button variant="contained" onClick={() => handleDeploy(selectedFeature)}>
                Deploy
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FeatureList;
