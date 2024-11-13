import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
// import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
// import { RootState } from '@/redux/store';
// import { useLoginAdminMutation } from '@/redux/features/auth/auth.api';
// import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/router';
// import useResponseHandler from '@/healpers/responseHelper';
import { toast } from '@/components/ui/use-toast';
import useResponseHandler from '@/healpers/responseHelper';
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from '@/redux/features/auth/auth.api';

interface LoginFormInputs {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  rememberMe: boolean;
  profileDescription?: string;
  confirmPassword?: string;
}

const useLoginSubmit = () => {
  const router = useRouter();

  const     [loading, setLoading] = useState(false);
  // const state = useSelector((_state: RootState) => _state.auth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  // const [registerDoctor] = useRegisterDoctorMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();
  const responseHandler = useResponseHandler();

  function updateAction(payload: LoginFormInputs) {
    dispatch({
      type: 'register/updateState',
      payload,
    });
  }

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: res.error,
      });
    } else {
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
      router.push('/');
    }
    setLoading(false);
  };

  const submitRegister = async (data: { profileDescription?: string }) => {
    dispatch({
      type: 'register/updateState',
      profileDescription: data.profileDescription,
    });

    // const payload = {
    //   ...state,
    //   ...data,
    //   profilePhoto:
    //     'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png ',
    // };

    // await responseHandler(registerDoctor(payload), 'Failed to register');

    setLoading(false);

    // if (res) router.push('/verify-otp');
  };

  const submitForgotPassword: SubmitHandler<LoginFormInputs> = async (data) => {
    await responseHandler(
      forgotPassword(data.email),
      'Failed to send reset link',
    );
    setLoading(false);
  };

  const submitResetPassword: SubmitHandler<LoginFormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Password and confirm password does not match',
      });

      return;
    }

    const token = router?.query?.token as string;
    if (!token) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Token is missing',
      });

      return;
    }

    const response = await responseHandler(
      resetPassword({ password: data?.password, token }),
      'Failed to reset password',
    );
    setLoading(false);

    if (response) router.push('/sign-in');
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
    clearErrors,
    updateAction,
    submitRegister,
    submitForgotPassword,
    submitResetPassword,
  };
};

export default useLoginSubmit;
