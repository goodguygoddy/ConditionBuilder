import { render, screen } from '@testing-library/react';
import AndCondition from '@/pages/ConditionBuilder/components/AndCondition';
import { ConditionGroup, ConditionType, ConditionOperator } from '@/pages/ConditionBuilder/types';
import OrCondition from '@/pages/ConditionBuilder/components/OrCondition';

vi.mock('@/pages/ConditionBuilder/components/OrCondition', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mocked OrCondition</div>)
}));

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid')
}));

describe('AndCondition Component Tests', () => {
  const mockTableHeader = [{ name: 'Column1' }, { name: 'Column2' }];
  const mockSetConditions = vi.fn();
  let mockGroup: ConditionGroup;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGroup = {
      id: 'group-1',
      type: ConditionType.AND,
      conditions: [
        {
          id: 'cond-1',
          field: 'column-1',
          operator: ConditionOperator.EQUALS,
          value: 'Test',
          type: ConditionType.OR
        },
        {
          id: 'cond-2',
          field: 'column-2',
          operator: ConditionOperator.GREATER_THAN,
          value: 'Value',
          type: ConditionType.OR
        }
      ]
    };
  });

  it('should render correctly with initial state', () => {
    render(<AndCondition group={mockGroup} tableHeader={mockTableHeader} setConditions={mockSetConditions} />);
    expect(screen.getAllByText('Mocked OrCondition').length).toBe(2);
  });

  it('should render OrCondition Component with correct props', () => {
    render(<AndCondition group={mockGroup} tableHeader={mockTableHeader} setConditions={mockSetConditions} />);
    const calls = vi.mocked(OrCondition).mock.calls;
    expect(calls.length).toBe(2);
    expect(calls[0][0].condition).toEqual(expect.objectContaining({
      id: 'cond-1',
      field: 'column-1',
      operator: ConditionOperator.EQUALS,
      value: 'Test',
      type: ConditionType.OR
    }));
    expect(calls[1][0].condition).toEqual(expect.objectContaining({
      id: 'cond-2',
      field: 'column-2',
      operator: ConditionOperator.GREATER_THAN,
      value: 'Value',
      type: ConditionType.OR
    }));
  });
});
