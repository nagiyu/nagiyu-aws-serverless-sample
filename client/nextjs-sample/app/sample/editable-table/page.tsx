'use client';

import React, { useState } from 'react';
import EditableTable, { EditableColumn, ActionButtonConfig } from '@client-common/components/data/table/EditableTable';

interface EditableData {
  id: number;
  name: string;
  age: number;
  email: string;
  department: string;
}

const columns: EditableColumn<EditableData>[] = [
  { id: 'id', label: 'ID', minWidth: 50, editable: false },
  { id: 'name', label: 'Name', minWidth: 100, editable: true },
  { id: 'age', label: 'Age', minWidth: 50, align: 'right', editable: true },
  { id: 'email', label: 'Email', minWidth: 150, editable: true },
  { id: 'department', label: 'Department', minWidth: 120, editable: true },
];

const initialData: EditableData[] = [
  { id: 1, name: 'Alice Johnson', age: 25, email: 'alice@example.com', department: 'Engineering' },
  { id: 2, name: 'Bob Smith', age: 30, email: 'bob@example.com', department: 'Marketing' },
  { id: 3, name: 'Charlie Brown', age: 35, email: 'charlie@example.com', department: 'Sales' },
  { id: 4, name: 'Diana Prince', age: 28, email: 'diana@example.com', department: 'HR' },
  { id: 5, name: 'Eva Green', age: 22, email: 'eva@example.com', department: 'Design' },
  { id: 6, name: 'Frank Miller', age: 40, email: 'frank@example.com', department: 'Engineering' },
  { id: 7, name: 'Grace Lee', age: 33, email: 'grace@example.com', department: 'Finance' },
  { id: 8, name: 'Hannah Wilson', age: 27, email: 'hannah@example.com', department: 'Marketing' },
];

export default function EditableTableSamplePage() {
  const [data, setData] = useState<EditableData[]>(initialData);
  const [loading, setLoading] = useState(false);

  // Action button configuration
  const actionButtons: ActionButtonConfig = {
    showModify: true,
    showEdit: true,
    showDelete: true,
  };

  // Handle modify (save changes)
  const handleModify = (modifiedData: EditableData[]) => {
    console.log('Saving modified data:', modifiedData);
    setData(modifiedData);
    alert('Data has been saved successfully!');
  };

  // Handle edit (could open a dialog)
  const handleEdit = (item: EditableData) => {
    console.log('Edit item:', item);
    alert(`Editing ${item.name} (ID: ${item.id})`);
  };

  // Handle delete
  const handleDelete = (item: EditableData) => {
    if (confirm(`Are you sure you want to delete ${item.name}?`)) {
      setData(prev => prev.filter(d => d.id !== item.id));
      console.log('Deleted item:', item);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>EditableTable Sample</h1>
      <p>
        This table demonstrates the editable table functionality:
        <br />• Click on editable cells (Name, Age, Email, Department) to edit them
        <br />• Use Sort column arrows to reorder rows  
        <br />• Modify button is enabled only when changes are made
        <br />• Cancel button appears when there are unsaved changes
        <br />• Edit and Delete buttons are always available
      </p>
      
      <EditableTable
        columns={columns}
        data={data}
        loading={loading}
        pageSize={10}
        pageIndex={0}
        pageSizeOptions={[5, 10, 20]}
        onPageChange={(page) => console.log('Page changed:', page)}
        onPageSizeChange={(size) => console.log('Page size changed:', size)}
        totalCount={data.length}
        actionButtons={actionButtons}
        onModify={handleModify}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}