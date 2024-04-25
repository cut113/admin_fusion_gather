import { Box, Flex, FormControl, IconButton, Switch, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, createColumnHelper } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import isEmpty from 'lodash/isEmpty';
import { TbTextResize } from 'react-icons/tb';
import { MdOutlineColorLens } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { ModalType } from 'constants/common';
import { toast } from 'components/Toast';
import { useDeleteCategoryMutation, useSetBestCategoryMutation } from 'services/category';

const SizeTable = ({ categoryData, handleUpdateCategory, refetch }) => {
  const history = useHistory();
  const [sorting, setSorting] = useState([]);
  const columnHelper = createColumnHelper();
  const setBestCategoryMutation = useSetBestCategoryMutation();
  const deleteCategoryMutation = useDeleteCategoryMutation();
  const handleRowClick = (ticket, type) => {
    handleUpdateCategory(ticket, type);
  };

  const handleDeleteSize = async category => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa danh mục này không?');
    if (!confirmDelete) {
      return;
    }
    deleteCategoryMutation.mutate(
      { id: category?.id },
      {
        onSuccess: () => {
          toast.showMessageSuccess('Xóa danh mục thành công');
          refetch?.();
        },
        onError: () => {
          toast.showMessageError('Xóa danh mục không thành công');
          refetch?.();
        },
      }
    );
  };


  const handleSwitchChange = category => {
    handleBestCategory(category);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('categoryName', {
        header: 'Name',
        cell: info => info.getValue(),
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
            {/* <IconButton
              bg="transparent"
              onClick={() => {
                history.push(`/admin/category/${info?.row?.original?._id}/size`);
              }}
            >
              <TbTextResize size={16} />
            </IconButton>
            <IconButton
              bg="transparent"
              onClick={() => {
                history.push(`/admin/category/${info?.row?.original?._id}/colors`);
              }}
            >
              <MdOutlineColorLens size={16} />
            </IconButton> */}
            <IconButton
              bg="transparent"
              onClick={() => {
                handleDeleteSize(info?.row?.original);
              }}
            >
              <DeleteIcon color="red.400" boxSize={4} />
            </IconButton>
          </Flex>
        ),
      }),
    ],
    [categoryData]
  );

  const table = useReactTable({
    data: categoryData || [],
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
            <Td textAlign="center" colSpan={4}>
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
