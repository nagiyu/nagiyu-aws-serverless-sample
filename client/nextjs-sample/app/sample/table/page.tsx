import React from 'react';
import BasicTable, { Column } from '@client-common/components/data/table/BasicTable';
import { Stack } from '@mui/material';

interface Data {
  name: string;
  age: number;
  city: string;
}

const columns: Column<Data>[] = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'age', label: 'Age', minWidth: 50, align: 'right' },
  { id: 'city', label: 'City', minWidth: 100 },
];

const data: Data[] = [
  { name: 'Alice', age: 25, city: 'New York' },
  { name: 'Bob', age: 30, city: 'San Francisco' },
  { name: 'Charlie', age: 35, city: 'Los Angeles' },
];

export default function TableSamplePage() {
  return (
    <Stack spacing={2} padding={2}>
      <h1>BasicTable Sample</h1>
      <BasicTable columns={columns} data={data} />
    </Stack>
  );
}
