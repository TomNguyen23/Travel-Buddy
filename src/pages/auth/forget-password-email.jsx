import icon from '@/assets/images/icon.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '@/redux/reducer/auth.reducer';
import { useEmailForgetPasswordMutation } from '@/api/featureApi/authApiSlice';

const ForgetPasswordEmail = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const { toast } = useToast();
    const [emailForgetPassword, { isLoading }] = useEmailForgetPasswordMutation();

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bắt buộc nhập'),
        }),
        onSubmit: async (values) => {
            await emailForgetPassword(values)
                    .unwrap()
                    .then(() => {
                        dispatch(forgetPassword(values));
                        navigateTo('/new-password');
                    })
                    .catch((error) => {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Có gì đó sai sai.",
                            description: error.data.message,
                            action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                        })
                    })

        }
    });

    return ( 
        <>
            <header className='text-center text-lg'>
                <img src={icon} alt="" />
                <p>Đã quên mất mật khẩu của mình?</p>
                <p>Hãy cho chúng tôi biết email của bạn</p>
            </header>

            <form className='flex flex-col items-center' onSubmit={formik.handleSubmit}>
                <Input type='text' 
                        placeholder='Email của bạn...' 
                        className='w-96 h-12 mt-5 border-slate-300 dark:bg-[#1D232A]'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}      
                />
                {formik.errors.email ? <div className='text-red-500 text-sm self-start ml-2 mt-1'>{formik.errors.email}</div> : null}

                {isLoading 
                ? <Button className='w-96 hover:bg-[#f4c17e] mt-5' disabled>
                    Tạo tài khoản 
                    <span className="loading loading-dots loading-md ml-2"></span>
                    </Button>
                : <Button type='submit' className='w-96 bg-[#FFAB3E] hover:bg-[#f4c17e] mt-5'>Tiếp theo</Button>}
            </form>
        </>
     );
}
 
export default ForgetPasswordEmail;