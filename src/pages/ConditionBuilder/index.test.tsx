import { render, screen } from '@testing-library/react';
import ConditionBuilder from '@/pages/ConditionBuilder';

describe('ConditionBuilder Component Tests', () => {
  it('should render conponent correctly', async () => {
    render(<ConditionBuilder />);
    const text: HTMLElement = screen.getByRole('heading', {name: "Condition Builder"});
    expect(text).toBeInTheDocument();
  });
});
