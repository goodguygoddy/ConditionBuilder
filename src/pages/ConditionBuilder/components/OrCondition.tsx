import React, { useState } from 'react';

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


interface OrConditionProps {
  condition: Condition,
  showOrLabel: boolean,
  tableHeader: any[],
  onUpdate: (updatedFields: Partial<Condition>) => void,
  onRemove: (id: string) => void,
  onAdd: (id: string) => void,
}

const OrCondition: React.FC<OrConditionProps> = ({ condition, showOrLabel, tableHeader, onUpdate, onRemove, onAdd }) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

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
            onChange={(e) => onUpdate({ id: condition.id, value: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={1} md={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'end', sm: { justifyContent: 'flex-end' } }}>
            <IconButton
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
              sx={{ color: orange[700] }}
              onClick={() => onRemove(condition.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      {isHovering && <OrConditionSkeleton showOrLabel={showOrLabel} />}
    </Box>
  );
};

export default OrCondition;
