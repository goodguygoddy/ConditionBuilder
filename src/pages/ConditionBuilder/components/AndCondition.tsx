import React from 'react';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import OrCondition from './OrCondition';
import { ConditionOperator, ConditionType, Condition, ConditionGroup } from '@/pages/ConditionBuilder/types';
import { v4 as uuidv4 } from 'uuid';

interface IAndConditionProps {
  group: ConditionGroup,
  tableHeader: string[],
  setConditions: (updatedGroup: ConditionGroup) => void
}

const AndCondition: React.FC<IAndConditionProps> = ({ group, tableHeader, setConditions }) => {

  const addCondition = (id: string) => {
    const newCondition: Condition = {
      id: uuidv4(),
      field: '',
      operator: ConditionOperator.EQUALS,
      value: '',
      type: ConditionType.OR
    };
    const index: number = group.conditions.findIndex((condition) => condition.id === id);

    const updatedConditions: Condition[] = [
      ...group.conditions.slice(0, index + 1),
      newCondition,
      ...group.conditions.slice(index + 1)
    ];

    const updatedGroup: ConditionGroup = { ...group, conditions: updatedConditions };
    setConditions(updatedGroup);
  };

  const updateCondition = (id: string, updated: Partial<Condition>) => {
    const updatedConditions: Condition[] = group.conditions.map((condition) => condition.id === id ? { ...condition, ...updated } : condition);
    const updatedGroup: ConditionGroup = { ...group, conditions: updatedConditions}
    setConditions(updatedGroup);
  };

  const removeCondition = (id: string) => {
    const updatedConditions: Condition[] = group.conditions.filter(condition => condition.id !== id);
    const updatedGroup: ConditionGroup = { ...group, conditions: updatedConditions};
    setConditions(updatedGroup);
  };

  return (
    <Card variant="outlined">
      {group.conditions.map((condition: Condition, index: number) => (
        <Box key={condition.id} sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <OrCondition
            condition={condition}
            showOrLabel={index > 0}
            onAdd={addCondition}
            tableHeader={tableHeader}
            onUpdate={(updated: Partial<Condition>) => updateCondition(condition.id, updated)}
            onRemove={removeCondition}
          />
        </Box>
      ))}
    </Card>
  );
};

export default AndCondition;
