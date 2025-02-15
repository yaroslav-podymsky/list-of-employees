import React from 'react';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import workerReducer from '../../store/workerSlice';
import WorkerList from '../WorkerList';
import { Role } from '../../types/worker';

const mockStore = configureStore({
  reducer: {
    workers: workerReducer,
  },
});

const mockFilters = {
  role: '' as  Role | '',
  isArchive: false,
  sortBy: 'name' as const,
  sortOrder: 'asc' as const,
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  );
};

describe('WorkerList', () => {
  it('renders worker list with filters', () => {
    const onFilterChange = jest.fn();
    
    renderWithProviders(
      <WorkerList
        filters={mockFilters}
        onFilterChange={onFilterChange}
      />
    );
    expect(screen.getByLabelText('В архиве')).toBeInTheDocument();
    expect(screen.getByLabelText('Должность')).toBeInTheDocument();
    expect(screen.getByText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Должность')).toBeInTheDocument();
    expect(screen.getByText('Телефон')).toBeInTheDocument();
    expect(screen.getByText('Дата рождения')).toBeInTheDocument();
  });

  it('handles filter changes', () => {
    const onFilterChange = jest.fn();
    
    renderWithProviders(
      <WorkerList
        filters={mockFilters}
        onFilterChange={onFilterChange}
      />
    );
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      role: 'cook',
    }));
    
    expect(onFilterChange).toHaveBeenCalledWith(expect.objectContaining({
      isArchive: true,
    }));
  });
});
