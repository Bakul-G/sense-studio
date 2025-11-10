import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Grid,
  IconButton,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Add as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DOMAINS, OPERATORS, ACTION_TYPES } from '../../constants/index';

const validationSchema = yup.object({
  name: yup.string().required('Rule name is required'),
  description: yup.string().required('Description is required'),
  domain: yup.string().required('Domain is required'),
  priority: yup.number().required('Priority is required').min(1),
});

const RuleEditor: React.FC = () => {
  const { rulesetId, ruleId } = useParams<{ rulesetId: string; ruleId?: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(ruleId);

  const [conditions, setConditions] = useState([
    { field: '', operator: 'EQUALS', value: '' },
  ]);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      domain: 'RETAIL',
      priority: 1,
      actionType: 'BLOCK',
      actionReason: '',
      score: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log('Submit rule:', values, conditions);
      // Implement save logic
      navigate(`/rulesets/${rulesetId}`);
    },
  });

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: 'EQUALS', value: '' }]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, field: string, value: any) => {
    const newConditions = [...conditions];
    newConditions[index] = { ...newConditions[index], [field]: value };
    setConditions(newConditions);
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate(`/rulesets/${rulesetId}`)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" fontWeight={600}>
          {isEditMode ? 'Edit Rule' : 'Create New Rule'}
        </Typography>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Rule Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      required
                      inputProps={{ 'aria-required': 'true' }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Description"
                      multiline
                      rows={3}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description}
                      required
                      inputProps={{ 'aria-required': 'true' }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      id="domain"
                      name="domain"
                      label="Domain"
                      value={formik.values.domain}
                      onChange={formik.handleChange}
                      required
                    >
                      {DOMAINS.map((domain) => (
                        <MenuItem key={domain.value} value={domain.value}>
                          {domain.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="number"
                      id="priority"
                      name="priority"
                      label="Priority"
                      value={formik.values.priority}
                      onChange={formik.handleChange}
                      error={formik.touched.priority && Boolean(formik.errors.priority)}
                      helperText={formik.touched.priority && formik.errors.priority}
                      required
                      inputProps={{ min: 1, 'aria-required': 'true' }}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Conditions</Typography>
                  <Button startIcon={<AddIcon />} onClick={addCondition}>
                    Add Condition
                  </Button>
                </Box>
                {conditions.map((condition, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Field"
                          value={condition.field}
                          onChange={(e) => updateCondition(index, 'field', e.target.value)}
                          placeholder="e.g., amount, transactionCount"
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          select
                          label="Operator"
                          value={condition.operator}
                          onChange={(e) => updateCondition(index, 'operator', e.target.value)}
                        >
                          {OPERATORS.map((op) => (
                            <MenuItem key={op.value} value={op.value}>
                              {op.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="Value"
                          value={condition.value}
                          onChange={(e) => updateCondition(index, 'value', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} md={1}>
                        <IconButton
                          onClick={() => removeCondition(index)}
                          disabled={conditions.length === 1}
                          aria-label="Remove condition"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Action
                </Typography>
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      select
                      id="actionType"
                      name="actionType"
                      label="Action Type"
                      value={formik.values.actionType}
                      onChange={formik.handleChange}
                      required
                    >
                      {ACTION_TYPES.map((action) => (
                        <MenuItem key={action.value} value={action.value}>
                          {action.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  {formik.values.actionType === 'SCORE' && (
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        type="number"
                        id="score"
                        name="score"
                        label="Risk Score"
                        value={formik.values.score}
                        onChange={formik.handleChange}
                        inputProps={{ min: 0, max: 100 }}
                      />
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="actionReason"
                      name="actionReason"
                      label="Reason/Message"
                      multiline
                      rows={2}
                      value={formik.values.actionReason}
                      onChange={formik.handleChange}
                      placeholder="Reason for the action"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 90 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Rule Preview
                </Typography>
                <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, fontFamily: 'monospace' }}>
                  <Typography variant="body2" gutterBottom>
                    IF
                  </Typography>
                  {conditions.map((cond, idx) => (
                    <Typography key={idx} variant="body2" sx={{ ml: 2 }}>
                      {cond.field} {cond.operator} {cond.value}
                      {idx < conditions.length - 1 && ' AND'}
                    </Typography>
                  ))}
                  <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
                    THEN
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    {formik.values.actionType}
                    {formik.values.actionType === 'SCORE' && ` (${formik.values.score})`}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" flexDirection="column" gap={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    startIcon={<SaveIcon />}
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Save Rule
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate(`/rulesets/${rulesetId}`)}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default RuleEditor;
