import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { orange } from '@mui/material/colors';

import OrConditionSkeleton from '@/components/ui/OrConditionSkeleton';
import { ConditionOperator, Condition } from '@/pages/ConditionBuilder/types';
import isValidNumber from '@/utils/isValidNumber';
import isValidRegex from '@/utils/isValidRegex';


interface IOrConditionProps {
  condition: Condition,
  showOrLabel: boolean,
  tableHeader: any[],
  onUpdate: (updatedFields: Partial<Condition>) => void,
  onRemove: (id: string) => void,
  onAdd: (id: string) => void,
}

const OrCondition: React.FC<IOrConditionProps> = ({ condition, showOrLabel, tableHeader, onUpdate, onRemove, onAdd }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    validateInput(condition.value, condition.operator);
  }, [condition.value, condition.operator]);

  const validateInput = (value: string, operator: ConditionOperator) => {
    let isValid = true;
    let message = '';

    switch (operator) {
      case ConditionOperator.GREATER_THAN:
      case ConditionOperator.LESS_THAN:
        isValid = isValidNumber(value);
        message = 'Input must be a number';
        break;
      case ConditionOperator.REGEX:
        isValid = isValidRegex(value);
        message = 'Input must be a valid regex';
        break;
      default:
        isValid = true;
        message = '';
    }

    setIsValidInput(isValid);
    setErrorMessage(message);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onUpdate({ id: condition.id, value: newValue });
    validateInput(newValue, condition.operator);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Box flex={1}>
      <Grid container spacing={2} padding={2} alignItems="center">
        {showOrLabel && (
          <Grid item xs={1} sm={1} md={1}>
            <Typography
              color="primary"
              variant="h6"
              sx={{ fontWeight: 'bold', paddingLeft: 4 }}
            >
              OR
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={showOrLabel ? 3: 4} md={showOrLabel ? 3: 4}>
          <TextField
            fullWidth
            select
            label="Left Condition"
            value={condition.field}
            helperText={!isValidInput ? ' ' : ''}
            onChange={(e) => onUpdate({ id: condition.id, field: e.target.value })}
          >
            {tableHeader.map((field) => (
              <MenuItem key={field} value={field}>{field}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <TextField
            fullWidth
            select
            label="Operator"
            value={condition.operator}
            helperText={!isValidInput ? ' ' : ''}
            onChange={(e) => onUpdate({ id: condition.id, operator: e.target.value as ConditionOperator })}
          >
            <MenuItem value={ConditionOperator.EQUALS}>Equals</MenuItem>
            <MenuItem value={ConditionOperator.GREATER_THAN}>Greater Than</MenuItem>
            <MenuItem value={ConditionOperator.LESS_THAN}>Less Than</MenuItem>
            <MenuItem value={ConditionOperator.CONTAIN}>Contain</MenuItem>
            <MenuItem value={ConditionOperator.NOT_CONTAIN}>Not Contain</MenuItem>
            <MenuItem value={ConditionOperator.REGEX}>Regex</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <TextField
            fullWidth
            label="Value"
            value={condition.value}
            error={!isValidInput}
            helperText={!isValidInput ? errorMessage : ''}
            onChange={handleValueChange}
          />
        </Grid>
        <Grid item xs={12} sm={1} md={1} sx={{ display: 'flex', justifyContent: 'flex-center', alignItems: 'center' }}>
          <IconButton
            sx={{ pb: isValidInput ? 1 : 4 }}
            color="primary"
            onClick={() => {
              setIsHovering(false);
              onAdd(condition.id);
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            sx={{ pb: isValidInput ? 1 : 4, color: orange[700] }}
            onClick={() => onRemove(condition.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
      {isHovering && <OrConditionSkeleton showOrLabel={showOrLabel} />}
    </Box>
  );
};

export default OrCondition;
