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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  CloudUpload as DeployIcon,
  MoreVert as MoreVertIcon,
  FileCopy as CopyIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataDictionary, DataField } from '../../types/index';
import { DOMAINS, ENVIRONMENTS } from '../../constants/index';

// Comprehensive Mock Data Dictionaries
const mockDataDictionaries: DataDictionary[] = [
  // ==================== RETAIL DOMAIN ====================
  {
    id: 'dd_retail_v3',
    name: 'Retail Transaction Data Dictionary',
    description: 'Complete data dictionary for retail banking transactions including merchant and customer data',
    domain: 'RETAIL',
    version: 3,
    status: 'ACTIVE',
    createdBy: 'system',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-03-20T14:30:00Z',
    deployedEnvironments: ['DEV', 'STAGING', 'PROD'],
    fields: [
      {
        id: 'ret_001',
        name: 'transaction_amount',
        displayName: 'Transaction Amount',
        description: 'The monetary value of the retail transaction in USD',
        dataType: 'DECIMAL',
        source: 'RETAIL_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        defaultValue: '0.00',
        validationRules: [
          { type: 'RANGE', value: '0-1000000', errorMessage: 'Amount must be between 0 and 1,000,000' }
        ],
      },
      {
        id: 'ret_002',
        name: 'transaction_id',
        displayName: 'Transaction ID',
        description: 'Unique identifier for the retail transaction',
        dataType: 'STRING',
        source: 'RETAIL_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        validationRules: [
          { type: 'REGEX', value: '^RTL[0-9]{10}$', errorMessage: 'Must be in format RTL followed by 10 digits' }
        ],
      },
      {
        id: 'ret_003',
        name: 'transaction_timestamp',
        displayName: 'Transaction Timestamp',
        description: 'Date and time when the retail transaction occurred',
        dataType: 'DATE',
        source: 'RETAIL_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
      },
      {
        id: 'ret_004',
        name: 'merchant_id',
        displayName: 'Merchant ID',
        description: 'Unique identifier for the retail merchant',
        dataType: 'STRING',
        source: 'MERCHANT_TABLE',
        category: 'Merchant',
        isNullable: false,
      },
      {
        id: 'ret_005',
        name: 'merchant_category_code',
        displayName: 'Merchant Category Code',
        description: 'MCC code categorizing the type of merchant business',
        dataType: 'STRING',
        source: 'MERCHANT_TABLE',
        category: 'Merchant',
        isNullable: false,
        validationRules: [
          { type: 'REGEX', value: '^[0-9]{4}$', errorMessage: 'Must be a 4-digit code' }
        ],
      },
      {
        id: 'ret_006',
        name: 'merchant_location',
        displayName: 'Merchant Location',
        description: 'Geographic location of the merchant (city, state, country)',
        dataType: 'STRING',
        source: 'MERCHANT_TABLE',
        category: 'Merchant',
        isNullable: true,
      },
      {
        id: 'ret_007',
        name: 'customer_id',
        displayName: 'Customer ID',
        description: 'Unique identifier for the retail customer',
        dataType: 'STRING',
        source: 'CUSTOMER_TABLE',
        category: 'Customer',
        isNullable: false,
      },
      {
        id: 'ret_008',
        name: 'customer_risk_score',
        displayName: 'Customer Risk Score',
        description: 'Risk score assigned to customer based on historical behavior (0-100)',
        dataType: 'NUMBER',
        source: 'RISK_SCORING_ENGINE',
        category: 'Risk',
        isNullable: true,
        defaultValue: '50',
        validationRules: [
          { type: 'RANGE', value: '0-100', errorMessage: 'Score must be between 0 and 100' }
        ],
      },
      {
        id: 'ret_009',
        name: 'transaction_count_24h',
        displayName: 'Transaction Count (24h)',
        description: 'Number of transactions by customer in the last 24 hours',
        dataType: 'NUMBER',
        source: 'CALCULATED',
        category: 'Velocity',
        isNullable: true,
        defaultValue: '0',
      },
      {
        id: 'ret_010',
        name: 'avg_transaction_amount',
        displayName: 'Average Transaction Amount',
        description: 'Average transaction amount for customer over last 30 days',
        dataType: 'DECIMAL',
        source: 'CALCULATED',
        category: 'Analytics',
        isNullable: true,
      },
      {
        id: 'ret_011',
        name: 'is_first_purchase',
        displayName: 'Is First Purchase',
        description: 'Indicates if this is the customer\'s first transaction',
        dataType: 'BOOLEAN',
        source: 'CALCULATED',
        category: 'Customer',
        isNullable: false,
        defaultValue: 'false',
      },
      {
        id: 'ret_012',
        name: 'payment_method',
        displayName: 'Payment Method',
        description: 'Method of payment used for the transaction',
        dataType: 'ENUM',
        source: 'RETAIL_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        enumValues: ['CARD', 'CASH', 'DIGITAL_WALLET', 'CHECK', 'GIFT_CARD'],
      },
    ],
  },
  {
    id: 'dd_retail_v2',
    name: 'Retail Transaction Data Dictionary',
    description: 'Previous version of retail data dictionary',
    domain: 'RETAIL',
    version: 2,
    status: 'DEPRECATED',
    createdBy: 'system',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-02-15T10:00:00Z',
    deployedEnvironments: [],
    fields: [
      {
        id: 'ret_001',
        name: 'transaction_amount',
        displayName: 'Transaction Amount',
        description: 'The monetary value of the retail transaction',
        dataType: 'DECIMAL',
        source: 'RETAIL_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        defaultValue: '0.00',
      },
      // ... fewer fields than v3
    ],
  },

  // ==================== CREDIT DOMAIN ====================
  {
    id: 'dd_credit_v4',
    name: 'Credit Card Data Dictionary',
    description: 'Comprehensive data dictionary for credit card transactions and account management',
    domain: 'CREDIT',
    version: 4,
    status: 'ACTIVE',
    createdBy: 'security.team',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-03-22T15:00:00Z',
    deployedEnvironments: ['DEV', 'STAGING', 'PROD'],
    fields: [
      {
        id: 'crd_001',
        name: 'card_number',
        displayName: 'Card Number',
        description: 'Masked credit card number (last 4 digits)',
        dataType: 'STRING',
        source: 'CREDIT_CARD_TABLE',
        category: 'Card',
        isNullable: false,
        validationRules: [
          { type: 'REGEX', value: '^\\*{12}[0-9]{4}$', errorMessage: 'Must be masked with last 4 digits' }
        ],
      },
      {
        id: 'crd_002',
        name: 'card_type',
        displayName: 'Card Type',
        description: 'Type of credit card (Visa, Mastercard, Amex, etc.)',
        dataType: 'ENUM',
        source: 'CREDIT_CARD_TABLE',
        category: 'Card',
        isNullable: false,
        enumValues: ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER', 'DINERS', 'JCB'],
      },
      {
        id: 'crd_003',
        name: 'credit_limit',
        displayName: 'Credit Limit',
        description: 'Total credit limit on the card',
        dataType: 'DECIMAL',
        source: 'CREDIT_CARD_TABLE',
        category: 'Account',
        isNullable: false,
        validationRules: [
          { type: 'RANGE', value: '100-100000', errorMessage: 'Credit limit must be between 100 and 100,000' }
        ],
      },
      {
        id: 'crd_004',
        name: 'available_credit',
        displayName: 'Available Credit',
        description: 'Remaining available credit on the card',
        dataType: 'DECIMAL',
        source: 'CREDIT_CARD_TABLE',
        category: 'Account',
        isNullable: false,
      },
      {
        id: 'crd_005',
        name: 'current_balance',
        displayName: 'Current Balance',
        description: 'Current outstanding balance on the credit card',
        dataType: 'DECIMAL',
        source: 'CREDIT_CARD_TABLE',
        category: 'Account',
        isNullable: false,
        defaultValue: '0.00',
      },
      {
        id: 'crd_006',
        name: 'credit_utilization',
        displayName: 'Credit Utilization',
        description: 'Percentage of credit limit currently utilized (0-100)',
        dataType: 'DECIMAL',
        source: 'CALCULATED',
        category: 'Analytics',
        isNullable: true,
        validationRules: [
          { type: 'RANGE', value: '0-100', errorMessage: 'Utilization must be between 0 and 100' }
        ],
      },
      {
        id: 'crd_007',
        name: 'transaction_amount',
        displayName: 'Transaction Amount',
        description: 'Amount charged to the credit card',
        dataType: 'DECIMAL',
        source: 'CREDIT_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        defaultValue: '0.00',
        validationRules: [
          { type: 'RANGE', value: '0-50000', errorMessage: 'Amount must be between 0 and 50,000' }
        ],
      },
      {
        id: 'crd_008',
        name: 'transaction_type',
        displayName: 'Transaction Type',
        description: 'Type of credit card transaction',
        dataType: 'ENUM',
        source: 'CREDIT_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        enumValues: ['PURCHASE', 'CASH_ADVANCE', 'BALANCE_TRANSFER', 'PAYMENT', 'FEE', 'REFUND'],
      },
      {
        id: 'crd_009',
        name: 'is_international',
        displayName: 'Is International',
        description: 'Indicates if transaction occurred outside home country',
        dataType: 'BOOLEAN',
        source: 'CREDIT_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        defaultValue: 'false',
      },
      {
        id: 'crd_010',
        name: 'cvv_match',
        displayName: 'CVV Match',
        description: 'Indicates if CVV code matched during transaction',
        dataType: 'BOOLEAN',
        source: 'CREDIT_TRANSACTION_TABLE',
        category: 'Security',
        isNullable: true,
      },
      {
        id: 'crd_011',
        name: 'avs_match',
        displayName: 'AVS Match',
        description: 'Address verification system match result',
        dataType: 'ENUM',
        source: 'CREDIT_TRANSACTION_TABLE',
        category: 'Security',
        isNullable: true,
        enumValues: ['FULL_MATCH', 'PARTIAL_MATCH', 'NO_MATCH', 'NOT_AVAILABLE'],
      },
      {
        id: 'crd_012',
        name: 'days_since_last_transaction',
        displayName: 'Days Since Last Transaction',
        description: 'Number of days since the cardholder\'s last transaction',
        dataType: 'NUMBER',
        source: 'CALCULATED',
        category: 'Velocity',
        isNullable: true,
      },
      {
        id: 'crd_013',
        name: 'account_age_days',
        displayName: 'Account Age (Days)',
        description: 'Number of days since the credit card account was opened',
        dataType: 'NUMBER',
        source: 'CALCULATED',
        category: 'Account',
        isNullable: false,
      },
    ],
  },
  {
    id: 'dd_credit_v3',
    name: 'Credit Card Data Dictionary',
    description: 'Previous version of credit card data dictionary',
    domain: 'CREDIT',
    version: 3,
    status: 'DEPRECATED',
    createdBy: 'security.team',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-02-28T12:00:00Z',
    deployedEnvironments: [],
    fields: [],
  },

  // ==================== DEBIT DOMAIN ====================
  {
    id: 'dd_debit_v3',
    name: 'Debit Card & Account Data Dictionary',
    description: 'Complete data dictionary for debit card transactions and bank account operations',
    domain: 'DEBIT',
    version: 3,
    status: 'ACTIVE',
    createdBy: 'system',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-03-15T13:00:00Z',
    deployedEnvironments: ['DEV', 'STAGING', 'PROD'],
    fields: [
      {
        id: 'dbt_001',
        name: 'account_number',
        displayName: 'Account Number',
        description: 'Masked bank account number (last 4 digits)',
        dataType: 'STRING',
        source: 'BANK_ACCOUNT_TABLE',
        category: 'Account',
        isNullable: false,
        validationRules: [
          { type: 'REGEX', value: '^\\*{8}[0-9]{4}$', errorMessage: 'Must be masked with last 4 digits' }
        ],
      },
      {
        id: 'dbt_002',
        name: 'account_type',
        displayName: 'Account Type',
        description: 'Type of bank account',
        dataType: 'ENUM',
        source: 'BANK_ACCOUNT_TABLE',
        category: 'Account',
        isNullable: false,
        enumValues: ['CHECKING', 'SAVINGS', 'MONEY_MARKET', 'BUSINESS_CHECKING'],
      },
      {
        id: 'dbt_003',
        name: 'current_balance',
        displayName: 'Current Balance',
        description: 'Current balance in the bank account',
        dataType: 'DECIMAL',
        source: 'BANK_ACCOUNT_TABLE',
        category: 'Account',
        isNullable: false,
        defaultValue: '0.00',
      },
      {
        id: 'dbt_004',
        name: 'available_balance',
        displayName: 'Available Balance',
        description: 'Available balance after pending transactions',
        dataType: 'DECIMAL',
        source: 'BANK_ACCOUNT_TABLE',
        category: 'Account',
        isNullable: false,
        defaultValue: '0.00',
      },
      {
        id: 'dbt_005',
        name: 'overdraft_protection',
        displayName: 'Overdraft Protection',
        description: 'Indicates if account has overdraft protection enabled',
        dataType: 'BOOLEAN',
        source: 'BANK_ACCOUNT_TABLE',
        category: 'Account',
        isNullable: false,
        defaultValue: 'false',
      },
      {
        id: 'dbt_006',
        name: 'transaction_amount',
        displayName: 'Transaction Amount',
        description: 'Amount of the debit transaction',
        dataType: 'DECIMAL',
        source: 'DEBIT_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        defaultValue: '0.00',
        validationRules: [
          { type: 'RANGE', value: '0-25000', errorMessage: 'Amount must be between 0 and 25,000' }
        ],
      },
      {
        id: 'dbt_007',
        name: 'transaction_type',
        displayName: 'Transaction Type',
        description: 'Type of debit transaction',
        dataType: 'ENUM',
        source: 'DEBIT_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: false,
        enumValues: ['PURCHASE', 'ATM_WITHDRAWAL', 'ACH_DEBIT', 'WIRE_TRANSFER', 'CHECK', 'BILL_PAY', 'DEPOSIT'],
      },
      {
        id: 'dbt_008',
        name: 'pin_verified',
        displayName: 'PIN Verified',
        description: 'Indicates if PIN was verified for the transaction',
        dataType: 'BOOLEAN',
        source: 'DEBIT_TRANSACTION_TABLE',
        category: 'Security',
        isNullable: true,
      },
      {
        id: 'dbt_009',
        name: 'atm_id',
        displayName: 'ATM ID',
        description: 'Unique identifier for the ATM used (if applicable)',
        dataType: 'STRING',
        source: 'DEBIT_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: true,
      },
      {
        id: 'dbt_010',
        name: 'is_own_atm',
        displayName: 'Is Own ATM',
        description: 'Indicates if ATM belongs to the card issuing bank',
        dataType: 'BOOLEAN',
        source: 'ATM_TABLE',
        category: 'Transaction',
        isNullable: true,
      },
      {
        id: 'dbt_011',
        name: 'daily_withdrawal_count',
        displayName: 'Daily Withdrawal Count',
        description: 'Number of withdrawals from the account today',
        dataType: 'NUMBER',
        source: 'CALCULATED',
        category: 'Velocity',
        isNullable: true,
        defaultValue: '0',
      },
      {
        id: 'dbt_012',
        name: 'daily_withdrawal_amount',
        displayName: 'Daily Withdrawal Amount',
        description: 'Total amount withdrawn from the account today',
        dataType: 'DECIMAL',
        source: 'CALCULATED',
        category: 'Velocity',
        isNullable: true,
        defaultValue: '0.00',
      },
      {
        id: 'dbt_013',
        name: 'avg_daily_balance',
        displayName: 'Average Daily Balance',
        description: 'Average account balance over the last 30 days',
        dataType: 'DECIMAL',
        source: 'CALCULATED',
        category: 'Analytics',
        isNullable: true,
      },
      {
        id: 'dbt_014',
        name: 'transaction_location',
        displayName: 'Transaction Location',
        description: 'Geographic location where transaction occurred',
        dataType: 'STRING',
        source: 'DEBIT_TRANSACTION_TABLE',
        category: 'Transaction',
        isNullable: true,
      },
      {
        id: 'dbt_015',
        name: 'distance_from_home',
        displayName: 'Distance from Home',
        description: 'Distance in miles from account holder\'s home address',
        dataType: 'DECIMAL',
        source: 'CALCULATED',
        category: 'Risk',
        isNullable: true,
      },
    ],
  },
  {
    id: 'dd_debit_v2',
    name: 'Debit Card & Account Data Dictionary',
    description: 'Previous version of debit data dictionary',
    domain: 'DEBIT',
    version: 2,
    status: 'DEPRECATED',
    createdBy: 'system',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-02-10T10:00:00Z',
    deployedEnvironments: [],
    fields: [],
  },
];

