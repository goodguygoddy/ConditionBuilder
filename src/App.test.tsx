import App from "@/App";
import { render, screen } from "@testing-library/react";

vi.mock('@/pages/ConditionBuilder', () => ({
  __esModule: true,
  default: () => <div>MockConditionBuilder</div>
}));

describe("App", () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(screen.getByText('MockConditionBuilder')).toBeInTheDocument();
  });

  it('should include CssBaseline for consistent styling', () => {
    render(<App />);
    const styleTags = document.head.querySelectorAll('style');
    expect(styleTags).not.toHaveLength(0);
  });
})