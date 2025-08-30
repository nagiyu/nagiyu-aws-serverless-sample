'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import TextSkeleton from '@client-common/components/feedback/skeleton/TextSkeleton';
import BasicTextField from '@client-common/components/inputs/TextFields/BasicTextField';
import ContainedButton from '@client-common/components/inputs/Buttons/ContainedButton';

export interface EditableColumn<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: any) => React.ReactNode;
  editable?: boolean;
}

export interface ActionButtonConfig {
  showModify?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

interface EditableTableProps<T extends { id: string | number }> {
  columns: EditableColumn<T>[];
  data: T[];
  loading?: boolean;
  pageSize?: number;
  pageIndex?: number;
  pageSizeOptions?: number[];
  onPageChange?: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  totalCount?: number;
  actionButtons?: ActionButtonConfig;
  onModify?: (modifiedData: T[]) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function EditableTable<T extends { id: string | number }>({
  columns,
  data,
  loading = false,
  pageSize = 10,
  pageIndex = 0,
  pageSizeOptions = [10, 25, 100],
  onPageChange,
  onPageSizeChange,
  totalCount = data.length,
  actionButtons = { showModify: true, showEdit: true, showDelete: true },
  onModify,
  onEdit,
  onDelete,
}: EditableTableProps<T>) {
  const [page, setPage] = useState(pageIndex);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  
  // State for managing editable data and changes
  const [editableData, setEditableData] = useState<T[]>(data);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingCells, setEditingCells] = useState<Set<string>>(new Set());

  React.useEffect(() => {
    setPage(pageIndex);
  }, [pageIndex]);

  React.useEffect(() => {
    setRowsPerPage(pageSize);
  }, [pageSize]);

  React.useEffect(() => {
    setEditableData(data);
    setHasChanges(false);
    setEditingCells(new Set());
  }, [data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    onPageChange && onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = +event.target.value;
    setRowsPerPage(newSize);
    setPage(0);
    onPageSizeChange && onPageSizeChange(newSize);
  };

  // Handle cell editing
  const handleCellEdit = useCallback((rowIndex: number, columnId: keyof T, value: any) => {
    setEditableData(prev => {
      const newData = [...prev];
      newData[rowIndex] = { ...newData[rowIndex], [columnId]: value };
      return newData;
    });
    setHasChanges(true);
  }, []);

  // Handle sort operations
  const handleMoveUp = useCallback((index: number) => {
    if (index > 0) {
      setEditableData(prev => {
        const newData = [...prev];
        [newData[index - 1], newData[index]] = [newData[index], newData[index - 1]];
        return newData;
      });
      setHasChanges(true);
    }
  }, []);

  const handleMoveDown = useCallback((index: number) => {
    if (index < editableData.length - 1) {
      setEditableData(prev => {
        const newData = [...prev];
        [newData[index], newData[index + 1]] = [newData[index + 1], newData[index]];
        return newData;
      });
      setHasChanges(true);
    }
  }, [editableData.length]);

  // Handle action buttons
  const handleModify = useCallback(() => {
    if (onModify) {
      onModify(editableData);
      setHasChanges(false);
    }
  }, [editableData, onModify]);

  const handleCancel = useCallback(() => {
    setEditableData(data);
    setHasChanges(false);
    setEditingCells(new Set());
  }, [data]);

  const handleEdit = useCallback((item: T) => {
    if (onEdit) {
      onEdit(item);
    }
  }, [onEdit]);

  const handleDelete = useCallback((item: T) => {
    if (onDelete) {
      onDelete(item);
    }
  }, [onDelete]);

  // Toggle cell editing mode
  const handleCellClick = useCallback((rowIndex: number, columnId: keyof T) => {
    const column = columns.find(col => col.id === columnId);
    if (column?.editable) {
      const cellKey = `${rowIndex}-${String(columnId)}`;
      setEditingCells(prev => {
        const newSet = new Set(prev);
        if (newSet.has(cellKey)) {
          newSet.delete(cellKey);
        } else {
          newSet.add(cellKey);
        }
        return newSet;
      });
    }
  }, [columns]);

  // Enhanced columns with Action and Sort columns
  const enhancedColumns = useMemo(() => {
    const baseColumns = [...columns];
    
    // Add Sort column (second to last)
    baseColumns.push({
      id: 'sort' as keyof T,
      label: 'Sort',
      minWidth: 80,
      align: 'center' as const,
    });

    // Add Action column (last)
    baseColumns.push({
      id: 'action' as keyof T,
      label: 'Action',
      minWidth: 200,
      align: 'center' as const,
    });

    return baseColumns;
  }, [columns]);

  const renderCell = useCallback((row: T, column: EditableColumn<T>, rowIndex: number) => {
    const value = row[column.id];
    const cellKey = `${rowIndex}-${String(column.id)}`;
    const isEditing = editingCells.has(cellKey);

    // Handle special columns
    if (column.id === 'sort') {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px' }}>
          <IconButton
            size="small"
            onClick={() => handleMoveUp(rowIndex)}
            disabled={rowIndex === 0}
          >
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleMoveDown(rowIndex)}
            disabled={rowIndex === editableData.length - 1}
          >
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
        </div>
      );
    }

    if (column.id === 'action') {
      return (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {actionButtons.showModify && (
            <ContainedButton
              label="Modify"
              onClick={handleModify}
              disabled={!hasChanges}
            />
          )}
          {actionButtons.showEdit && (
            <ContainedButton
              label="Edit"
              onClick={() => handleEdit(row)}
            />
          )}
          {actionButtons.showDelete && (
            <ContainedButton
              label="Delete"
              onClick={() => handleDelete(row)}
            />
          )}
          {hasChanges && (
            <ContainedButton
              label="Cancel"
              onClick={handleCancel}
            />
          )}
        </div>
      );
    }

    // Handle editable columns
    if (column.editable && isEditing) {
      return (
        <BasicTextField
          value={String(value || '')}
          onChange={(e) => handleCellEdit(rowIndex, column.id, e.target.value)}
          onBlur={() => setEditingCells(prev => {
            const newSet = new Set(prev);
            newSet.delete(cellKey);
            return newSet;
          })}
          autoFocus
        />
      );
    }

    // Regular cell display
    return (
      <div
        onClick={() => handleCellClick(rowIndex, column.id)}
        style={{ 
          cursor: column.editable ? 'pointer' : 'default',
          minHeight: '24px',
          padding: column.editable ? '4px' : '0'
        }}
      >
        {column.format ? column.format(value) : (value as React.ReactNode)}
      </div>
    );
  }, [editingCells, editableData.length, actionButtons, hasChanges, handleMoveUp, handleMoveDown, handleModify, handleEdit, handleDelete, handleCancel, handleCellEdit, handleCellClick]);

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader aria-label="editable table">
          <TableHead>
            <TableRow>
              {enhancedColumns.map((column) => (
                <TableCell
                  key={String(column.id)}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, rowIndex) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {enhancedColumns.map((column) => (
                    <TableCell key={String(column.id)} align={column.align}>
                      <TextSkeleton />
                    </TableCell>
                  ))}
                </TableRow>
              ))
              : editableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
                const globalRowIndex = page * rowsPerPage + rowIndex;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {enhancedColumns.map((column) => (
                      <TableCell key={String(column.id)} align={column.align}>
                        {renderCell(row, column, globalRowIndex)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={pageSizeOptions}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default EditableTable;