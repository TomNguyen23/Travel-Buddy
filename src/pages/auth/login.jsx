import './auth.css';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { login  } from '@/redux/reducer/auth.reducer';
import { useLoginMutation } from '@/api/featureApi/authApiSlice';
import { setCredentials } from '@/redux/reducer/auth.reducer';



const LoginPage = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const formik = useFormik({
        initialValues: {
            emailOrUsername: '',
            password: ''
        },
        validationSchema: Yup.object({
            emailOrUsername: Yup.string().required('Băt buộc nhập'),
            password: Yup.string().required('Bắt buộc nhập')
        }),
        onSubmit: async (values) => {
            // dispatch(login(values))
            // .unwrap()
            // .then((res) => {
            //     console.log(res)
            // })
            // .catch((err) => {
            //     console.log(err)
            //     toast({
            //         variant: "destructive",
            //         title: "Uh oh! Có gì đó sai sai.",
            //         description: err.message,
            //         action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            //     })
            // })

            await login(values)
            .unwrap()
            .then((res) => {
                dispatch(setCredentials(res));
                navigateTo('/your-profile');
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
        <div>
            <header>
                <h1 className="font-playpen text-4xl font-semibold py-5">Greetings!</h1>
                <p>Một ngày thật tuyệt vời để đi khám phá</p>
                <p>Đăng nhập ngay để chia sẻ trải nghiệm của bản thân cùng cộng đồng</p>
            </header>

            <form className='mt-10' onSubmit={formik.handleSubmit}>
                <label className='relative cursor-pointer'>
                    <input type="text" 
                        placeholder="Email..." 
                        className='h-12 w-full px-3 dark:bg-[#1D232A] text-slate-600 dark:text-white border-slate-700 border rounded-md border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200' 
                        id='emailOrUsername'
                        name='emailOrUsername'
                        onChange={formik.handleChange}
                        value={formik.values.emailOrUsername}
                    />
                    <span className='text-md bg-white rounded-md dark:bg-[#1D232A] text-slate-500 text-opacity-80 absolute left-2 bottom-0 px-1 transition duration-200 input-text'>Email</span>
                </label>
                {formik.errors.emailOrUsername && <div className='text-red-500 text-sm'>{formik.errors.emailOrUsername}</div>}

                <label className='relative cursor-pointer'>
                    <input type="password" 
                        placeholder="Password..." 
                        className='h-12 w-full px-3 text-md dark:bg-[#1D232A] text-slate-600 dark:text-white border-slate-700 border rounded-md border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 mt-6'
                        id='password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <span className='text-md bg-white rounded-md dark:bg-[#1D232A] text-slate-500 text-opacity-80 absolute left-2 bottom-0 px-1 transition duration-200 input-text'>Mật khẩu</span>
                </label>
                {formik.errors.password && <div className='text-red-500 text-sm'>{formik.errors.password}</div>}

                <div className='py-4 flex justify-between items-center'>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <label
                            htmlFor="terms"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Nhớ mật khẩu
                        </label>
                    </div>

                    <a href="" className='text-[#7C572B] text-sm'>Quên mật khẩu?</a>
                </div>

                {isLoading 
                ? <Button className='w-full hover:bg-[#f4c17e]' disabled>
                    Đăng nhập  
                    <span className="loading loading-dots loading-md ml-2"></span>
                    </Button>
                : <Button type='submit' className='w-full bg-[#FFAB3E] hover:bg-[#f4c17e]'>Đăng nhập</Button>}

                
            </form>


            <div className="divider mt-10 mb-5">Or</div>

            <div>
            <Button className='w-full bg-[#FEEEE1] hover:bg-[#fadbc2] text-black font-normal flex items-center mb-3'> 
                <FontAwesomeIcon size='xl' icon={faFacebook} className='pr-2' /> Sign in with Facebook
            </Button>

            <Button className='w-full bg-[#FEEEE1] hover:bg-[#fadbc2] text-black font-normal flex items-center pr-8'> 
                <FontAwesomeIcon size='xl' icon={faGoogle} className='pr-2' /> Sign in with Google
            </Button>
            </div>

            <div className='text-center text-sm mt-2'>Chưa có tài khoản? <Link to='/register' className='text-[#7C572B]'>Đăng kí ngay</Link></div>
        </div>
     );
}
 
export default LoginPage;