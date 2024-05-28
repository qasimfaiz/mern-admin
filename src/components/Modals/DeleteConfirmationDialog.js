import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCloseButton,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteOrder } from '../../redux/features/orders/orderThunks';
import { deleteProduct } from '../../redux/features/product/productThunks';
import { deleteUser } from '../../redux/features/user/userThunks';
import { deleteAdmin } from '../../redux/features/admin/adminThunks';

const DeleteConfirmationDialog = ({
  isOpen,
  onClose,
  id,
  itemLabel,
  cancelRef,
}) => {
  const dispatch = useDispatch();

  const handleDelete = id => {
    switch (itemLabel) {
      case 'user':
        dispatch(deleteUser(id));
        break;
      case 'order':
        dispatch(deleteOrder(id));
        break;
      case 'product':
        dispatch(deleteProduct(id));
        break;
      case 'admin':
        dispatch(deleteAdmin(id));
      default:
        break;
    }
    onClose();
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        ref={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {itemLabel}
            </AlertDialogHeader>
            <ModalCloseButton />
            <AlertDialogBody>
              Are you sure you want to delete this {itemLabel}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(id)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteConfirmationDialog;
