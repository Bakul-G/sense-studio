import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  ArrowBack,
  Edit as EditIcon,
  CloudUpload as DeployIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Rule } from '../../types/index';
import { ENVIRONMENTS } from '../../constants/index';

// Mock data
const mockRuleset = {
  id: '1',
  name: 'High Risk Transaction Rules',
  description: 'Rules to detect high-risk transactions based on amount and velocity',
  domain: 'RETAIL',
  isActive: true,
  version: 3,
  createdBy: 'john.doe',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-01-20T14:30:00Z',
  deployedEnvironments: ['DEV', 'STAGING', 'PROD'],
};

const mockRules: Rule[] = [
  {
    id: '1',
    name: 'Large Amount Transaction',
    description: 'Block transactions above $10,000',
    rulesetId: '1',
    domain: 'RETAIL',
    condition: {
      expression: 'amount > 10000',
      fields: ['amount'],
      operator: 'AND',
      conditions: [],
    },
    action: {
      type: 'BLOCK',
      reason: 'Transaction amount exceeds limit',
    },
    priority: 1,
    status: 'ACTIVE',
    createdBy: 'john.doe',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    version: 1,
  },
  {
    id: '2',
    name: 'Rapid Transaction Velocity',
    description: 'Flag accounts with more than 5 transactions in 10 minutes',
    rulesetId: '1',
    domain: 'RETAIL',
    condition: {
      expression: 'transactionCount > 5 AND timeWindow < 10',
      fields: ['transactionCount', 'timeWindow'],
      operator: 'AND',
      conditions: [],
    },
    action: {
      type: 'REVIEW',
      reason: 'Unusual transaction velocity',
    },
    priority: 2,
    status: 'ACTIVE',
    createdBy: 'john.doe',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    version: 1,
  },
];

const RulesetDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeployDialog, setOpenDeployDialog] = useState(false);
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>(mockRuleset.deployedEnvironments);
  const [editName, setEditName] = useState(mockRuleset.name);
  const [editDescription, setEditDescription] = useState(mockRuleset.description);

  const handleEdit = () => {
    setEditName(mockRuleset.name);
    setEditDescription(mockRuleset.description);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving ruleset:', editName, editDescription);
    alert(`Ruleset "${editName}" saved successfully!`);
    setOpenEditDialog(false);
  };

  const handleDeploy = () => {
    setSelectedEnvironments(mockRuleset.deployedEnvironments);
    setOpenDeployDialog(true);
  };

  const handleConfirmDeploy = () => {
    console.log('Deploying ruleset:', mockRuleset.name, 'to:', selectedEnvironments);
    alert(`Ruleset "${mockRuleset.name}" deployed to: ${selectedEnvironments.join(', ')}`);
    setOpenDeployDialog(false);
  };

  const ruleColumns: GridColDef[] = [
    {
      field: 'priority',
      headerName: 'Priority',
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="primary" />
      ),
    },
    {
      field: 'name',
      headerName: 'Rule Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 2,
      minWidth: 250,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value.type}
          size="small"
          color={
            params.value.type === 'BLOCK'
              ? 'error'
              : params.value.type === 'ALLOW'
              ? 'success'
              : 'warning'
          }
        />
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'ACTIVE' ? 'success' : 'default'}
        />
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate('/rulesets')} sx={{ mr: 2 }} aria-label="Go back">
          <ArrowBack />
        </IconButton>
        <Box flex={1}>
          <Typography variant="h4" fontWeight={600}>
            {mockRuleset.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mockRuleset.description}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          sx={{ mr: 1 }}
          onClick={handleEdit}
          aria-label="Edit ruleset"
        >
          Edit
        </Button>
        <Button
          variant="contained"
          startIcon={<DeployIcon />}
          onClick={handleDeploy}
          aria-label="Deploy ruleset"
        >
          Deploy
        </Button>
      </Box>

      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Domain
              </Typography>
              <Chip label={mockRuleset.domain} color="primary" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Version
              </Typography>
              <Typography variant="h6">v{mockRuleset.version}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Status
              </Typography>
              <Chip
                label={mockRuleset.isActive ? 'Active' : 'Inactive'}
                color={mockRuleset.isActive ? 'success' : 'default'}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Deployed To
              </Typography>
              <Box display="flex" gap={0.5} flexWrap="wrap">
                {mockRuleset.deployedEnvironments.map((env) => (
                  <Chip key={env} label={env} size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, newValue) => setTabValue(newValue)}>
            <Tab label="Rules" />
            <Tab label="Version History" />
            <Tab label="Deployment History" />
            <Tab label="Metrics" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
              <Typography variant="h6">Rules ({mockRules.length})</Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate(`/rulesets/${id}/rules/new`)}
              >
                Add Rule
              </Button>
            </Box>
            <DataGrid
              rows={mockRules}
              columns={ruleColumns}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10 },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              autoHeight
              sx={{ border: 'none' }}
            />
          </Box>
        )}

        {tabValue === 1 && (
          <CardContent>
            <Typography>Version history content...</Typography>
          </CardContent>
        )}

        {tabValue === 2 && (
          <CardContent>
            <Typography>Deployment history content...</Typography>
          </CardContent>
        )}

        {tabValue === 3 && (
          <CardContent>
            <Typography>Metrics content...</Typography>
          </CardContent>
        )}
      </Card>

      {/* Edit Ruleset Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Ruleset</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Ruleset Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Domain"
                value={mockRuleset.domain}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Version"
                value={`v${mockRuleset.version}`}
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                This ruleset contains {mockRules.length} rules. To modify rules, use the Rules tab.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Deploy Ruleset Dialog */}
      <Dialog open={openDeployDialog} onClose={() => setOpenDeployDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Deploy Ruleset</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Deploy <strong>{mockRuleset.name}</strong> (v{mockRuleset.version}) to selected environments:
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
                        {mockRuleset.deployedEnvironments.includes(env.value) ? 'Currently deployed' : 'Not deployed'}
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
    </Box>
  );
};

export default RulesetDetail;
