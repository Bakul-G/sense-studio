import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Rule as RuleIcon,
  CheckCircle,
  Warning,
  Block,
  MoreVert,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Demo data
const fraudTrendData = [
  { month: 'Jan', fraudDetected: 245, falsePositives: 12 },
  { month: 'Feb', fraudDetected: 278, falsePositives: 15 },
  { month: 'Mar', fraudDetected: 312, falsePositives: 18 },
  { month: 'Apr', fraudDetected: 289, falsePositives: 14 },
  { month: 'May', fraudDetected: 325, falsePositives: 16 },
  { month: 'Jun', fraudDetected: 298, falsePositives: 13 },
];

const domainDistribution = [
  { name: 'Retail', value: 45, color: '#2196f3' },
  { name: 'Credit', value: 35, color: '#4caf50' },
  { name: 'Debit', value: 20, color: '#ff9800' },
];

const recentAlerts = [
  {
    id: '1',
    ruleName: 'High Value Transaction',
    domain: 'RETAIL',
    severity: 'HIGH',
    timestamp: '2 mins ago',
  },
  {
    id: '2',
    ruleName: 'Multiple Failed Attempts',
    domain: 'CREDIT',
    severity: 'MEDIUM',
    timestamp: '15 mins ago',
  },
  {
    id: '3',
    ruleName: 'Unusual Location',
    domain: 'DEBIT',
    severity: 'HIGH',
    timestamp: '23 mins ago',
  },
];

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactElement;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  const isPositive = change >= 0;

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography color="text.secondary" variant="body2" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight={600}>
              {value}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
              {isPositive ? (
                <TrendingUp fontSize="small" sx={{ color: 'success.main', mr: 0.5 }} />
              ) : (
                <TrendingDown fontSize="small" sx={{ color: 'error.main', mr: 0.5 }} />
              )}
              <Typography
                variant="body2"
                sx={{ color: isPositive ? 'success.main' : 'error.main' }}
              >
                {Math.abs(change)}% vs last month
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: color,
              borderRadius: 2,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={600} gutterBottom>
        Fraud Detection Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Real-time monitoring and analytics
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Rules"
            value={248}
            change={5.2}
            icon={<RuleIcon sx={{ color: 'white' }} />}
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Fraud Detected"
            value={325}
            change={-8.1}
            icon={<Warning sx={{ color: 'white' }} />}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Blocked Transactions"
            value={156}
            change={12.5}
            icon={<Block sx={{ color: 'white' }} />}
            color="#f44336"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Approvals"
            value={5}
            change={0}
            icon={<CheckCircle sx={{ color: 'white' }} />}
            color="#4caf50"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Fraud Detection Trend */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Fraud Detection Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={fraudTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="fraudDetected"
                    stroke="#f44336"
                    strokeWidth={2}
                    name="Fraud Detected"
                  />
                  <Line
                    type="monotone"
                    dataKey="falsePositives"
                    stroke="#ff9800"
                    strokeWidth={2}
                    name="False Positives"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Domain Distribution */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Fraud by Domain
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={domainDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {domainDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Alerts */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Fraud Alerts
              </Typography>
              <Box>
                {recentAlerts.map((alert) => (
                  <Box
                    key={alert.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      py: 2,
                      borderBottom: '1px solid #f0f0f0',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {alert.ruleName}
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                        <Chip label={alert.domain} size="small" />
                        <Chip
                          label={alert.severity}
                          size="small"
                          color={alert.severity === 'HIGH' ? 'error' : 'warning'}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {alert.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton size="small" aria-label="more options">
                      <MoreVert />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* System Health */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Health
              </Typography>
              <Box mt={2}>
                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Rule Engine Performance</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      98%
                    </Typography>
                  </Box>
                  <LinearProgress variant="determinate" value={98} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">Model Accuracy</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      95%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={95}
                    sx={{ height: 8, borderRadius: 4 }}
                    color="success"
                  />
                </Box>
                <Box>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="body2">API Response Time</Typography>
                    <Typography variant="body2" fontWeight={600}>
                      85%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={85}
                    sx={{ height: 8, borderRadius: 4 }}
                    color="warning"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
