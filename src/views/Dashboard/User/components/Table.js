import { Box, Flex, FormControl, IconButton, Switch, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { ViewIcon } from '@chakra-ui/icons'
import isEmpty from 'lodash/isEmpty';
import { toast } from 'components/Toast';
import { ModalType } from 'constants/common';
import { useBlockUser } from 'services/user';
import { formatDate } from 'utils/helpers';

const SizeTable = ({ data, refetch, handleViewUserDetail }) => {
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper(data);
  const setBlockUser = useBlockUser()

  const handleBlockUser = async member => {
    // const actionText = member.isBlock ? 'unblock' : 'block';
    const confirmMessage = window.confirm(`Do you want to block this ${member?.username} member?`);
    if (!confirmMessage) {
      return;
    }

    setBlockUser.mutate(
      { id: member.id },
      {
        onSuccess: () => {
          const successMessage = `block user ${member.username} successfully`;
          toast.showMessageSuccess(successMessage);
          refetch?.();
        },
        onError: () => {
          const errorMessage = `block user ${member.username} unsuccessfully`;
          toast.showMessageError(errorMessage);
          refetch?.();
        },
      }
    );
  };
  const handleViewClick = (id, type) => {
    handleViewUserDetail(id, type)
  }
  const columns = useMemo(
    () => [
      columnHelper.accessor('username', {
        header: 'username',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('verificationCode', {
        header: 'Mã kích hoạt',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('isActivated', {
        header: 'Chặn',
        cell: info => (
          <FormControl display="flex" alignItems="center">
            <Switch isChecked={!info.row.original.isActivated} onChange={() => handleBlockUser(info.row.original)} />
          </FormControl>
        ),
      }),
      columnHelper.accessor('isVerified', {
        header: 'Kích hoạt',
        cell: info => (
          <FormControl display="flex" alignItems="center">
            <Switch isChecked={info.row.original.isVerified} />
          </FormControl>
        ),
      }),
      columnHelper.accessor('createdAt', {
        header: 'Ngày tạo',
        cell: info => <Text whiteSpace={'nowrap'}>{formatDate(info.row.original.createdAt, 'DD.MM.YYYY hA')}</Text>,
      }),
      columnHelper.accessor('action', {
        header: '',
        cell: info => (
          <Flex alignItems="center" gap={1}>
            <IconButton
              bg="transparent"
              onClick={() => {
                handleViewClick(info?.row?.original?._id, ModalType.Preview);
              }}
            >
              <ViewIcon cursor="pointer" boxSize={4} />
            </IconButton>
          </Flex>
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
                  <Box cursor={header.column.getCanSort() ? 'pointer' : 'default'} >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {/* {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted()] ?? null} */}
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
            <Td textAlign="center" colSpan={5}>
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
