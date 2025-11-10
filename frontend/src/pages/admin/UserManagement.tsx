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
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as ActiveIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { User, UserRole } from '../../types/index';

// Comprehensive demo data for users
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@fraudbank.com',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'SUPER_ADMIN',
    department: 'IT Operations',
    isActive: true,
    createdAt: '2023-01-15T10:00:00Z',
    lastLogin: '2024-01-30T15:45:00Z',
  },
  {
    id: '2',
    username: 'john.doe',
    email: 'john.doe@fraudbank.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'ADMIN',
    department: 'Fraud Prevention',
    isActive: true,
    createdAt: '2023-02-10T09:30:00Z',
    lastLogin: '2024-01-30T14:20:00Z',
  },
  {
    id: '3',
    username: 'jane.smith',
    email: 'jane.smith@fraudbank.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'MAKER',
    department: 'Risk Management',
    isActive: true,
    createdAt: '2023-03-05T11:15:00Z',
    lastLogin: '2024-01-30T13:10:00Z',
  },
  {
    id: '4',
    username: 'bob.wilson',
    email: 'bob.wilson@fraudbank.com',
    firstName: 'Bob',
    lastName: 'Wilson',
    role: 'CHECKER',
    department: 'Compliance',
    isActive: true,
    createdAt: '2023-03-10T14:20:00Z',
    lastLogin: '2024-01-30T12:30:00Z',
  },
  {
    id: '5',
    username: 'alice.brown',
    email: 'alice.brown@fraudbank.com',
    firstName: 'Alice',
    lastName: 'Brown',
    role: 'MAKER',
    department: 'Fraud Prevention',
    isActive: true,
    createdAt: '2023-04-12T10:45:00Z',
    lastLogin: '2024-01-30T11:50:00Z',
  },
  {
    id: '6',
    username: 'charlie.davis',
    email: 'charlie.davis@fraudbank.com',
    firstName: 'Charlie',
    lastName: 'Davis',
    role: 'CHECKER',
    department: 'Audit',
    isActive: true,
    createdAt: '2023-05-20T09:00:00Z',
    lastLogin: '2024-01-30T10:15:00Z',
  },
  {
    id: '7',
    username: 'diana.miller',
    email: 'diana.miller@fraudbank.com',
    firstName: 'Diana',
    lastName: 'Miller',
    role: 'VIEWER',
    department: 'Analytics',
    isActive: true,
    createdAt: '2023-06-15T13:30:00Z',
    lastLogin: '2024-01-29T16:40:00Z',
  },
  {
    id: '8',
    username: 'edward.jones',
    email: 'edward.jones@fraudbank.com',
    firstName: 'Edward',
    lastName: 'Jones',
    role: 'MAKER',
    department: 'Risk Management',
    isActive: true,
    createdAt: '2023-07-08T11:00:00Z',
    lastLogin: '2024-01-29T14:25:00Z',
  },
  {
    id: '9',
    username: 'fiona.garcia',
    email: 'fiona.garcia@fraudbank.com',
    firstName: 'Fiona',
    lastName: 'Garcia',
    role: 'VIEWER',
    department: 'Reporting',
    isActive: true,
    createdAt: '2023-08-22T10:15:00Z',
    lastLogin: '2024-01-28T15:30:00Z',
  },
  {
    id: '10',
    username: 'george.martinez',
    email: 'george.martinez@fraudbank.com',
    firstName: 'George',
    lastName: 'Martinez',
    role: 'ADMIN',
    department: 'Fraud Prevention',
    isActive: false,
    createdAt: '2023-09-10T09:45:00Z',
    lastLogin: '2024-01-20T10:00:00Z',
  },
  {
    id: '11',
    username: 'hannah.lee',
    email: 'hannah.lee@fraudbank.com',
    firstName: 'Hannah',
    lastName: 'Lee',
    role: 'MAKER',
    department: 'Data Science',
    isActive: true,
    createdAt: '2023-10-05T14:00:00Z',
    lastLogin: '2024-01-30T09:45:00Z',
  },
  {
    id: '12',
    username: 'ian.thompson',
    email: 'ian.thompson@fraudbank.com',
    firstName: 'Ian',
    lastName: 'Thompson',
    role: 'VIEWER',
    department: 'Customer Support',
    isActive: false,
    createdAt: '2023-11-12T11:30:00Z',
    lastLogin: '2024-01-15T13:20:00Z',
  },
];

const roleColors: Record<UserRole, 'error' | 'warning' | 'info' | 'success' | 'primary'> = {
  SUPER_ADMIN: 'error',
  ADMIN: 'warning',
  MAKER: 'info',
  CHECKER: 'success',
  VIEWER: 'primary',
};

