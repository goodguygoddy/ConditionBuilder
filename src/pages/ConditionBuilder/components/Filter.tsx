import React, { useState, useEffect } from 'react';

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';

import { v4 as uuidv4 } from 'uuid';
import AndCondition from '@/pages/ConditionBuilder/components/AndCondition';
import { ConditionGroup, ConditionType, ConditionOperator, DataItem } from '@/pages/ConditionBuilder/types';
import applyFilter from '@/pages/ConditionBuilder/utils/applyFilter';


interface FilterProps {
  data: DataItem[],
  tableHeader: any[],
  updateFilteredData: (data: any[]) => void
}

const Filter: React.FC<FilterProps> = ({ data, updateFilteredData, tableHeader }) => {
  const [conditionLists, setConditionLists] = useState<ConditionGroup[]>([{
    id: uuidv4(),
    type: ConditionType.AND,
    conditions: [{
      id: uuidv4(),
      field: "",
      operator: ConditionOperator.EQUALS,
      value: "",
      type: ConditionType.OR
    }]
  }]);

  const addConditionGroup = () => {
    const newConditionGroup: ConditionGroup = {
      id: uuidv4(),
      type: ConditionType.AND,
      conditions: [{
        id: uuidv4(),
        field: "",
        operator: ConditionOperator.EQUALS,
        value: "",
        type: ConditionType.OR
      }]
    }
    setConditionLists([...conditionLists, newConditionGroup]);
  };

  const updateConditionGroup = (updatedGroup: ConditionGroup) => {
    if (updatedGroup.conditions.length === 0) {
      setConditionLists(prev => prev.filter(g => g.id !== updatedGroup.id))
    } else {
      setConditionLists(prev => prev.map(g => g.id === updatedGroup.id ? updatedGroup : g));
    }
  };


  useEffect(() => {
    const filtered = applyFilter(data, conditionLists);
    updateFilteredData(filtered);
  }, [data, conditionLists]);

  return (
    <Box>
      {conditionLists.map((conditionGroup: ConditionGroup, index: number) => (
        <React.Fragment key={conditionGroup.id}>
          <AndCondition group={conditionGroup} setConditions={updateConditionGroup} tableHeader={tableHeader} />
          <Box sx={{ width: '2px', height: 20 }} paddingLeft={6} borderRight={2} borderColor={grey[200]} />
          {index !== conditionLists.length - 1 && (
            <>
              <Typography paddingLeft={4} fontWeight="bold" color={grey[500]}>
                AND
              </Typography>
              <Box sx={{ width: '2px', height: 20 }} paddingLeft={6} borderRight={2} borderColor={grey[200]} />
            </>
          )}
        </React.Fragment>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button
          variant="outlined"
          onClick={addConditionGroup}
          startIcon={<AddIcon />}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography fontWeight="bold">
            AND
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Filter;
