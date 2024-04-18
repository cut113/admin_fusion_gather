import { Box, Flex, FormControl, IconButton, Switch, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { formatDate } from 'utils/helpers';
import { BiCommentDetail } from 'react-icons/bi';
import { ModalType } from 'constants/common';

const SizeTable = ({ data, handleUpdateCategory, refetch }) => {
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();

  const handleRowClick = (ticket, type) => {
    handleUpdateCategory(ticket, type);
  };
  const columns = useMemo(
    () => [
      columnHelper.accessor('firstName', {
        header: 'First Name',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('lastName', {
        header: 'Last Name',
        cell: info => info.getValue(),
      }),

      columnHelper.accessor('email', {
        header: 'Email',
        cell: info => info.getValue(),
      }),

      columnHelper.accessor('dob', {
        header: 'Birth Day',
        cell: info => info.getValue(),
      }),

      columnHelper.accessor('phoneNumber', {
        header: 'Phone Number',
        cell: info => info.getValue(),
      }),

      columnHelper.accessor('createdAt', {
        header: 'Created At',
        cell: info => <Text whiteSpace={'nowrap'}>{formatDate(info.row.original.createdAt, 'DD.MM.YYYY hA')}</Text>,
      }),
      columnHelper.accessor('isAdmin', {
        header: 'Admin',
        cell: info => (
          <FormControl display="flex" alignItems="center">
            <Switch isChecked={info.row.original.isAdmin} />
          </FormControl>
        ),
      }),
    ],
    [data]
  );

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Table>
      <Thead>
        {table.getHeaderGroups().map(headerGroup => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <Th key={header.id} w="120px">
                {header.isPlaceholder ? null : (
                  <Box cursor={header.column.getCanSort() ? 'pointer' : 'default'} onClick={header.column.getToggleSortingHandler()}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null}
                  </Box>
                )}
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {isEmpty(table.getRowModel().rows) ? (
          <Tr>
            <Td textAlign="center" colSpan={6}>
              Không có dữ liệu
            </Td>
          </Tr>
        ) : (
          table.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Td>
              ))}
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
};

export default SizeTable;
