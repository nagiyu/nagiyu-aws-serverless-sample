'use client';

import React from 'react';
import BasicTable, { Column } from '@client-common/components/data/table/BasicTable';
import ContainedButton from '@client-common/components/inputs/Buttons/ContainedButton';

interface Data {
  name: string;
  age: number;
  email: string;
}

const columns: Column<Data>[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'age', label: 'Age', minWidth: 100, align: 'right' },
  { id: 'email', label: 'Email', minWidth: 200 },
];

const rows: Data[] = [
  { name: 'Alice', age: 25, email: 'alice@example.com' },
  { name: 'Bob', age: 30, email: 'bob@example.com' },
  { name: 'Charlie', age: 35, email: 'charlie@example.com' },
];

export default function SampleTablePage() {
  return (
    <div>
      <h1>BasicTable Sample</h1>
      <BasicTable columns={columns} data={rows} />
      <ContainedButton
        label="Add Row"
        onClick={() => alert('Add row clicked')}
        style={{ marginTop: 20 }}
      />
    </div>
  );
}
