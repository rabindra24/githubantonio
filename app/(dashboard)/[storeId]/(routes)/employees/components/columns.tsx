"use client"
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type ProductColumn = {
    id: string
    name: string
    salary : string
    address : string
    number : string
    
    createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'salary',
        header: 'Salary',
    },
    {
        accessorKey: 'address',
        header: 'Address',
    },
    {
        accessorKey: 'number',
        header: 'Number',
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
    },
    // {
    //     id: 'actions',
    //     cell: ({ row }) => <CellAction data={row.original} />
    // }
]