import React, { useState, useEffect, useCallback } from 'react';

import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';

import { isValidUrl } from '@/utils/isValidUrl';

interface ISearchUrlProps {
  isLoading?: boolean;
  value: string;
  error: Error | null;
  updateSearchURL: (url: string) => void;
}

const SearchUrl: React.FC<ISearchUrlProps> = ({ value, error, isLoading = false, updateSearchURL }) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [urlError, setUrlError] = useState<string | null>(null);

  const debouncedUpdate = useCallback(debounce((value) => {
    if (isValidUrl(value)) {
      setUrlError(null);
      updateSearchURL(value);
    } else {
      setUrlError("Please enter a valid URL.");
    }
  }, 1000), []);

  useEffect(() => {
    if (error === null) {
      setUrlError(null);
      return;
    } else {
      setUrlError(error.message);
    }
  }, [error])

  useEffect(() => {
    debouncedUpdate(inputValue);
  }, [inputValue]);


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
      error={urlError !== null}
      helperText={urlError !== null ? urlError : "Insert data url. Returning data MUST be an array json where each element is a key/value pair."}
      disabled={isLoading}
    />
  );
}

export default SearchUrl;
