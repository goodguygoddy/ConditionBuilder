import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface OrConditionSkeletonProps {
  showOrLabel: boolean
}

const OrConditionSkeleton: React.FC<OrConditionSkeletonProps> = ({ showOrLabel }) => {
  return (
    <Box flex={1} padding={2}>
      <Grid container spacing={2} alignItems="center">
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
        <Grid item xs={showOrLabel ? 3 : 4}>
          <Skeleton variant="rectangular" width="100%" height={56} />
        </Grid>
        <Grid item xs={4}>
          <Skeleton variant="rectangular" width="100%" height={56} />
        </Grid>
        <Grid item xs={3}>
          <Skeleton variant="rectangular" width="100%" height={56} />
        </Grid>
        <Grid item xs={1} display="flex" justifyContent="flex-end">
          <Box display="flex" gap={1}>
            <Skeleton variant="circular" width={35} height={35} />
            <Skeleton variant="circular" width={35} height={35} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrConditionSkeleton;
