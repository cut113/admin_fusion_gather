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
import { CookieStorage } from 'utils/cookie-storage';
import { useHistory } from 'react-router-dom';
import { useMemo } from 'react';
import { ModalType } from 'constants/common';
import SizeTable from './components/Table';
// import CreateCategoryModal from './components/CreateCategoryModal';
import Pagination from 'components/Pagination/Pagination';
import { useQueryGetgetListEvent } from 'services/event';

function Events() {
    const isLoggedIn = CookieStorage.isAuthenticated();
    const textColor = useColorModeValue('gray.700', 'white');
    const history = useHistory();
    const [events, setEvents] = useState([])
    const [sizeEditing, setSizeEditing] = useState(null);
    const [filter, setFilter] = useState({
        pageNumber: 1,
        pageSize: 20,
        all: 1
    });
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            return history.push('/auth/sign-in');
        }
    }, [isLoggedIn, history]);

    const { isOpen: isCreateModalOpen, onOpen: onOpenCreateModal, onClose: onCloseCreateModal } = useDisclosure();
    const { isOpen: isChangeStatusModalOpen, onOpen: onOpenChangeStatusModal, onClose: onCloseChangeStatusModal } = useDisclosure();
    const openModal = useMemo(
        () => ({
            [ModalType.Add]: onOpenCreateModal,
            [ModalType.ChangeStatus]: onOpenChangeStatusModal,
        }),
        [onOpenCreateModal, onOpenChangeStatusModal]
    );

    const handleCloseModal = modalType => {
        closeModal?.[modalType]?.();
    };
    const getQueryOptions = () => {
        const pageSize = filter.pageSize ? parseInt(filter.pageSize) : undefined;
        const pageNumber = filter.pageNumber
        const skipN = (pageNumber - 1) * pageSize || 0;
        const limitN = pageSize || undefined;
        const queryOptions = {
            pageSize,
            pageNumber,
            skipN,
            limitN,
        };
        return queryOptions;
    }
    const pagingResponse = (total) => {
        // console.log(Math.ceil(total / pageSize));
        // const total = events?.length
        return {
            count: total || 0,
            page: filter.pageNumber,
            pageSize: getQueryOptions.pageSize || total,
            totalPage: getQueryOptions.pageSize ? Math.ceil(total / pageSize) : total ? 1 : 0,
        };
    }

    const pagination = pagingResponse(events?.length)
    const closeModal = useMemo(
        () => ({
            [ModalType.Add]: onCloseCreateModal,
            [ModalType.ChangeStatus]: onCloseChangeStatusModal,
        }),
        [onCloseCreateModal, onCloseChangeStatusModal]
    );

    const { data: listEvents, refetch } = useQueryGetgetListEvent({ ...filter }, { enabled: isLoggedIn });
    useEffect(() => {
        setEvents(listEvents)
    }, [listEvents])
    const handleUpdateItem = (size, modalType) => {
        openModal?.[modalType]?.();
        setSizeEditing(size);
    };

    const handelCloseModal = modalType => {
        closeModal?.[modalType]?.();
        setSizeEditing(null);
    };

    const handleSearch = () => {
        setFilter({
            ...filter,
            searchString: searchTitle,
        });
    };
    return (
        <Flex direction="column" pt={{ base: '120px', md: '75px', lg: '100px' }}>
            <Card p="16px" mb="24px" bg="#fff">
                <CardHeader p="12px 5px" mb="12px">
                    <Flex justifyContent={'space-between'}>
                        <Flex direction={'column'}>
                            <Flex direction="column" gap={'30px'}>
                                <Text fontSize="xl" color={textColor} fontWeight="bold">
                                    Quản lý sự kiện
                                </Text>
                            </Flex>
                            <Flex justifyContent={'space-between'} alignItems={'end'} gap={'20px'} mt={'20px'}>
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
                            </Flex>
                        </Flex>
                        {/* <Button bg="#3182ce" color="#fff" _hover={{ bg: '#67a1d7' }} onClick={onOpenCreateModal}>
                            <Text fontSize="md" fontWeight="bold" cursor="pointer">
                                Add event
                            </Text>
                        </Button> */}
                    </Flex>
                </CardHeader>
                <CardBody overflowX="auto">
                    <Stack overflow={'auto'}>
                        <SizeTable data={events || []} refetch={refetch} />
                    </Stack>
                    <Flex justifyContent={'flex-end'}>
                        <Pagination
                            page={pagination?.page}
                            pageLength={pagination?.pageSize}
                            totalRecords={pagination?.count}
                            onPageChange={(page, pageLength) => {
                                setFilter({
                                    ...filter,
                                    pageSize: pageLength,
                                    pageNumber: page - 1,
                                });
                            }}
                        />
                    </Flex>
                </CardBody>
            </Card>
            {isCreateModalOpen && <CreateModal isOpen={isCreateModalOpen} onClose={handleCloseModal} refetch={refetch} />}
        </Flex>
    );
}

export default Events;
