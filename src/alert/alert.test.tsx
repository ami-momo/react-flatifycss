import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert, AlertIcon } from '../alert';

describe('Alert', () => {
  it('should add the has-icon class when it has an icon', async () => {
    render(
      <Alert data-testid="alert">
        <AlertIcon>
          <svg />
        </AlertIcon>
        Hello
      </Alert>
    );

    expect(screen.getByTestId('alert')).toHaveClass('has-icon');
  });
});
