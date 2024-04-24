import { render, screen } from '@testing-library/react';
import { GridRowIdGetter, GridRowsProp } from '@mui/x-data-grid';
import ResultDataTable from '@/pages/ConditionBuilder/components/ResultDataTable';

vi.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ getRowId, rows }: { getRowId: GridRowIdGetter; rows: GridRowsProp }) => (
    <div data-testid="mock-datagrid">
      {rows.map((row) => (
        <div key={getRowId(row)} data-testid={`row-${getRowId(row)}`}>{JSON.stringify(row)}</div>
      ))}
    </div>
  ),
}));

vi.mock('@/components/ui/TableLoadingSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="table-loading-skeleton"></div>
}));

describe('ResultDataTable Component Tests', () => {
  const header = ['name', 'age', 'location'];
  const data = [
    { id: 1, name: 'John Doe', age: 30, location: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, location: 'Los Angeles' }
  ];

  it('should pass the correct props to DataGrid when not loading', () => {
    render(
      <ResultDataTable
        data={data}
        header={header}
        loading={false}
        totalCount={data.length}
        filteredCount={1}
      />
    );

    data.forEach((rowData) => {
      expect(screen.getByTestId(`row-${rowData.id}`)).toHaveTextContent(JSON.stringify(rowData));
    });

    expect(screen.getByTestId('mock-datagrid')).toBeInTheDocument();
  });

  it('should render the TableLoadingSkeleton when loading', () => {
    render(
      <ResultDataTable
        data={[]}
        header={header}
        loading={true}
        totalCount={0}
        filteredCount={0}
      />
    );

    expect(screen.getByTestId("table-loading-skeleton")).toBeInTheDocument();
  });

  it('should render the total and filtered chips correctly', () => {
    const { getByText } = render(
      <ResultDataTable
        data={data}
        header={header}
        loading={false}
        totalCount={100}
        filteredCount={50}
      />
    );

    expect(getByText('Total: 100')).toBeInTheDocument();
    expect(getByText('Filtered: 50')).toBeInTheDocument();
  });
});
