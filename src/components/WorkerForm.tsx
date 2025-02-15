import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Worker } from '../types/worker';
import { Form, Input, Select, Checkbox, Button } from 'antd';
import InputMask from 'react-input-mask';

interface Props {
  worker?: Worker;
  onSubmit: (data: Omit<Worker, 'id'>) => void;
}

const WorkerForm: React.FC<Props> = ({ worker, onSubmit }) => {
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
      name: worker?.name || '',
      phone: worker?.phone || '',
      birthday: worker?.birthday || '',
      role: worker?.role || 'cook',
      isArchive: worker?.isArchive || false,
    }
  });

  const onSubmitForm = handleSubmit((data: Omit<Worker, 'id'>) => {
    if(data.birthday.replace(/\./g, "").length < 8) {
      setError('birthday',{message: "Введите полную дату"})
    } else {
      onSubmit(data); 
    }
  });

  return (
    <Form layout="vertical" onFinish={onSubmitForm}>
      <Form.Item
        label="Имя"
        validateStatus={errors.name ? 'error' : ''}
        help={errors.name?.message}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Имя обязательно' }}
          render={({ field }) => (
            <Input {...field} />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Телефон"
        validateStatus={errors.phone ? 'error' : ''}
        help={errors.phone?.message}
      >
        <Controller
          name="phone"
          control={control}
          rules={{ required: 'Телефон обязателен' }}
          render={({ field }) => (
            <InputMask
              mask="+7 (999) 999-9999"
              value={field.value}
              onChange={(e) => {
                const value = e.target.value;
                const digitsCount = value.replace(/\D/g, '').length;
                if (digitsCount <= 11) {
                  field.onChange(value);
                }
              }}
              maskChar=""
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <Input {...inputProps} ref={(node) => {
                  if (node) {
                    field.ref(node.input);
                  }
                }} />
              )}
            </InputMask>
          )}
        />
      </Form.Item>

      <Form.Item
        label="Дата рождения"
        validateStatus={errors.birthday ? 'error' : ''}
        help={errors.birthday?.message}
      >
        <Controller
          name="birthday"
          control={control}
          rules={{ required: 'Дата рождения обязательна' }}
          render={({ field }) => (
            <InputMask
              mask="99.99.9999"
              value={field.value}
              onChange={(e) => {
                const value = e.target.value;
                const digitsCount = value.replace(/\D/g, '').length;
                if (digitsCount <= 8) {
                  field.onChange(value);
                }
              }}
              maskChar=""
              alwaysShowMask={false}
            >
              {(inputProps: any) => (
                <Input {...inputProps} ref={(node) => {
                  if (node) {
                    field.ref(node.input);
                  }
                }} />
              )}
            </InputMask>
          )}
        />
      </Form.Item>
      <Form.Item
        label="Должность"
        validateStatus={errors.role ? 'error' : ''}
        help={errors.role?.message}
      >
        <Controller
          name="role"
          control={control}
          rules={{ required: 'Должность обязательна' }}
          render={({ field }) => (
            <Select {...field}>
              <Select.Option value="cook">Повар</Select.Option>
              <Select.Option value="waiter">Официант</Select.Option>
              <Select.Option value="driver">Водитель</Select.Option>
            </Select>
          )}
        />
      </Form.Item>
      <Form.Item>
        <Controller
          name="isArchive"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Checkbox checked={value} onChange={(e) => onChange(e.target.checked)}>
              В архиве
            </Checkbox>
          )}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">
          {worker ? 'Сохранить' : 'Добавить'}
        </Button>
      </Form.Item>
    </Form>
  );
};


export default WorkerForm