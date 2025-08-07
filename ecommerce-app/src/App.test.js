import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app container', () => {
  render(<App />);
  const appContainer = screen.getByRole('main'); // Or add data-testid to Layout
  expect(appContainer).toBeInTheDocument();
});