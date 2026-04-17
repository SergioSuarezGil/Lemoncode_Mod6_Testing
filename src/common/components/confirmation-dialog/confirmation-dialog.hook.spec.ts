import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useConfirmationDialog } from './confirmation-dialog.hook';

describe('useConfirmationDialog', () => {
  it('should expose isOpen and handlers', () => {
    // Act
    const { result } = renderHook(() => useConfirmationDialog());
    // Assert
    expect(typeof result.current.isOpen).toBe('boolean');
    expect(typeof result.current.onAccept).toBe('function');
    expect(typeof result.current.onClose).toBe('function');
    expect(typeof result.current.onOpenDialog).toBe('function');
    expect(result.current).toHaveProperty('itemToDelete');
  });

  it('should open the dialog and set the item to delete', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    // Act
    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'Test' });
    });
    // Assert
    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual({ id: '1', name: 'Test' });
  });

  it('should close the dialog', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    // Act
    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'Test' });
      result.current.onClose();
    });
    // Assert
    expect(result.current.isOpen).toBe(false);
  });

  it('should reset the item to delete on accept', () => {
    // Arrange
    const { result } = renderHook(() => useConfirmationDialog());
    // Act
    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'Test' });
      result.current.onAccept();
    });
    // Assert
    expect(result.current.itemToDelete).toEqual({ id: '', name: '' });
  });
});
