import { render, screen } from '@testing-library/react';
import App from '../../pages/index';

describe('App', () => {
  it('renders without crashing', () => {
    const el = render(<App />);
    expect(el).toMatchSnapshot();
  });
});