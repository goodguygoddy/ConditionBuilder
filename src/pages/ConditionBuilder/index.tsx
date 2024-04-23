import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import SearchUrl from "@/pages/ConditionBuilder/components/SerachUrl";
import FilterCondition from "@/pages/ConditionBuilder/components/Filter";
import ResultDataTable from "@/pages/ConditionBuilder/components/ResultDataTable";
import { DataItem } from "@/pages/ConditionBuilder/types";

const ConditionBuilder = () => {
  const [searchUrl, setSearchUrl] = useState<string>('https://data.nasa.gov/resource/y77d-th95.json');
  const [tableHeader, setTableHeader] = useState<Array<string>>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const { data, loading } = useFetch(searchUrl);

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      setTableHeader(Object.keys(data[0]));
    }
  }, [data]);

  const updateFilteredData = (data: any[]) => {
    setFilteredData(data);
  }

  return (
    <Container
      maxWidth="lg"
    >
      <Stack spacing={2}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ flexGrow: 1, pt: 2 }}
          fontWeight="bold"
        >
          Condition Builder
        </Typography>
        <SearchUrl value={searchUrl} updateSearchURL={setSearchUrl}/>
        <FilterCondition data={data} updateFilteredData={updateFilteredData} tableHeader={tableHeader} />
        <ResultDataTable data={filteredData} totalCount={data.length} filteredCount={filteredData.length} header={tableHeader} loading={loading} />
      </Stack>
    </Container>
  );
}

export default ConditionBuilder;
