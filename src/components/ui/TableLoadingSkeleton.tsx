import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const TableLoadingSkeleton = () => {
  const numColumns = 5;
  const numRows = 5;

  return (
    <Box width="100%" overflow="hidden">
      <Stack spacing={1} sx={{ marginBottom: 2 }}>
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rectangular" width={100} height={32} animation="wave" sx={{ borderRadius: '16px' }} />
          <Skeleton variant="rectangular" width={100} height={32} animation="wave" sx={{ borderRadius: '16px' }} />
        </Stack>
        <Grid container>
          {Array.from(new Array(numColumns)).map((_, index) => (
            <Grid item xs key={index} sx={{ padding: 1 }}>
              <Skeleton variant="rectangular" height={30} animation="wave" />
            </Grid>
          ))}
        </Grid>
        {Array.from(new Array(numRows)).map((_, index) => (
          <Grid container key={index}>
            {Array.from(new Array(numColumns)).map((_, colIndex) => (
              <Grid item xs key={colIndex} sx={{ padding: 1 }}>
                <Skeleton variant="rectangular" height={30} animation="wave" />
              </Grid>
            ))}
          </Grid>
        ))}
      </Stack>
    </Box>
  );
};

export default TableLoadingSkeleton;
