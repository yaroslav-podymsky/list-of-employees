import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Select, Checkbox, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RootState } from '../store/store';
import { Worker, WorkerFilters, Role } from '../types/worker';

interface Props {
  filters: WorkerFilters;
  onFilterChange: (filters: WorkerFilters) => void;
}

const roles: Record<Role, string> = {
  cook: 'Повар',
  driver: 'Водитель',
  waiter: 'Официант',
};

const WorkerList: React.FC<Props> = ({ filters, onFilterChange }) => {
  const workers = useSelector((state: RootState) => state.workers.workers);
  const navigate = useNavigate();

  const filteredWorkers = workers
    .filter(el => !filters.role || el.role === filters.role)
    .filter(el => el.isArchive === filters.isArchive);

  const handleRowClick = (e: Worker) => {
    navigate(`/worker/${e.id}`);
  };

  const columns: ColumnsType<Worker> = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      defaultSortOrder: filters.sortBy === 'name' ? (filters.sortOrder === 'asc' ? 'ascend' : 'descend') : undefined,
      fixed: 'left',
      showSorterTooltip: false
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthday',
      key: 'birthday',
      sorter: (a, b) => {
        const dateA = new Date(a.birthday.split('.').reverse().join('-'));
        const dateB = new Date(b.birthday.split('.').reverse().join('-'));
        return dateA.getTime() - dateB.getTime();
      },
      defaultSortOrder: filters.sortBy === 'birthday' ? (filters.sortOrder === 'asc' ? 'ascend' : 'descend') : undefined,
      showSorterTooltip: false
    },
    {
      title: 'Должность',
      dataIndex: 'role',
      key: 'role',
      render: (role: Role) => roles[role],
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  const handleTableChange = (sorter: any) => {
    const newFilters = { ...filters };
    if (sorter.field) {
      newFilters.sortBy = sorter.field === 'birthday' ? 'birthday' : 'name';
      newFilters.sortOrder = sorter.order === 'ascend' ? 'asc' : 'desc';
    }
    onFilterChange(newFilters);
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>        
        <div className="filter-controls">
          <Select
            placeholder="Выберите должность"
            value={filters.role}
            onChange={(value) => onFilterChange({ ...filters, role: value })}
          >
            <Select.Option value="">Все должности</Select.Option>
            {Object.entries(roles).map(([value, label]) => (
              <Select.Option key={value} value={value}>{label}</Select.Option>
            ))}
          </Select>

          <Checkbox
            checked={filters.isArchive}
            onChange={(e) => onFilterChange({ ...filters, isArchive: e.target.checked })}
          >
            В архиве
          </Checkbox>
        </div>

        <Table
          columns={columns}
          dataSource={filteredWorkers}
          rowKey="id"
          onChange={handleTableChange}
          onRow={(e) => ({
            onClick: () => handleRowClick(e)
          })}
          pagination={{
            showSizeChanger: false,
            responsive: true
          }}
        />
      </Space>
    </div>
  );
};


export default WorkerList