
export interface Worker {
    id: number;
    name: string;
    isArchive: boolean;
    role: Role;
    phone: string;
    birthday: string;
}

export interface WorkerFilters {
    role: Role | '';
    isArchive: boolean;
    sortBy: 'name' | 'birthday';
    sortOrder: 'asc' | 'desc';
}
export type Role = 'cook' | 'waiter' | 'driver';
