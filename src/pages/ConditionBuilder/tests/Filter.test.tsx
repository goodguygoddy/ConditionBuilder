import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '@/pages/ConditionBuilder/components/Filter';
import { DataItem } from '@/pages/ConditionBuilder/types';
import { Mock } from 'vitest';

describe('Filter Component Tests', () => {
  let mockData: DataItem[] = [];
  let mockHeader: string[] = [];
  let updateFilteredDataMock: Mock;

  beforeEach(() => {
    mockData = [];
    mockHeader = [];
    updateFilteredDataMock = vi.fn();
  });

  it('should render correctly with initial state', () => {
    render(<Filter data={mockData} updateFilteredData={updateFilteredDataMock} tableHeader={mockHeader} />);
    const buttonElement: HTMLElement = screen.getByRole('button', { name: 'AND' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('should add a new condition group when the and button is clicked', () => {
    render(<Filter data={mockData} updateFilteredData={updateFilteredDataMock} tableHeader={mockHeader} />);
    const andButton: HTMLElement = screen.getByRole('button', { name: 'AND' });
    fireEvent.click(andButton);
    expect(screen.getAllByText('AND').length).toBe(2);
  });

  it('should remove the condition group when all conditions are removed', () => {
    render(<Filter data={mockData} updateFilteredData={updateFilteredDataMock} tableHeader={mockHeader} />);
    fireEvent.click(screen.getByTestId('DeleteIcon'));
    expect(screen.getAllByText('AND').length).toBe(1);
  });

  it('should update the filtered data when conditions are changed', () => {
    render(<Filter data={mockData} updateFilteredData={updateFilteredDataMock} tableHeader={mockHeader} />);
    const andButton: HTMLElement = screen.getByRole('button', { name: 'AND' });
    fireEvent.click(andButton);
    expect(updateFilteredDataMock).toHaveBeenCalledTimes(2);
  });
});