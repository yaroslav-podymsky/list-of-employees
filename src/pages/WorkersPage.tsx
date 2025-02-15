import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Space } from 'antd';
import { WorkerFilters } from '../types/worker';
import WorkerList from '../components/WorkerList';

const WorkersPage: React.FC = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<WorkerFilters>({
    role: '',
    isArchive: false,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  return (
    <div className="container">
      <Space direction="vertical" style={{ width: '100%' }}>
        <div style={{ display: 'flex', gap: "30px", alignItems: 'center' }}>
          <Typography.Title style={{marginBottom: "6px"}}>Список работников</Typography.Title>
          <Button
            onClick={() => navigate('/worker/new')}
          >
            Добавить
          </Button>
        </div>
        
        <WorkerList
          filters={filters}
          onFilterChange={setFilters}
        />
      </Space>
    </div>
  );
};


export default WorkersPage