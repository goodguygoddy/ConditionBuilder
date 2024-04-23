import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import TableLoadingSkeleton from '@/components/ui/TableLoadingSkeleton';

interface IResultDataTableProps {
  data: Array<any>;
  header: Array<string>;
  loading: Boolean;
  totalCount: number;
  filteredCount: number;
}

const ResultDataTable: React.FC<IResultDataTableProps> = ({ data, header, loading, totalCount, filteredCount }) => {
  const columns: GridColDef[] = header.map((field) => ({
    field: field,
    headerName: field.charAt(0).toUpperCase() + field.slice(1),
    width: 150,
    flex: 1,
  }));

  return (
    <Box sx={{ mt: 1, mb: 2}}>
      <Typography variant="h6" component="h3" sx={{ flexGrow: 1, pt: 2 }} fontWeight="bold">
        Result
      </Typography>
      { !loading ? (
        <>
          <Stack direction="row" spacing={1} marginBottom={2}>
            <Chip label={"Total: " + totalCount} />
            <Chip label={"Filtered: " + filteredCount}  color="primary" />
          </Stack>
          <Box sx={{ height:400 }}>
            <DataGrid
              rows={data}
              columns={columns}
              getRowId={(row) => row.id}
              rowHeight={25}
            />
          </Box>
        </>
      ): <TableLoadingSkeleton />}
    </Box>
  )
}

export default ResultDataTable