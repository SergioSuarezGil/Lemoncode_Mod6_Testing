import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import * as reactPromiseTracker from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';

vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('SpinnerComponent', () => {
  it('should render Modal open when promiseInProgress is true', () => {
    // Arrange
    (reactPromiseTracker.usePromiseTracker as any).mockReturnValue({ promiseInProgress: true });
    // Act
    const { getByRole } = render(<SpinnerComponent />);
    // Assert
    expect(getByRole('presentation')).toBeInTheDocument();
  });

  it('should not render Modal when promiseInProgress is false', () => {
    // Arrange
    (reactPromiseTracker.usePromiseTracker as any).mockReturnValue({ promiseInProgress: false });
    // Act
    const { queryByRole } = render(<SpinnerComponent />);
    // Assert
    expect(queryByRole('presentation')).toBeNull();
  });
});
