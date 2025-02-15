import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Typography, Space } from 'antd';
import { RootState } from '../store/store';
import { addWorker, updateWorker } from '../store/workerSlice';
import { Worker } from '../types/worker';
import WorkerForm from '../components/WorkerForm';

const WorkerEditPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const worker = useSelector((state: RootState) =>
    state.workers.workers.find(el => el.id === Number(id))
  );

  const handleSubmit = (data: Omit<Worker, 'id'>) => {
    if (id === 'new') {
      const newWorker = {
        ...data,
        id: Date.now()
      };
      dispatch(addWorker(newWorker));
    } else {
      dispatch(updateWorker({
        ...data,
        id: Number(id)
      }));
    }
    navigate('/');
  };

  return (
    <div className="container">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          onClick={() => navigate('/')}
        >
          Назад
        </Button>
        
        <Typography.Title>
          {id === 'new' ? 'Новый сотрудник' : 'Редактирование сотрудника'}
        </Typography.Title>

        <WorkerForm
          worker={worker}
          onSubmit={handleSubmit}
        />
      </Space>
    </div>
  );
};


export default WorkerEditPage