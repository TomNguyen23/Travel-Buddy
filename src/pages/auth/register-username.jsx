import icon from '@/assets/images/icon.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRegisterMutation } from '@/api/featureApi/authApiSlice';

const RegisterUsername = () => {
    const navigateTo = useNavigate();
    const { toast } = useToast();
    const user = useSelector(state => state.auth.register.user);
    const [registerUser, { isLoading }] = useRegisterMutation();

    const formik = useFormik({
        initialValues: {
            username: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Bắt buộc nhập'),
        }),
        onSubmit: async (values) => {
            const userWithUsername = { ...user, fullName: values.username };
            if (!user) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: "Bạn hãy đăng ký trước khi thêm biệt danh",
                    action: <ToastAction altText="Try again" onClick={navigateTo("/register")}>Thử lại</ToastAction>,
                })
                return;
            } 
            console.log(userWithUsername)

            await registerUser(userWithUsername)
                    .unwrap()
                    .then(() => {
                        navigateTo('/OTP-verification')
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
                <p>Đặt cho bản thân một biệt danh và</p>
                <p>mọi người sẽ gọi bạn bằng biệt danh đó</p>
            </header>

            <form className='flex flex-col items-center' onSubmit={formik.handleSubmit}>
                <Input type='text' 
                        placeholder='Biệt danh...' 
                        className='w-96 h-12 mt-5 border-slate-300 dark:bg-[#1D232A]'
                        id='username'
                        name='username'
                        onChange={formik.handleChange}
                        value={formik.values.username}      
                />
                {formik.errors.username ? <div className='text-red-500 text-sm self-start ml-2 mt-1'>{formik.errors.username}</div> : null}

                {isLoading 
                ? <Button className='w-96 hover:bg-[#f4c17e] mt-5' disabled>
                    Tạo tài khoản 
                    <span className="loading loading-dots loading-md ml-2"></span>
                    </Button>
                : <Button type='submit' className='w-96 bg-[#FFAB3E] hover:bg-[#f4c17e] mt-5'>Tạo tài khoản</Button>}
            </form>
        </>
     );
}
 
export default RegisterUsername;