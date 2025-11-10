import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Tooltip,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Flag as FlagIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EfficacyMetrics, RulePerformance } from '../../types/index';
import { DOMAINS } from '../../constants/index';

// Comprehensive demo data for efficacy metrics
const mockEfficacyData: EfficacyMetrics[] = [
  {
    rulesetId: '1',
    rulesetName: 'High Risk Transaction Rules',
    domain: 'RETAIL',
    environment: 'PROD',
    period: {
      start: '2024-01-01T00:00:00Z',
      end: '2024-01-31T23:59:59Z',
    },
    metrics: {
      totalTransactions: 1250000,
      flaggedTransactions: 12450,
      blockedTransactions: 8320,
      truePositives: 7890,
      falsePositives: 430,
      trueNegatives: 1237550,
      falseNegatives: 130,
      precision: 0.9483,
      recall: 0.9838,
      f1Score: 0.9657,
      accuracy: 0.9955,
    },
    rulePerformance: [
      {
        ruleId: '1',
        ruleName: 'Large Amount Transaction',
        triggeredCount: 4520,
        truePositives: 4280,
        falsePositives: 240,
        precision: 0.9469,
        avgProcessingTime: 12.5,
      },
      {
        ruleId: '2',
        ruleName: 'Rapid Transaction Velocity',
        triggeredCount: 3230,
        truePositives: 3150,
        falsePositives: 80,
        precision: 0.9752,
        avgProcessingTime: 18.3,
      },
      {
        ruleId: '3',
        ruleName: 'New Account High Amount',
        triggeredCount: 2100,
        truePositives: 1980,
        falsePositives: 120,
        precision: 0.9429,
        avgProcessingTime: 15.7,
      },
    ],
  },
  {
    rulesetId: '2',
    rulesetName: 'Credit Card Fraud Detection',
    domain: 'CREDIT',
    environment: 'PROD',
    period: {
      start: '2024-01-01T00:00:00Z',
      end: '2024-01-31T23:59:59Z',
    },
    metrics: {
      totalTransactions: 980000,
      flaggedTransactions: 9820,
      blockedTransactions: 6540,
      truePositives: 6210,
      falsePositives: 330,
      trueNegatives: 970180,
      falseNegatives: 110,
      precision: 0.9496,
      recall: 0.9826,
      f1Score: 0.9658,
      accuracy: 0.9955,
    },
    rulePerformance: [
      {
        ruleId: '4',
        ruleName: 'Credit Limit Breach',
        triggeredCount: 3820,
        truePositives: 3720,
        falsePositives: 100,
        precision: 0.9738,
        avgProcessingTime: 10.2,
      },
      {
        ruleId: '5',
        ruleName: 'High Utilization Alert',
        triggeredCount: 4200,
        truePositives: 3950,
        falsePositives: 250,
        precision: 0.9405,
        avgProcessingTime: 14.8,
      },
    ],
  },
  {
    rulesetId: '3',
    rulesetName: 'Debit Card Security Rules',
    domain: 'DEBIT',
    environment: 'PROD',
    period: {
      start: '2024-01-01T00:00:00Z',
      end: '2024-01-31T23:59:59Z',
    },
    metrics: {
      totalTransactions: 750000,
      flaggedTransactions: 7280,
      blockedTransactions: 4890,
      truePositives: 4620,
      falsePositives: 270,
      trueNegatives: 742720,
      falseNegatives: 90,
      precision: 0.9448,
      recall: 0.9809,
      f1Score: 0.9625,
      accuracy: 0.9952,
    },
    rulePerformance: [
      {
        ruleId: '6',
        ruleName: 'ATM Withdrawal Velocity',
        triggeredCount: 2830,
        truePositives: 2710,
        falsePositives: 120,
        precision: 0.9576,
        avgProcessingTime: 16.4,
      },
      {
        ruleId: '7',
        ruleName: 'Cross-Border Transaction',
        triggeredCount: 3120,
        truePositives: 2980,
        falsePositives: 140,
        precision: 0.9551,
        avgProcessingTime: 19.7,
      },
    ],
  },
];

// Time-series data for trend visualization
const trendData = [
  { date: 'Week 1', precision: 0.942, recall: 0.978, f1Score: 0.960, flagged: 2850 },
  { date: 'Week 2', precision: 0.945, recall: 0.981, f1Score: 0.963, flagged: 3120 },
  { date: 'Week 3', precision: 0.948, recall: 0.984, f1Score: 0.966, flagged: 2980 },
  { date: 'Week 4', precision: 0.949, recall: 0.986, f1Score: 0.967, flagged: 3210 },
];

