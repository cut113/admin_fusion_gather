import React, { useEffect } from 'react';
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import InputController from 'components/Form/InputController';
import { ModalType } from 'constants/common';
import { toast } from 'components/Toast';
// import { useCreateUserByRoleMutation } from 'services/user';
import { MemberFormValidate } from 'utils/validation';
import { yupResolver } from '@hookform/resolvers/yup';

const CreateMemberModal = ({ isOpen, onClose, refetch }) => {
  const cancelRef = React.useRef();
  // const createUserByRoleMutation = useCreateUserByRoleMutation();
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(MemberFormValidate),
    defaultValues: {
      username: '',
      phone: '',
    },
  });

  const handleSuccess = () => {
    toast.showMessageSuccess(`Add Member Successfully`);
    refetch?.();
    onClose(ModalType.Add);
  };

  const handleError = error => {
    toast.showMessageError(
      error?.response?.data?.errors?.[0]?.msg || error?.response?.data?.msg || `Add Member Successfully`
    );
  };

  const onSubmit = async values => {
    // createUserByRoleMutation.mutate(
    //   { ...values },
    //   {
    //     onSuccess: () => handleSuccess(),
    //     onError: error => handleError(error),
    //   }
    // );
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
        <AlertDialogContent maxW={'600px'} maxH={'400pxs'} >
          <AlertDialogHeader textTransform="uppercase">Add Member</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody >
            <InputController control={control} name="username" label="Name" />
            <InputController control={control} name="phone" label="Phone" />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                onClose(ModalType.Add);
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              ml={3}
              // isLoading={createUserByRoleMutation.isPending}
              onClick={handleSubmit(onSubmit)}
            >
              Add
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateMemberModal;