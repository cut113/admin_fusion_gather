import { Box, FormControl, Table, Tbody, Td, Text, Th, Thead, Tr, Switch, Flex, IconButton } from '@chakra-ui/react';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ModalType } from 'constants/common';
import { formatDate } from 'utils/helpers';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useChangeStatusVendorMutation } from 'services/vendor';
const SizeTable = ({ vendorData, handleUpdateVendor, refetch }) => {
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();
  const changeStatusMutation = useChangeStatusVendorMutation()
  const handleRowClick = (ticket, type) => {
    handleUpdateVendor(ticket, type);
  };
  const handleChangeStatus = async vendor => {
    const confirmMessage = window.confirm(`Bạn có chắc chắn muốn thay đổi trạng thái của ${vendor.name}?`);
    if (!confirmMessage) {
      return;
    }
    changeStatusMutation.mutate(
      { id: vendor._id },
      {
        onSuccess: () => {
          const successMessage = `Thay đổi trạng thái thành công`;
          toast.showMessageSuccess(successMessage);
          refetch?.();
        },
        onError: () => {
          const errorMessage = `Thay đổi trạng thái không thành công`;
          toast.showMessageError(errorMessage);
          refetch?.();
        },
      }
    );
  };

  const handleSwitchChange = vendor => {
    handleChangeStatus(vendor);
  };

  const handleDeleteVendor = vendor => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa người bán này không?');
    if (!confirmDelete) {
      return;
    }

    // deleteProductMutation.mutate(
    //   { id: product?._id },
    //   {
    //     onSuccess: () => {
    //       toast.showMessageSuccess('Xóa sản phẩm thành công');
    //       refetch?.();
    //     },
    //     onError: () => {
    //       toast.showMessageError('Xóa sản phẩm thất bại');
    //       refetch?.();
    //     },
    //   }
    // );
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Tên',
        cell: info => info.getValue(),
      }),

      columnHelper.accessor('createdAt', {
        header: 'Ngày tạo',
        cell: info => <Text whiteSpace={'nowrap'}>{formatDate(info.row.original.createdAt, 'hA MMM Do YYYY')}</Text>,
      }),

      // columnHelper.accessor('status', {
      //   header: 'Trạng thái',
      //   cell: info => info.getValue(),
      // }),
      columnHelper.accessor('status', {
        header: 'Trạng thái',
        cell: info => (
          <FormControl display="flex" alignItems="center">
            <Switch isChecked={true} onChange={() => handleSwitchChange(info.row.original)} />
          </FormControl>
        ),
      }),
      columnHelper.accessor('action', {
        header: '',
        cell: info => (
          <Flex alignItems="center" gap={1}>
            <IconButton
              bg="transparent"
              onClick={() => {
                handleRowClick(info?.row?.original, ModalType.Add);
              }}
            >
              <EditIcon cursor="pointer" boxSize={4} />
            </IconButton>
            <IconButton
              bg="transparent"
              onClick={() => {
                handleDeleteVendor(info?.row?.original);
              }}
            >
              <DeleteIcon color="red.400" boxSize={4} />
            </IconButton>
          </Flex>
        ),
      }),
    ],
    [vendorData]
  );

  const table = useReactTable({
    data: vendorData || [],
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
