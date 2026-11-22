import React from 'react';
import { render } from '@testing-library/react';
import { Breadcrumbs } from '../breadcrumbs';
import { Select } from '../select';

describe('Empty lists', () => {
  it('should not render a stray 0 for empty breadcrumbs', async () => {
    const { container } = render(<Breadcrumbs label="Path" crumbs={[]} />);

    expect(container.textContent).not.toContain('0');
  });

  it('should not render a stray 0 for a select without options', async () => {
    const { container } = render(<Select label="Empty" options={[]} />);

    expect(container.textContent).not.toContain('0');
  });
});