const UserManagement: React.FC = () => {
  const [users] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | 'view'>('view');

  // Form states for create/edit
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: 'VIEWER' as UserRole,
    department: '',
    isActive: true,
    password: '',
  });

  const handleView = (user: User) => {
    setSelectedUser(user);
    setDialogMode('view');
    setOpenDialog(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
      department: user.department,
      isActive: user.isActive,
      password: '',
    });
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      role: 'VIEWER',
      department: '',
      isActive: true,
      password: '',
    });
    setDialogMode('create');
    setOpenDialog(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    console.log('Delete user:', userToDelete?.username);
    alert(`User "${userToDelete?.username}" has been deleted successfully.`);
    setOpenDeleteDialog(false);
  };

  const handleSave = () => {
    if (dialogMode === 'create') {
      console.log('Create new user:', formData);
      alert(`User "${formData.username}" created successfully!\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nRole: ${formData.role}`);
    } else if (dialogMode === 'edit') {
      console.log('Save user changes:', formData);
      alert(`Changes saved for user "${formData.username}"!\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nRole: ${formData.role}`);
    }
    setOpenDialog(false);
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const columns: GridColDef[] = [
    {
      field: 'user',
      headerName: 'User',
      flex: 1,
      minWidth: 220,
      renderCell: (params) => (
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar sx={{ bgcolor: params.row.isActive ? 'primary.main' : 'grey.400' }}>
            {params.row.firstName[0]}
            {params.row.lastName[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={500}>
              {params.row.firstName} {params.row.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{params.row.username}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 140,
      renderCell: (params) => (
        <Chip
          label={params.value.replace('_', ' ')}
          size="small"
          color={roleColors[params.value as UserRole]}
        />
      ),
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 180,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      width: 180,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value
            ? new Date(params.value).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })
            : 'Never'}
        </Typography>
      ),
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <ActiveIcon /> : <BlockIcon />}
          label={params.value ? 'Active' : 'Inactive'}
          size="small"
          color={params.value ? 'success' : 'default'}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="View User">
            <IconButton size="small" onClick={() => handleView(params.row)} aria-label="View user">
              <PersonIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit User">
            <IconButton size="small" onClick={() => handleEdit(params.row)} aria-label="Edit user">
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(params.row)}
              aria-label="Delete user"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && user.isActive) ||
      (selectedStatus === 'inactive' && !user.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter((u) => u.isActive).length;
  const roleDistribution = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            User Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage users and permissions
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreate}>
          Add User
        </Button>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Total Users
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {filteredUsers.length}
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
              <Typography variant="h4" fontWeight={600} color="success.main">
                {activeUsers}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {((activeUsers / users.length) * 100).toFixed(0)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Admins
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {(roleDistribution['ADMIN'] || 0) + (roleDistribution['SUPER_ADMIN'] || 0)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Departments
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {new Set(users.map((u) => u.department)).size}
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                aria-label="Search users"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <MenuItem value="all">All Roles</MenuItem>
                <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="MAKER">Maker</MenuItem>
                <MenuItem value="CHECKER">Checker</MenuItem>
                <MenuItem value="VIEWER">Viewer</MenuItem>
              </TextField>
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
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <DataGrid
          rows={filteredUsers}
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

      {/* User Detail/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' && 'Create New User'}
          {dialogMode === 'edit' && `Edit User: ${selectedUser?.username}`}
          {dialogMode === 'view' && `User Details: ${selectedUser?.username}`}
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                      {selectedUser.firstName[0]}
                      {selectedUser.lastName[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {selectedUser.firstName} {selectedUser.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{selectedUser.username}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Email
                  </Typography>
                  {dialogMode === 'view' ? (
                    <Typography variant="body1">{selectedUser.email}</Typography>
                  ) : (
                    <TextField
                      fullWidth
                      value={formData.email}
                      onChange={(e) => handleFormChange('email', e.target.value)}
                      size="small"
                    />
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Role
                  </Typography>
                  {dialogMode === 'view' ? (
                    <Chip
                      label={selectedUser.role.replace('_', ' ')}
                      color={roleColors[selectedUser.role]}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      select
                      value={formData.role}
                      onChange={(e) => handleFormChange('role', e.target.value as UserRole)}
                      size="small"
                    >
                      <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                      <MenuItem value="ADMIN">Admin</MenuItem>
                      <MenuItem value="MAKER">Maker</MenuItem>
                      <MenuItem value="CHECKER">Checker</MenuItem>
                      <MenuItem value="VIEWER">Viewer</MenuItem>
                    </TextField>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Department
                  </Typography>
                  {dialogMode === 'view' ? (
                    <Typography variant="body1">{selectedUser.department}</Typography>
                  ) : (
                    <TextField
                      fullWidth
                      value={formData.department}
                      onChange={(e) => handleFormChange('department', e.target.value)}
                      size="small"
                    />
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Status
                  </Typography>
                  {dialogMode === 'view' ? (
                    <Chip
                      icon={selectedUser.isActive ? <ActiveIcon /> : <BlockIcon />}
                      label={selectedUser.isActive ? 'Active' : 'Inactive'}
                      color={selectedUser.isActive ? 'success' : 'default'}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      select
                      value={formData.isActive ? 'active' : 'inactive'}
                      onChange={(e) => handleFormChange('isActive', e.target.value === 'active')}
                      size="small"
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                    </TextField>
                  )}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Created At
                  </Typography>
                  <Typography variant="body1">
                    {new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Last Login
                  </Typography>
                  <Typography variant="body1">
                    {selectedUser.lastLogin
                      ? new Date(selectedUser.lastLogin).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Never'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {dialogMode === 'create' && (
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleFormChange('firstName', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleFormChange('lastName', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={formData.username}
                    onChange={(e) => handleFormChange('username', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Role"
                    value={formData.role}
                    onChange={(e) => handleFormChange('role', e.target.value as UserRole)}
                    size="small"
                  >
                    <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="MAKER">Maker</MenuItem>
                    <MenuItem value="CHECKER">Checker</MenuItem>
                    <MenuItem value="VIEWER">Viewer</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={formData.department}
                    onChange={(e) => handleFormChange('department', e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleFormChange('password', e.target.value)}
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            {dialogMode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {dialogMode !== 'view' && (
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={
                dialogMode === 'create' &&
                (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password)
              }
            >
              {dialogMode === 'create' ? 'Create User' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="sm">
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Are you sure you want to delete the user <strong>{userToDelete?.firstName} {userToDelete?.lastName}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Username: @{userToDelete?.username}
          </Typography>
          <Typography variant="body2" color="error.main">
            This action cannot be undone. The user will lose access to the system immediately.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
          >
            Delete User
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
