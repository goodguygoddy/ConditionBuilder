import { render, screen } from '@testing-library/react';
import ConditionBuilder from '@/pages/ConditionBuilder';

vi.mock('@/hooks/useEffect', () => ({
  __esModule: true,
  default: vi.fn()
}));

describe('ConditionBuilder Component Tests', () => {
  it('should render ConditionBuilder component correctly', async () => {
    render(<ConditionBuilder />);
    const text: HTMLElement = screen.getByRole('heading', {name: "Condition Builder"});
    expect(text).toBeInTheDocument();
  });
});
