import React from 'react';
import { render } from '@testing-library/react';
import { Figure } from '../figure';

describe('Figure', () => {
  it('should not add an undefined style class to the credit', async () => {
    const { container } = render(
      <Figure src="cat.jpg" alt="A cat" creditName="Picsum" />
    );

    expect(container.innerHTML).not.toContain('style-undefined');
  });
});
