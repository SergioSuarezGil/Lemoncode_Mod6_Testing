import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  // Arrange
  const defaultProps = {
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    title: '¿Seguro?',
    labels: { closeButton: 'Cancelar', acceptButton: 'Aceptar' },
    children: <span>Contenido</span>,
  };

  it('should render without errors', () => {
    // Act
    render(<ConfirmationDialogComponent {...defaultProps} />);
    // Assert
    expect(screen.getByText('¿Seguro?')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Aceptar')).toBeInTheDocument();
    expect(screen.getByText('Contenido')).toBeInTheDocument();
  });

  it('should call onClose when clicking the cancel button', () => {
    // Act
    render(<ConfirmationDialogComponent {...defaultProps} />);
    const cancelBtn = screen.getByText('Cancelar');
    cancelBtn.click();
    // Assert
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('should call onAccept and onClose when clicking the accept button', () => {
    // Act
    render(<ConfirmationDialogComponent {...defaultProps} />);
    const acceptBtn = screen.getByText('Aceptar');
    acceptBtn.click();
    // Assert
    expect(defaultProps.onAccept).toHaveBeenCalled();
    expect(defaultProps.onClose).toHaveBeenCalledTimes(2);
  });

  it('should not render the dialog if isOpen is false', () => {
    // Act
    render(<ConfirmationDialogComponent {...defaultProps} isOpen={false} />);
    // Assert
    expect(screen.queryByText('¿Seguro?')).toBeNull();
  });
});
