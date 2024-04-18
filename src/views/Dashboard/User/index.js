import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import { useQueryGetListMember } from 'services/member';
import { CookieStorage } from 'utils/cookie-storage';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';
import { ModalType } from 'constants/common';
import SizeTable from './components/Table';
// import CreateModal from './components/CreateModal';
import Pagination from 'components/Pagination/Pagination';
// import ModalViewDetail from './components/ModalViewDetail';
// import { useQueryGetDetailMember } from 'services/member';
import { useQueryListAccount } from 'services/user';

function User() {
  const isLoggedIn = CookieStorage.isAuthenticated();
  const textColor = useColorModeValue('gray.700', 'white');
  const [searchTitle, setSearchTitle] = useState('');
  const [filter, setFilter] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const history = useHistory();
  const [id, setId] = useState('')

  useEffect(() => {
    if (!isLoggedIn) {
      return history.push('/auth/sign-in');
    }
  }, [isLoggedIn, history]);
  const { isOpen: isCreateModalOpen, onOpen: onOpenCreateModal, onClose: onCloseCreateModal } = useDisclosure();
  const { onClose: onCloseChangeStatusModal, onOpen: onOpenChangeStatusModal } = useDisclosure();
  const {
    isOpen: isOpenViewMemberDetailModal,
    onOpen: onOpenViewMemberDetailModal,
    onClose: onCloseViewMemberDetalModal,
  } = useDisclosure();
  const openModal = useMemo(
    () => ({
      [ModalType.Preview]: onOpenViewMemberDetailModal,
      [ModalType.ChangeStatus]: onOpenChangeStatusModal,
    }),
    [onOpenViewMemberDetailModal, onOpenChangeStatusModal]
  );

  const closeModal = useMemo(
    () => ({
      [ModalType.Add]: onCloseCreateModal,
      [ModalType.Preview]: onCloseViewMemberDetalModal,
      [ModalType.ChangeStatus]: onCloseChangeStatusModal,
    }),
    [onCloseCreateModal, onCloseChangeStatusModal]
  );

  const { data: accountData, refetch } = useQueryListAccount({ ...filter, searchKeyword: filter.searchTitle }, { enabled: isLoggedIn });
  // const { data: userDetail } = useQueryGetDetailUser(id, {
  //   enabled: !!id,
  // });
  const handleCloseModal = modalType => {
    closeModal?.[modalType]?.();
  };

  const handleSearch = () => {
    setFilter({
      ...filter,
      searchTitle: searchTitle,
    });
  };

  const handleViewUserDetail = (id, modalType) => {
    openModal?.[modalType]?.();
    setId(id)
  };

  return (
    <Flex direction="column" pt={{ base: '120px', md: '75px', lg: '100px' }}>
      <Card p="16px" mb="24px" bg="#fff">
        <CardHeader p="12px 5px" mb="12px">
          <Flex justifyContent={'space-between'}>
            <Flex direction={'column'}>
              <Flex direction="column" gap={'30px'}>
                <Text fontSize="xl" color={textColor} fontWeight="bold">
                  Quản lý tài khoản
                </Text>
              </Flex>
              {/* <Flex justifyContent={'space-between'} alignItems={'end'} gap={'20px'} mt={'20px'}>
                <Stack>
                  <Flex alignItems={'center'} gap={'20px'} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                    <FormControl minWidth={{ base: 'full', sm: '300px' }}>
                      <FormLabel>Search:</FormLabel>
                      <Input value={searchTitle} onChange={e => setSearchTitle(e.target.value)} />
                    </FormControl>
                    <Button variant="primary" maxH="40px" alignSelf={'end'} onClick={handleSearch}>
                      <Text fontSize="md" fontWeight="bold" cursor="pointer">
                        Search
                      </Text>
                    </Button>
                  </Flex>
                </Stack>
              </Flex> */}
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody overflowX="auto">
          <Stack overflow={'auto'}>
            <SizeTable data={accountData || []} handleViewUserDetail={handleViewUserDetail} refetch={refetch} />
          </Stack>
          <Flex justifyContent={'flex-end'}>
            <Pagination
              page={accountData?.pagination?.page}
              pageLength={accountData?.pagination?.pageSize}
              totalRecords={accountData?.pagination?.count}
              onPageChange={(page, pageLength) => {
                setFilter({
                  ...filter,
                  pageSize: pageLength,
                  pageIndex: page - 1,
                });
              }}
            />
          </Flex>
        </CardBody>
      </Card>
      {/* {isCreateModalOpen && <CreateModal isOpen={isCreateModalOpen} onClose={handleCloseModal} refetch={refetch} />}
      {isOpenViewMemberDetailModal && <ModalViewDetail isOpen={isOpenViewMemberDetailModal} onClose={handleCloseModal} data={userDetail?.data} />} */}
    </Flex>
  );
}

export default User;