const DataDictionaryList: React.FC = () => {
  const navigate = useNavigate();
  const [dictionaries, setDictionaries] = useState<DataDictionary[]>(mockDataDictionaries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDictionary, setSelectedDictionary] = useState<string | null>(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeployDialog, setOpenDeployDialog] = useState(false);
  const [viewDictionary, setViewDictionary] = useState<DataDictionary | null>(null);
  const [editDictionary, setEditDictionary] = useState<DataDictionary | null>(null);
  const [deployDictionary, setDeployDictionary] = useState<DataDictionary | null>(null);
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, dictionaryId: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedDictionary(dictionaryId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedDictionary(null);
  };

  const handleView = (id: string) => {
    const dictionary = dictionaries.find((d) => d.id === id);
    if (dictionary) {
      setViewDictionary(dictionary);
      setOpenViewDialog(true);
    }
    handleMenuClose();
  };

  const handleEdit = (id: string) => {
    const dictionary = dictionaries.find((d) => d.id === id);
    if (dictionary) {
      setEditDictionary(dictionary);
      setOpenEditDialog(true);
    }
    handleMenuClose();
  };

  const handleDeploy = (id: string) => {
    const dictionary = dictionaries.find((d) => d.id === id);
    if (dictionary) {
      setDeployDictionary(dictionary);
      setSelectedEnvironments(dictionary.deployedEnvironments);
      setOpenDeployDialog(true);
    }
    handleMenuClose();
  };

  const handleSaveEdit = () => {
    console.log('Saving dictionary:', editDictionary?.name);
    alert(`Dictionary "${editDictionary?.name}" saved successfully!`);
    setOpenEditDialog(false);
  };

  const handleConfirmDeploy = () => {
    console.log('Deploying dictionary:', deployDictionary?.name, 'to:', selectedEnvironments);
    alert(`Dictionary "${deployDictionary?.name}" deployed to: ${selectedEnvironments.join(', ')}`);
    setOpenDeployDialog(false);
  };

  const handleCopyVersion = (id: string) => {
    const dictionary = dictionaries.find((d) => d.id === id);
    console.log('Copy dictionary version:', id);
    alert(`Create New Version: ${dictionary?.name}\n\nCurrent Version: v${dictionary?.version}\nNew Version: v${(dictionary?.version || 0) + 1}\n\nThis would create a new version of the dictionary in a real application.`);
    handleMenuClose();
  };

  const handleDelete = (id: string) => {
    const dictionary = dictionaries.find((d) => d.id === id);
    console.log('Delete dictionary:', id);
    alert(`Delete Data Dictionary: ${dictionary?.name}\n\nVersion: v${dictionary?.version}\n\nThis would delete the dictionary and all its field definitions in a real application.`);
    handleMenuClose();
  };

  const handleCreateNew = () => {
    console.log('Create new dictionary');
    alert('Create New Data Dictionary\n\nThis would open a dialog to create a new data dictionary with:\n- Name\n- Description\n- Domain (Retail/Credit/Debit)\n- Initial field definitions\n\nFor now, you can explore existing dictionaries by clicking on them.');
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Dictionary Name',
      flex: 1,
      minWidth: 250,
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
      width: 120,
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
        <Chip label={`v${params.value}`} size="small" color="info" />
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
          color={params.value === 'ACTIVE' ? 'success' : params.value === 'DEPRECATED' ? 'warning' : 'default'}
        />
      ),
    },
    {
      field: 'fields',
      headerName: 'Fields',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value.length}
          size="small"
          variant="outlined"
        />
      ),
    },
    {
      field: 'deployedEnvironments',
      headerName: 'Deployed',
      width: 200,
      renderCell: (params) => (
        <Box display="flex" gap={0.5}>
          {params.value.length > 0 ? (
            params.value.map((env: string) => {
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
            })
          ) : (
            <Typography variant="caption" color="text.secondary">
              Not deployed
            </Typography>
          )}
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
          aria-label="dictionary actions"
        >
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const filteredDictionaries = dictionaries.filter((dictionary) => {
    const matchesSearch =
      dictionary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dictionary.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === 'all' || dictionary.domain === selectedDomain;
    const matchesStatus =
      selectedStatus === 'all' || dictionary.status === selectedStatus;
    return matchesSearch && matchesDomain && matchesStatus;
  });

  // Summary stats
  const stats = {
    total: dictionaries.filter(d => d.status === 'ACTIVE').length,
    retail: dictionaries.filter(d => d.domain === 'RETAIL' && d.status === 'ACTIVE').length,
    credit: dictionaries.filter(d => d.domain === 'CREDIT' && d.status === 'ACTIVE').length,
    debit: dictionaries.filter(d => d.domain === 'DEBIT' && d.status === 'ACTIVE').length,
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Data Dictionary Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage versioned data dictionaries for all domains
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          aria-label="Create new dictionary"
        >
          New Dictionary
        </Button>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Active Dictionaries
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {stats.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Retail Domain
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {stats.retail}
              </Typography>
              <Chip label="RETAIL" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Credit Domain
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {stats.credit}
              </Typography>
              <Chip label="CREDIT" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Debit Domain
              </Typography>
              <Typography variant="h4" fontWeight={600}>
                {stats.debit}
              </Typography>
              <Chip label="DEBIT" size="small" sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search dictionaries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                aria-label="Search dictionaries"
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
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="DEPRECATED">Deprecated</MenuItem>
                <MenuItem value="DRAFT">Draft</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <DataGrid
          rows={filteredDictionaries}
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
        <MenuItem onClick={() => selectedDictionary && handleView(selectedDictionary)}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedDictionary && handleEdit(selectedDictionary)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedDictionary && handleCopyVersion(selectedDictionary)}>
          <ListItemIcon>
            <CopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Create New Version</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedDictionary && handleDeploy(selectedDictionary)}>
          <ListItemIcon>
            <DeployIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Deploy</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedDictionary && handleDelete(selectedDictionary)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      {/* View Dictionary Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6">{viewDictionary?.name}</Typography>
              <Box display="flex" gap={1} mt={1}>
                <Chip label={`v${viewDictionary?.version}`} size="small" color="info" />
                <Chip
                  label={viewDictionary?.status}
                  size="small"
                  color={viewDictionary?.status === 'ACTIVE' ? 'success' : 'warning'}
                />
                <Chip label={viewDictionary?.domain} size="small" />
              </Box>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph>
            {viewDictionary?.description}
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={6} md={3}>
              <Typography variant="caption" color="text.secondary">Created By</Typography>
              <Typography variant="body2" fontWeight={500}>{viewDictionary?.createdBy}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="caption" color="text.secondary">Total Fields</Typography>
              <Typography variant="body2" fontWeight={500}>{viewDictionary?.fields.length}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" color="text.secondary">Deployed Environments</Typography>
              <Box display="flex" gap={0.5} mt={0.5}>
                {viewDictionary?.deployedEnvironments.map(env => (
                  <Chip key={env} label={env} size="small" color="primary" />
                ))}
              </Box>
            </Grid>
          </Grid>

          <Typography variant="h6" gutterBottom>Fields ({viewDictionary?.fields.length})</Typography>
          <Card>
            <DataGrid
              rows={viewDictionary?.fields || []}
              columns={[
                {
                  field: 'name',
                  headerName: 'Field Name',
                  flex: 1,
                  minWidth: 150,
                  renderCell: (params) => (
                    <Typography variant="body2" fontFamily="monospace">
                      {params.value}
                    </Typography>
                  ),
                },
                {
                  field: 'displayName',
                  headerName: 'Display Name',
                  flex: 1,
                  minWidth: 150,
                },
                {
                  field: 'dataType',
                  headerName: 'Type',
                  width: 100,
                  renderCell: (params) => (
                    <Chip label={params.value} size="small" variant="outlined" />
                  ),
                },
                {
                  field: 'category',
                  headerName: 'Category',
                  width: 120,
                },
                {
                  field: 'isNullable',
                  headerName: 'Nullable',
                  width: 100,
                  renderCell: (params) => (
                    <Chip
                      label={params.value ? 'Yes' : 'No'}
                      size="small"
                      color={params.value ? 'default' : 'success'}
                    />
                  ),
                },
                {
                  field: 'source',
                  headerName: 'Source',
                  flex: 1,
                  minWidth: 150,
                },
              ]}
              autoHeight
              pageSizeOptions={[10, 25, 50]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              sx={{ border: 'none' }}
            />
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
          <Button variant="outlined" onClick={() => {
            setOpenViewDialog(false);
            if (viewDictionary) handleEdit(viewDictionary.id);
          }}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dictionary Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Data Dictionary</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dictionary Name"
                defaultValue={editDictionary?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                defaultValue={editDictionary?.description}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Domain"
                defaultValue={editDictionary?.domain}
              >
                {DOMAINS.map((domain) => (
                  <MenuItem key={domain.value} value={domain.value}>
                    {domain.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                select
                label="Status"
                defaultValue={editDictionary?.status}
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="DEPRECATED">Deprecated</MenuItem>
                <MenuItem value="DRAFT">Draft</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                This dictionary contains {editDictionary?.fields.length} fields. To modify fields, use the field editor.
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

      {/* Deploy Dictionary Dialog */}
      <Dialog open={openDeployDialog} onClose={() => setOpenDeployDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Deploy Data Dictionary</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            Deploy <strong>{deployDictionary?.name}</strong> (v{deployDictionary?.version}) to selected environments:
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
                        {deployDictionary?.deployedEnvironments.includes(env.value) ? 'Currently deployed' : 'Not deployed'}
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

export default DataDictionaryList;