const EfficacyDashboard: React.FC = () => {
  const [selectedRuleset, setSelectedRuleset] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [openExportDialog, setOpenExportDialog] = useState(false);

  // Export dialog states
  const [exportFormat, setExportFormat] = useState('PDF');
  const [exportDateRange, setExportDateRange] = useState('30d');
  const [exportOptions, setExportOptions] = useState({
    includeMetrics: true,
    includeConfusionMatrix: true,
    includeTrends: true,
    includeRulesetPerformance: true,
    includeIndividualRules: true,
  });

  const handleExportReport = () => {
    setOpenExportDialog(true);
  };

  const handleConfirmExport = () => {
    const selectedOptions = Object.entries(exportOptions)
      .filter(([_, value]) => value)
      .map(([key]) => key.replace('include', ''))
      .join(', ');

    console.log('Exporting report:', {
      format: exportFormat,
      dateRange: exportDateRange,
      options: selectedOptions,
    });

    alert(`Efficacy Report Export\n\nFormat: ${exportFormat}\nDate Range: ${exportDateRange}\nIncluded Sections: ${selectedOptions}\n\nYour report is being generated and will download shortly!`);
    setOpenExportDialog(false);
  };

  const handleExportOptionChange = (option: string) => {
    setExportOptions(prev => ({ ...prev, [option]: !prev[option as keyof typeof prev] }));
  };

  const filteredData = mockEfficacyData.filter((efficacy) => {
    const matchesRuleset = selectedRuleset === 'all' || efficacy.rulesetId === selectedRuleset;
    const matchesDomain = selectedDomain === 'all' || efficacy.domain === selectedDomain;
    return matchesRuleset && matchesDomain;
  });

  // Calculate aggregate metrics
  const aggregateMetrics = filteredData.reduce(
    (acc, efficacy) => ({
      totalTransactions: acc.totalTransactions + efficacy.metrics.totalTransactions,
      flaggedTransactions: acc.flaggedTransactions + efficacy.metrics.flaggedTransactions,
      blockedTransactions: acc.blockedTransactions + efficacy.metrics.blockedTransactions,
      truePositives: acc.truePositives + efficacy.metrics.truePositives,
      falsePositives: acc.falsePositives + efficacy.metrics.falsePositives,
      trueNegatives: acc.trueNegatives + efficacy.metrics.trueNegatives,
      falseNegatives: acc.falseNegatives + efficacy.metrics.falseNegatives,
    }),
    {
      totalTransactions: 0,
      flaggedTransactions: 0,
      blockedTransactions: 0,
      truePositives: 0,
      falsePositives: 0,
      trueNegatives: 0,
      falseNegatives: 0,
    }
  );

  const aggregatePrecision =
    aggregateMetrics.truePositives / (aggregateMetrics.truePositives + aggregateMetrics.falsePositives);
  const aggregateRecall =
    aggregateMetrics.truePositives / (aggregateMetrics.truePositives + aggregateMetrics.falseNegatives);
  const aggregateF1 = (2 * aggregatePrecision * aggregateRecall) / (aggregatePrecision + aggregateRecall);
  const aggregateAccuracy =
    (aggregateMetrics.truePositives + aggregateMetrics.trueNegatives) / aggregateMetrics.totalTransactions;

  const falsePositiveRate = (aggregateMetrics.falsePositives / aggregateMetrics.flaggedTransactions) * 100;
  const falseNegativeRate =
    (aggregateMetrics.falseNegatives /
      (aggregateMetrics.truePositives + aggregateMetrics.falseNegatives)) *
    100;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Efficacy Monitoring
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Monitor ruleset performance and effectiveness
          </Typography>
        </Box>
        <Button variant="outlined" onClick={handleExportReport}>
          Export Report
        </Button>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Ruleset"
                value={selectedRuleset}
                onChange={(e) => setSelectedRuleset(e.target.value)}
              >
                <MenuItem value="all">All Rulesets</MenuItem>
                {mockEfficacyData.map((efficacy) => (
                  <MenuItem key={efficacy.rulesetId} value={efficacy.rulesetId}>
                    {efficacy.rulesetName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
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
            <Grid item xs={12} md={4}>
              <TextField fullWidth select label="Period" defaultValue="30d">
                <MenuItem value="7d">Last 7 Days</MenuItem>
                <MenuItem value="30d">Last 30 Days</MenuItem>
                <MenuItem value="90d">Last 90 Days</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Key Metrics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    Overall Accuracy
                  </Typography>
                  <Typography variant="h4" fontWeight={600}>
                    {(aggregateAccuracy * 100).toFixed(2)}%
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUpIcon fontSize="small" color="success" />
                    <Typography variant="caption" color="success.main" ml={0.5}>
                      +0.15% from last period
                    </Typography>
                  </Box>
                </Box>
                <SuccessIcon color="success" sx={{ fontSize: 48, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    Precision
                  </Typography>
                  <Typography variant="h4" fontWeight={600}>
                    {(aggregatePrecision * 100).toFixed(2)}%
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUpIcon fontSize="small" color="success" />
                    <Typography variant="caption" color="success.main" ml={0.5}>
                      +0.23% from last period
                    </Typography>
                  </Box>
                </Box>
                <FlagIcon color="primary" sx={{ fontSize: 48, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    Recall
                  </Typography>
                  <Typography variant="h4" fontWeight={600}>
                    {(aggregateRecall * 100).toFixed(2)}%
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUpIcon fontSize="small" color="success" />
                    <Typography variant="caption" color="success.main" ml={0.5}>
                      +0.18% from last period
                    </Typography>
                  </Box>
                </Box>
                <SuccessIcon color="info" sx={{ fontSize: 48, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    F1 Score
                  </Typography>
                  <Typography variant="h4" fontWeight={600}>
                    {(aggregateF1 * 100).toFixed(2)}%
                  </Typography>
                  <Box display="flex" alignItems="center" mt={1}>
                    <TrendingUpIcon fontSize="small" color="success" />
                    <Typography variant="caption" color="success.main" ml={0.5}>
                      +0.21% from last period
                    </Typography>
                  </Box>
                </Box>
                <BlockIcon color="secondary" sx={{ fontSize: 48, opacity: 0.3 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Transaction Statistics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Total Transactions
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {aggregateMetrics.totalTransactions.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Flagged Transactions
              </Typography>
              <Typography variant="h5" fontWeight={600}>
                {aggregateMetrics.flaggedTransactions.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {((aggregateMetrics.flaggedTransactions / aggregateMetrics.totalTransactions) * 100).toFixed(
                  2
                )}
                % of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                Blocked Transactions
              </Typography>
              <Typography variant="h5" fontWeight={600} color="error.main">
                {aggregateMetrics.blockedTransactions.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {((aggregateMetrics.blockedTransactions / aggregateMetrics.totalTransactions) * 100).toFixed(
                  2
                )}
                % of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" variant="body2" gutterBottom>
                True Positives
              </Typography>
              <Typography variant="h5" fontWeight={600} color="success.main">
                {aggregateMetrics.truePositives.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {((aggregateMetrics.truePositives / aggregateMetrics.flaggedTransactions) * 100).toFixed(2)}%
                of flagged
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Confusion Matrix */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Confusion Matrix
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="center">
                        <strong>Predicted Fraud</strong>
                      </TableCell>
                      <TableCell align="center">
                        <strong>Predicted Legitimate</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>Actual Fraud</strong>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`TP: ${aggregateMetrics.truePositives.toLocaleString()}`}
                          color="success"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`FN: ${aggregateMetrics.falseNegatives.toLocaleString()}`}
                          color="error"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Actual Legitimate</strong>
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`FP: ${aggregateMetrics.falsePositives.toLocaleString()}`}
                          color="warning"
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Chip
                          label={`TN: ${aggregateMetrics.trueNegatives.toLocaleString()}`}
                          color="info"
                          size="small"
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box mt={2}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  False Positive Rate: {falsePositiveRate.toFixed(2)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={falsePositiveRate}
                  color={falsePositiveRate < 5 ? 'success' : 'warning'}
                  sx={{ height: 8, borderRadius: 4 }}
                />
                <Typography variant="body2" color="text.secondary" gutterBottom mt={2}>
                  False Negative Rate: {falseNegativeRate.toFixed(2)}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={falseNegativeRate}
                  color={falseNegativeRate < 2 ? 'success' : 'warning'}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Performance Trends (Last 4 Weeks)
              </Typography>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0.9, 1.0]} />
                  <RechartsTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="precision" stroke="#1976d2" strokeWidth={2} />
                  <Line type="monotone" dataKey="recall" stroke="#2e7d32" strokeWidth={2} />
                  <Line type="monotone" dataKey="f1Score" stroke="#ed6c02" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Ruleset Performance Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Ruleset Performance Summary
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ruleset Name</TableCell>
                  <TableCell>Domain</TableCell>
                  <TableCell align="right">Total Transactions</TableCell>
                  <TableCell align="right">Flagged</TableCell>
                  <TableCell align="right">Precision</TableCell>
                  <TableCell align="right">Recall</TableCell>
                  <TableCell align="right">F1 Score</TableCell>
                  <TableCell align="right">Accuracy</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((efficacy) => (
                  <TableRow key={efficacy.rulesetId} hover>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {efficacy.rulesetName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={efficacy.domain} size="small" />
                    </TableCell>
                    <TableCell align="right">
                      {efficacy.metrics.totalTransactions.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {efficacy.metrics.flaggedTransactions.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <Typography variant="body2" mr={1}>
                          {(efficacy.metrics.precision * 100).toFixed(2)}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={efficacy.metrics.precision * 100}
                          color="primary"
                          sx={{ width: 50, height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <Typography variant="body2" mr={1}>
                          {(efficacy.metrics.recall * 100).toFixed(2)}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={efficacy.metrics.recall * 100}
                          color="success"
                          sx={{ width: 50, height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell align="right">{(efficacy.metrics.f1Score * 100).toFixed(2)}%</TableCell>
                    <TableCell align="right">{(efficacy.metrics.accuracy * 100).toFixed(2)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Individual Rule Performance */}
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Individual Rule Performance
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rule Name</TableCell>
                  <TableCell>Ruleset</TableCell>
                  <TableCell align="right">Triggered Count</TableCell>
                  <TableCell align="right">True Positives</TableCell>
                  <TableCell align="right">False Positives</TableCell>
                  <TableCell align="right">Precision</TableCell>
                  <TableCell align="right">Avg Processing Time (ms)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((efficacy) =>
                  efficacy.rulePerformance.map((rule) => (
                    <TableRow key={`${efficacy.rulesetId}-${rule.ruleId}`} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {rule.ruleName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="caption" color="text.secondary">
                          {efficacy.rulesetName}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{rule.triggeredCount.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={rule.truePositives.toLocaleString()}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={rule.falsePositives.toLocaleString()}
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                          <Typography variant="body2" mr={1}>
                            {(rule.precision * 100).toFixed(2)}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={rule.precision * 100}
                            color={rule.precision > 0.95 ? 'success' : 'primary'}
                            sx={{ width: 60, height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Average time to evaluate this rule">
                          <Chip
                            label={`${rule.avgProcessingTime.toFixed(1)}ms`}
                            size="small"
                            color={rule.avgProcessingTime < 15 ? 'success' : 'warning'}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Export Report Dialog */}
      <Dialog open={openExportDialog} onClose={() => setOpenExportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Export Efficacy Report</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Export Format"
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
              >
                <MenuItem value="PDF">PDF Document</MenuItem>
                <MenuItem value="CSV">CSV Spreadsheet</MenuItem>
                <MenuItem value="EXCEL">Excel Workbook</MenuItem>
                <MenuItem value="JSON">JSON Data</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Date Range"
                value={exportDateRange}
                onChange={(e) => setExportDateRange(e.target.value)}
              >
                <MenuItem value="7d">Last 7 Days</MenuItem>
                <MenuItem value="30d">Last 30 Days</MenuItem>
                <MenuItem value="90d">Last 90 Days</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Include in Report
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeMetrics}
                      onChange={() => handleExportOptionChange('includeMetrics')}
                    />
                  }
                  label="Key Performance Metrics"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeConfusionMatrix}
                      onChange={() => handleExportOptionChange('includeConfusionMatrix')}
                    />
                  }
                  label="Confusion Matrix"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeTrends}
                      onChange={() => handleExportOptionChange('includeTrends')}
                    />
                  }
                  label="Performance Trends"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeRulesetPerformance}
                      onChange={() => handleExportOptionChange('includeRulesetPerformance')}
                    />
                  }
                  label="Ruleset Performance Summary"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={exportOptions.includeIndividualRules}
                      onChange={() => handleExportOptionChange('includeIndividualRules')}
                    />
                  }
                  label="Individual Rule Performance"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="text.secondary">
                The report will be generated based on your current filter selections (Ruleset: {selectedRuleset === 'all' ? 'All' : mockEfficacyData.find(e => e.rulesetId === selectedRuleset)?.rulesetName}, Domain: {selectedDomain === 'all' ? 'All' : selectedDomain}).
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExportDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleConfirmExport}
            disabled={!Object.values(exportOptions).some(v => v)}
          >
            Export Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EfficacyDashboard;
