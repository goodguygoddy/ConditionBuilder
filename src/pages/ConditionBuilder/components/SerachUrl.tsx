import React, { useState, useEffect, useMemo } from 'react';

import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';

import { isValidUrl } from '@/utils/isValidUrl';

interface ISearchUrlProps {
  isLoading?: boolean;
  value: string
  updateSearchURL: (url: string) => void;
}

const SearchUrl: React.FC<ISearchUrlProps> = ({ value, isLoading = false, updateSearchURL }) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [urlError, setUrlError] = useState<boolean>(false);

  const debouncedUpdate = useMemo(() => debounce(updateSearchURL, 400), [updateSearchURL]);

  useEffect(() => {
    if (isValidUrl(inputValue)) {
      setUrlError(false);
      debouncedUpdate(inputValue);
    } else {
      setUrlError(true);
    }
  }, [inputValue, debouncedUpdate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <TextField
      id="outlined-controlled"
      label="URL"
      type="url"
      value={inputValue}
      onChange={handleChange}
      error={urlError}
      helperText={urlError ? "Please enter a valid URL." : "Insert data url. Returning data MUST be an array json where each element is a key/value pair."}
      disabled={isLoading}
    />
  );
}

export default SearchUrl;
