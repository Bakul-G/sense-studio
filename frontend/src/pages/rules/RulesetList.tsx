import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Menu,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as CopyIcon,
  CloudUpload as DeployIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Domain, Environment, Ruleset } from '../../types/index';
import { DOMAINS, ENVIRONMENTS } from '../../constants/index';

// Demo data
const mockRulesets: Ruleset[] = [
  {
    id: '1',
    name: 'High Risk Transaction Rules',
    description: 'Rules to detect high-risk transactions based on amount and velocity',
    domain: 'RETAIL',
    rules: [],
    isActive: true,
    version: 3,
    createdBy: 'john.doe',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
    deployedEnvironments: ['DEV', 'STAGING', 'PROD'],
  },
  {
    id: '2',
    name: 'Credit Card Fraud Detection',
    description: 'ML-based rules for credit card fraud patterns',
    domain: 'CREDIT',
    rules: [],
    isActive: true,
    version: 5,
    createdBy: 'jane.smith',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-22T11:15:00Z',
    deployedEnvironments: ['DEV', 'STAGING'],
  },
  {
    id: '3',
    name: 'Debit Card Security Rules',
    description: 'Rules for debit card transaction monitoring',
    domain: 'DEBIT',
    rules: [],
    isActive: false,
    version: 2,
    createdBy: 'bob.wilson',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z',
    deployedEnvironments: ['DEV'],
  },
];

const RulesetList: React.FC = () => {
  const navigate = useNavigate();
  const [rulesets, setRulesets] = useState<Ruleset[]>(mockRulesets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRuleset, setSelectedRuleset] = useState<string | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, rulesetId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRuleset(rulesetId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRuleset(null);
  };

  const handleView = (id: string) => {
    navigate(`/rulesets/${id}`);
    handleMenuClose();
  };

  const handleEdit = (id: string) => {
    const ruleset = rulesets.find((r) => r.id === id);
    console.log('Edit ruleset:', id);
    alert(`Edit Ruleset: ${ruleset?.name}\n\nThis would open a ruleset editor in a real application.\n\nFor now, click on the ruleset to view its details and rules.`);
    handleMenuClose();
  };

  const handleDeploy = (id: string) => {
    const ruleset = rulesets.find((r) => r.id === id);
    console.log('Deploy ruleset:', id);
    alert(`Deploy Ruleset: ${ruleset?.name}\n\nEnvironments: ${ruleset?.deployedEnvironments.join(', ')}\n\nThis would deploy the ruleset to selected environments in a real application.`);
    handleMenuClose();
  };

  const handleDelete = (id: string) => {
    const ruleset = rulesets.find((r) => r.id === id);
    console.log('Delete ruleset:', id);
    alert(`Delete Ruleset: ${ruleset?.name}\n\nThis would delete the ruleset and all its rules in a real application.`);
    handleMenuClose();
  };

  const handleCreateNew = () => {
    console.log('Create new ruleset');
    alert('Create New Ruleset\n\nThis would open a dialog or page to create a new ruleset with:\n- Name\n- Description\n- Domain (Retail/Credit/Debit)\n- Initial rules\n\nFor now, you can explore existing rulesets by clicking on them.');
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Ruleset Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" fontWeight={500}>
            {params.row.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {params.row.description}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'domain',
      headerName: 'Domain',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color="primary"
          variant="outlined"
        />
      ),
    },
    {
      field: 'version',
      headerName: 'Version',
      width: 100,
      renderCell: (params) => (
        <Chip label={`v${params.value}`} size="small" />
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          size="small"
          color={params.value ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'deployedEnvironments',
      headerName: 'Deployed',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          {params.value.map((env: Environment) => {
            const envConfig = ENVIRONMENTS.find((e) => e.value === env);
            return (
              <Chip
                key={env}
                label={env}
                size="small"
                sx={{
                  bgcolor: envConfig?.color,
                  color: 'white',
                  fontSize: '0.7rem',
                }}
              />
            );
          })}
        </Box>
      ),
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return (
          <Typography variant="body2">
            {date.toLocaleDateString()}
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={(e) => handleMenuOpen(e, params.row.id)}
          aria-label="ruleset actions"
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const filteredRulesets = rulesets.filter((ruleset) => {
    const matchesSearch =
      ruleset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ruleset.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === 'all' || ruleset.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Rule Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Create and manage fraud detection rulesets
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          aria-label="Create new ruleset"
        >
          New Ruleset
        </Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search rulesets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                aria-label="Search rulesets"
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
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <DataGrid
          rows={filteredRulesets}
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

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => selectedRuleset && handleView(selectedRuleset)}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedRuleset && handleEdit(selectedRuleset)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedRuleset && handleDeploy(selectedRuleset)}>
          <ListItemIcon>
            <DeployIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Deploy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedRuleset && handleDelete(selectedRuleset)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default RulesetList;
