import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Button } from './Button';

describe('Tests for Button component', () => {
  it('can be disabled', () => {
    render(<Button text="Foo bar" disabled />);
    expect(screen.getByRole('button', { name: 'Foo bar' })).toBeDisabled();
  });

  it('renders content', () => {
    const { container } = render(<Button text="Foo bar" disabled />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
