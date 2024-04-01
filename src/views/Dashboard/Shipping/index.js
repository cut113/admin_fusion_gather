import { useRef, useState } from 'react';
import { Button, Flex, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import Pagination from 'components/Pagination/Pagination';
import { toast } from 'components/Toast';

export default function Shipping() {
    const history = useHistory();
    const inputImportRef = useRef();
    const textColor = useColorModeValue('gray.700', 'white');
    const [filter, setFilter] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    return (
        <>
            <Flex direction="column" pt={{ base: '120px', md: '75px', lg: '100px' }}>
                <Card p="16px" mb="24px" bg="#fff">
                    <CardHeader p="12px 5px" mb="12px">
                        <Flex justifyContent={'space-between'}>
                            <Flex direction={'column'}>
                                <Flex direction="column" gap={'30px'}>
                                    <Text fontSize="xl" color={textColor} fontWeight="bold">
                                        Vận chuyển
                                    </Text>
                                </Flex>
                            </Flex>
                            <Button
                                bg="#3182ce"
                                color="#fff"
                                _hover={{ bg: '#67a1d7' }}
                                onClick={() => {
                                    history.push('/admin/product/create');
                                }}
                            >
                                <Text fontSize="md" fontWeight="bold" cursor="pointer">
                                    Thêm
                                </Text>
                            </Button>
                        </Flex>
                    </CardHeader>
                    <CardBody overflowX="auto">
                        <Stack overflow={'auto'}>
                            {/* <ProductTable productsData={productsData?.data || []} refetch={refetch} /> */}
                        </Stack>
                        {/* <Flex justifyContent={'flex-end'}>
                            {!isEmpty(orderData?.data) && (
                                <Pagination
                                    page={orderData?.pagination?.page}
                                    pageLength={orderData?.pagination?.pageSize}
                                    totalRecords={orderData?.pagination?.count}
                                    onPageChange={(page, pageLength) => {
                                        setFilter({
                                            ...filter,
                                            pageSize: pageLength,
                                            pageIndex: page - 1,
                                        });
                                    }}
                                />
                            )}
                        </Flex> */}
                    </CardBody>
                </Card>
            </Flex>
            {/* {isCreateModalOpen && (
          <CreateSizeModal sizeDetail={sizeEditing} isOpen={isCreateModalOpen} onClose={handelCloseModal} refetch={refetch} />
        )} */}
        </>
    );
}
