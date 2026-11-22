import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dropdown, DropdownButton, DropdownBody } from '../dropdown';

describe('Dropdown', () => {
  it('should find and render its button and body', async () => {
    render(
      <Dropdown id="test-dropdown">
        <DropdownButton>Open it</DropdownButton>
        <DropdownBody>
          <p>Hello</p>
        </DropdownBody>
      </Dropdown>
    );

    expect(screen.getByText('Open it')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
