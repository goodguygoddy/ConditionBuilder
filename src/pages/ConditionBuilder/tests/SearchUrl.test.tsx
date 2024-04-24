import { render, fireEvent, screen } from '@testing-library/react';
import SearchUrl from '@/pages/ConditionBuilder/components/SerachUrl';

vi.mock('@/utils/isValidUrl', () => ({
  isValidUrl: vi.fn((url: string) => url === 'https://example.com')
}));

vi.mock('@mui/material/utils', () => ({
  debounce: vi.fn((fn) => fn)
}));

describe('SearchUrl Component Tests', () => {
  it('should render the SearchUrl component', () => {
    render(<SearchUrl value="" updateSearchURL={() => {}} />);
    expect(screen.getByLabelText(/url/i)).toBeInTheDocument();
  });

  it('should display an error message when an invalid URL is entered', async () => {
    const { getByLabelText, getByText } = render(<SearchUrl value="" updateSearchURL={() => {}} />);
    const input = getByLabelText(/url/i);
    fireEvent.change(input, { target: { value: 'not-a-valid-url' } });
    expect(getByText(/please enter a valid url\./i)).toBeInTheDocument();
  });

  it('should not display an error message when a valid URL is entered', async () => {
    const { getByLabelText, queryByText } = render(<SearchUrl value="" updateSearchURL={() => {}} />);
    const input = getByLabelText(/url/i);
    fireEvent.change(input, { target: { value: 'https://example.com' } });
    expect(queryByText(/please enter a valid url\./i)).not.toBeInTheDocument();
  });

  it('should call updateSearchURL with the correct URL when a valid URL is entered', async () => {
    const mockUpdateSearchURL = vi.fn();
    const { getByLabelText } = render(<SearchUrl value="" updateSearchURL={mockUpdateSearchURL} />);
    const input = getByLabelText(/url/i);
    const validUrl = 'https://example.com';
    fireEvent.change(input, { target: { value: validUrl } });
    expect(mockUpdateSearchURL).toHaveBeenCalledWith(validUrl);
  });

  it('should handle isLoading prop correctly', () => {
    const { getByLabelText } = render(<SearchUrl value="" updateSearchURL={() => {}} isLoading={true} />);
    const input = getByLabelText(/url/i);
    expect(input).toBeDisabled();
  });
});
