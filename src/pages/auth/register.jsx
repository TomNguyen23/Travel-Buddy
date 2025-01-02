import './auth.css';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import icon from '@/assets/images/icon.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '@/redux/reducer/auth.reducer';

const RegisterPage = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Địa chỉ email không hợp lệ').required('Bắt buộc nhập'),
            password: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 kí tự').required('Bắt buộc nhập'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu phải khớp với nhau').required('Bắt buộc nhập'),
        }),
        onSubmit: (values) => {
            try {
                // eslint-disable-next-line no-unused-vars
                const { confirmPassword, ...otherValues } = values;
                const terms = document.getElementById('terms').checked;

                if (!terms) {
                    toast({
                        variant: "destructive",
                        title: "Bạn chưa đồng ý với các điều khoản",
                    })
                    return;
                }
                dispatch(register(otherValues));
                navigateTo('/register/username');
            } catch (error) {
                console.log(error);
            }
        }
    });


    return (
        <>
            <header className='text-center'>
                <img src={icon} alt="" />
                <h1 className="font-playpen text-4xl font-semibold py-5">Thật tuyệt!</h1>
                <p>Chỉ vài bước nữa và bạn có thể tận hưởng</p>
                <p>sở thích đi du lịch cùng với tất cả mọi người</p>
            </header>

            <form className='mt-8' onSubmit={formik.handleSubmit}>
                <label className='relative cursor-pointer'>
                    <input type="text" 
                        placeholder="Email..." 
                        className='h-12 w-full px-3 text-md dark:bg-[#1D232A] text-slate-600 dark:text-white border-slate-700 border rounded-md border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200' 
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <span className='text-md bg-white rounded-md dark:bg-[#1D232A] text-slate-500 text-opacity-80 absolute left-1 bottom-0 px-1 transition duration-200 input-text'>Nhập email của bạn</span>
                </label>
                {formik.errors.email ? <div className='text-red-500 text-sm'>{formik.errors.email}</div> : null}

                <label className='relative cursor-pointer'>
                    <input type="password" 
                        placeholder="Password..." 
                        className='h-12 w-full px-3 text-md dark:bg-[#1D232A] text-slate-600 dark:text-white border-slate-700 border rounded-md border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 mt-6'
                        id='password'
                        name='password'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <span className='text-md bg-white rounded-md dark:bg-[#1D232A] text-slate-500 text-opacity-80 absolute left-1 bottom-0 px-1 transition duration-200 input-text'>Nhập mật khẩu</span>
                </label>
                {formik.errors.password ? <div className='text-red-500 text-sm'>{formik.errors.password}</div> : null}

                
                <label className='relative cursor-pointer'>
                    <input type="password" 
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder="Confirm password..." 
                            className='h-12 w-full px-3 text-md dark:bg-[#1D232A] text-slate-600 dark:text-white border-slate-700 border rounded-md border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 mt-6'
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                    />
                    <span className='text-md bg-white rounded-md dark:bg-[#1D232A] text-slate-500 text-opacity-80 absolute left-1 bottom-0 px-1 transition duration-200 input-text'>Nhập lại mật khẩu</span>
                </label>
                {formik.errors.confirmPassword ? <div className='text-red-500 text-sm'>{formik.errors.confirmPassword}</div> : null}

                <div className='py-4 flex justify-between items-center'>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id='terms' className="checkbox checkbox-sm ml-2 dark:checkbox-warning" />
                        <label
                            htmlFor="terms"
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Tôi đồng ý với <a href="" className='text-[#7C572B]'>chính sách điều khoản</a>
                        </label>
                    </div>

                </div>

                <Button type='submit' className='w-full bg-main hover:bg-main-hover'>Tiếp theo</Button>
            </form>


            {/* <div className="divider mt-10 mb-5">Or</div>

            <div>
            <Button className='w-full bg-[#e0faf7] hover:bg-[#cbf6f1] text-black font-normal flex items-center mb-3'> 
                <FontAwesomeIcon size='xl' icon={faFacebook} className='pr-2' /> Sign in with Facebook
            </Button>

            <Button className='w-full bg-[#e0faf7] hover:bg-[#cbf6f1] text-black font-normal flex items-center pr-8'> 
                <FontAwesomeIcon size='xl' icon={faGoogle} className='pr-2' /> Sign in with Google
            </Button>
            </div> */}

            <div className='text-center text-sm mt-2'>Đã có tài khoản? <Link to='/login' className='text-[#7C572B]'>Đăng nhập ngay</Link></div>
        </>

     );
}
 
export default RegisterPage;