import { render, screen } from "@testing-library/react";

test("test", () => {
  const Test = () => <div data-testid="test"></div>;
  render(<Test />);
  expect(screen.getByTestId("test")).toBeInTheDocument();
});
