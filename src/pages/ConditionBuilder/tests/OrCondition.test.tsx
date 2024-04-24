import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import OrCondition from '@/pages/ConditionBuilder/components/OrCondition';
import { Condition, ConditionOperator, ConditionType } from '@/pages/ConditionBuilder/types';

vi.mock('@/components/ui/OrConditionSkeleton', () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mocked OrCondition Skeleton</div>)
}));

describe('OrCondition Component Tests', () => {
  const mockUpdate = vi.fn();
  const mockRemove = vi.fn();
  const mockAdd = vi.fn();
  const mockCondition: Condition = {
    id: 'cond-1',
    field: 'column-1',
    operator: ConditionOperator.EQUALS,
    value: 'Test',
    type: ConditionType.OR
  };
  const mockTableHeader = ['column-1', 'column-2'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with initial props', () => {
    render(<OrCondition condition={mockCondition} showOrLabel={true} tableHeader={mockTableHeader} onUpdate={mockUpdate} onRemove={mockRemove} onAdd={mockAdd} />);
    expect(screen.getByLabelText('Left Condition')).toBeInTheDocument();
    expect(screen.getByLabelText('Operator')).toBeInTheDocument();
    expect(screen.getByLabelText('Value')).toHaveValue('Test');
  });

  it('should render the OR text when the showOrLabel is true', () => {
    render(<OrCondition condition={mockCondition} showOrLabel={true} tableHeader={mockTableHeader} onUpdate={mockUpdate} onRemove={mockRemove} onAdd={mockAdd} />);
    expect(screen.getByText('OR')).toBeInTheDocument();
  });

  it('should not render the OR text when the showOrLabel is false', () => {
    render(<OrCondition condition={mockCondition} showOrLabel={false} tableHeader={mockTableHeader} onUpdate={mockUpdate} onRemove={mockRemove} onAdd={mockAdd} />);
    expect(screen.queryByText('OR')).not.toBeInTheDocument();
  });

  it('should call onUpdate with id and value when fields change', () => {
    render(<OrCondition condition={mockCondition} showOrLabel={true} tableHeader={mockTableHeader} onUpdate={mockUpdate} onRemove={mockRemove} onAdd={mockAdd} />);
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: 'New Value' } });
    expect(mockUpdate).toHaveBeenCalledWith({ id: 'cond-1', value: 'New Value' });
  });

  it('should call onAdd with id when add button is clicked', () => {
    render(<OrCondition condition={mockCondition} showOrLabel={true} tableHeader={mockTableHeader} onUpdate={mockUpdate} onRemove={mockRemove} onAdd={mockAdd} />);
    fireEvent.click(screen.getByTestId('AddIcon'));
    expect(mockAdd).toHaveBeenCalledWith(mockCondition.id);
  });

  it('should call onRemove with id when delete button is clicked', () => {
    render(<OrCondition condition={mockCondition} showOrLabel={true} tableHeader={mockTableHeader} onUpdate={mockUpdate} onRemove={mockRemove} onAdd={mockAdd} />);
    fireEvent.click(screen.getByTestId('DeleteIcon'));
    expect(mockRemove).toHaveBeenCalledWith(mockCondition.id);
  });

  it('should display skeleton on hover', () => {
    render(<OrCondition condition={mockCondition} showOrLabel={true} tableHeader={mockTableHeader} onUpdate={mockUpdate} onRemove={mockRemove} onAdd={mockAdd} />);
    fireEvent.mouseEnter(screen.getByTestId('AddIcon'));
    expect(screen.getByText('Mocked OrCondition Skeleton')).toBeInTheDocument();
  });

  it('should not display skeleton when not hovering', () => {
    render(<OrCondition condition={mockCondition} showOrLabel={true} tableHeader={mockTableHeader} onUpdate={mockUpdate} onRemove={mockRemove} onAdd={mockAdd} />);
    fireEvent.mouseLeave(screen.getByTestId('AddIcon'));
    expect(screen.queryByText('Mocked OrCondition Skeleton')).not.toBeInTheDocument();
  });
});
