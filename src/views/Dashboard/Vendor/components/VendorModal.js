import React, { useEffect, useState } from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Switch,
    Flex,
    Text,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import InputController from 'components/Form/InputController';
import { ModalType } from 'constants/common';
import { toast } from 'components/Toast';
import { VendorFormValidate } from 'utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateVendorMutation } from 'services/vendor';

const VendorModal = ({ isOpen, vendorDetail, onClose, refetch }) => {
    const params = useParams();
    const { id: categoryId } = params || {};
    const cancelRef = React.useRef();
    const createVendorMutation = useCreateVendorMutation()
    const { control, handleSubmit, reset, setValue } = useForm({
        resolver: yupResolver(VendorFormValidate),
        defaultValues: {
            name: '',
            status: true,
        },
    });

    useEffect(() => {
        if (vendorDetail) {
            reset({ name: vendorDetail.name, status: vendorDetail.status, id: vendorDetail?._id });
        }
    }, [vendorDetail]);

    const handleSuccess = () => {
        toast.showMessageSuccess(`${vendorDetail ? 'Cập nhật' : 'Tạo'} người bán thành công`);
        refetch?.();
        onClose(ModalType.Add);
    };
    const handleError = error => {
        toast.showMessageError(
            error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.msg || `${vendorDetail ? 'Cập nhật' : 'Tạo'} người bán thành công`
        );
    };

    const handleStatusChange = (e, field) => {
        const { checked } = e.target;
        setValue(field.name, checked);
    };

    const onSubmit = async values => {
        createVendorMutation.mutate({ ...values }, {
            onSuccess: () => handleSuccess(),
            onError: error => handleError(error),
        })
    };

    return (
        <>
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={() => {
                    onClose(ModalType.Add);
                }}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent maxW={'600px'} maxH={'400px'} >
                    <AlertDialogHeader textTransform="uppercase">{vendorDetail ? 'Cập nhật' : 'Tạo'} Người Bán</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody >
                        <InputController control={control} name="name" label="Tên" />
                        {vendorDetail ? <></> :
                            <Controller
                                control={control}
                                name="status"
                                render={({ field, fieldState: { error } }) => (
                                    <Flex flexDirection={"row"} alignItems={"center"} columnGap={2} marginTop={4}>
                                        <Text
                                            fontSize="md"
                                            fontWeight="semibold"
                                        >
                                            Status:
                                        </Text>
                                        <Switch
                                            size="md"
                                            defaultChecked={field.value}
                                            onChange={(e) => handleStatusChange(e, field)}
                                        />
                                    </Flex>
                                )}
                            />
                        }
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button
                            ref={cancelRef}
                            onClick={() => {
                                onClose(ModalType.Add);
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            colorScheme="blue"
                            ml={3}
                            // isLoading={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {vendorDetail ? 'Cập nhật' : 'Tạo'}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    );
};

export default VendorModal;