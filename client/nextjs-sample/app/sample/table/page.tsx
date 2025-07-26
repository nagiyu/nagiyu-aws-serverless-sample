import React from 'react';
import { BasicTable, Column } from '../../../../common/components/data/table/BasicTable';
import { Container } from '@mui/material';

interface Data {
  name: string;
  age: number;
  city: string;
}

const columns: Column<Data>[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'age', label: 'Age', minWidth: 100, align: 'right' },
  { id: 'city', label: 'City', minWidth: 170 },
];

const data: Data[] = [
  { name: 'Alice', age: 24, city: 'New York' },
  { name: 'Bob', age: 30, city: 'San Francisco' },
  { name: 'Charlie', age: 28, city: 'Los Angeles' },
];

export default function TableSamplePage() {
  return (
    <Container>
      <h1>BasicTable Sample</h1>
      <BasicTable columns={columns} data={data} />
    </Container>
  );
}
