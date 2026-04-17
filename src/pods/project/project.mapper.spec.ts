
import * as mapper from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { describe, it, expect } from 'vitest';

describe('project.mapper', () => {

  it('should be defined', () => {
    // Assert
    expect(mapper).toBeDefined();
  });

  it('should map a complete project correctly', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '1',
      name: 'Proyecto Test',
      externalId: 'EXT1',
      comments: 'Comentario',
      isActive: true,
      employees: [
        { id: 'e1', employeeName: 'Empleado 1', isAssigned: true },
        { id: 'e2', employeeName: 'Empleado 2', isAssigned: false },
      ],
    };
    // Act
    const result = mapper.mapProjectFromApiToVm(apiProject);
    // Assert
    expect(result).toEqual({
      id: '1',
      name: 'Proyecto Test',
      externalId: 'EXT1',
      comments: 'Comentario',
      isActive: true,
      employees: [
        { id: 'e1', employeeName: 'Empleado 1', isAssigned: true },
        { id: 'e2', employeeName: 'Empleado 2', isAssigned: false },
      ],
    });
  });

  it('should map a project with empty employees', () => {
    // Arrange
    const apiProject: apiModel.Project = {
      id: '2',
      name: 'Sin empleados',
      isActive: false,
      employees: [],
    };
    // Act
    const result = mapper.mapProjectFromApiToVm(apiProject);
    // Assert
    expect(result.employees).toEqual([]);
    expect(result.id).toBe('2');
  });

  it('should return an empty project if parameter is null', () => {
    // Act
    const result = mapper.mapProjectFromApiToVm(null as any);
    // Assert
    expect(result).toEqual(viewModel.createEmptyProject());
  });

});
