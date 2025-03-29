import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import DropdownAction from '../data-table/DataTableDropdown.vue'
import DataTableColumnHeader from '../data-table/DataTableColumnHeader.vue'
import { Checkbox } from '../ui/checkbox'
import { formatIsoDateTime } from '@/lib/date'
import { RouterLink } from 'vue-router'
import type { TasksWithProjects } from '@/pages/tasks/index.vue'

type Task = TasksWithProjects[0]

export const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        modelValue:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        // value: boolean | "indeterminate"
        'onUpdate:modelValue': (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
        ariaLabel: 'Select row',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) =>
      h(DataTableColumnHeader<Task, unknown>, { column, class: 'ml-2 h-4 w-4', title: 'Name' }),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('name')),
  },
  {
    accessorKey: 'status',
    header: ({ column }) =>
      h(DataTableColumnHeader<Task, unknown>, {
        column,
        class: 'ml-2 h-4 w-4',
        title: 'Status',
      }),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('status')),
  },
  {
    accessorKey: 'due_date',
    header: ({ column }) =>
      h(DataTableColumnHeader<Task, unknown>, {
        column,
        class: 'ml-2 h-4 w-4',
        title: 'Due Date',
      }),
    cell: ({ row }) => h('div', { class: 'text-left font-medium' }, row.getValue('due_date')),
  },
  {
    accessorKey: 'projects',
    header: ({ column }) =>
      h(DataTableColumnHeader<Task, unknown>, { column, class: 'ml-2 h-4 w-4', title: 'Project' }),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              class: 'text-left font-medium hover:underline',
              to: {
                name: '/projects/[slug]',
                params: { slug: row.original.projects.slug },
              },
            },
            () => row.original.projects?.name,
          )
        : ''
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) =>
      h(DataTableColumnHeader<Task, unknown>, {
        column,
        class: 'ml-2 h-4 w-4',
        title: 'Created',
      }),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-medium' }, formatIsoDateTime(row.getValue('created_at'))),
  },
  {
    accessorKey: 'collaborators',
    header: ({ column }) =>
      h(DataTableColumnHeader<Task, unknown>, {
        column,
        class: 'ml-2 h-4 w-4',
        title: 'Collaborators',
      }),
    cell: ({ row }) =>
      h('div', { class: 'text-left font-medium' }, JSON.stringify(row.getValue('collaborators'))),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'relative' },
        h(DropdownAction, {
          entry: { id: row.original.id.toString() },
          onExpand: row.toggleExpanded,
        }),
      )
    },
  },
]
