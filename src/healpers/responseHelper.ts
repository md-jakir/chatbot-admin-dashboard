import { closeDrawer } from '@/redux/features/sidebar/drawerConfigSlice';
import { toggleUpdate } from '@/redux/features/sidebar/updateFlag';
import { toast } from '@/components/ui/use-toast';
import { useDispatch } from 'react-redux';
import { closeModal } from '@/redux/features/sidebar/modalConfig';

export default function useResponseHandler() {
  const dispatch = useDispatch();

  const responseHandler = async (
    promise: Promise<any>,
    errorMessage?: string,
  ) => {
    try {
      const response = await promise;

      if (response?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            response?.error?.data?.message ||
            response?.data?.message ||
            errorMessage ||
            'Something went wrong',
        });

        return response.error;
      }

      toast({
        title: 'Success',
        description: response.data.message,
      });

      dispatch(closeDrawer());
      dispatch(toggleUpdate());
      dispatch(closeModal());

      return response;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description:
          error?.data?.message ||
          error?.error?.data?.message ||
          errorMessage ||
          'Something went wrong',
      });

      return error?.data?.message;
    }
  };

  return responseHandler;
}
