import './auth.css';
import icon from '@/assets/images/icon.png';
import { Button } from '@/components/ui/button';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { forgetPassword } from '@/redux/reducer/auth.reducer';

const NewPassword = () => {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector((state) => state?.auth?.forgetPasswordInfo?.email);

    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            newPassword: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 kí tự').required('Bắt buộc nhập'),
            confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu phải khớp với nhau').required('Bắt buộc nhập'),
        }),
        onSubmit: async (values) => {
            const newPasswordInfo = {email, ...values};
            // eslint-disable-next-line no-unused-vars
            const { confirmPassword, ...otherValues } = newPasswordInfo;

            dispatch(forgetPassword(otherValues));
            navigateTo('/OTP-verification-forget-password');
            

        }
    });

    return ( 
        <>
            <header className='text-center text-lg'>
                <img src={icon} alt="" />
                <p>Hãy đặt lại mật khẩu và đừng quên nó nữa nhé</p>
            </header>

            <form onSubmit={formik.handleSubmit}>
                <label className='relative cursor-pointer'>
                    <input type="password" 
                        placeholder="Password..." 
                        className='h-12 w-full px-3 text-md dark:bg-[#1D232A] text-slate-600 dark:text-white border-slate-700 border rounded-md border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 mt-6'
                        id='newPassword'
                        name='newPassword'
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <span className='text-md bg-white rounded-md dark:bg-[#1D232A] text-slate-500 text-opacity-80 absolute left-1 bottom-0 px-1 transition duration-200 input-text'>Mật khẩu mới</span>
                </label>
                {formik.errors.newPassword ? <div className='text-red-500 text-sm'>{formik.errors.newPassword}</div> : null}

                
                <label className='relative cursor-pointer'>
                    <input type="password" 
                            id='confirmPassword'
                            name='confirmPassword'
                            placeholder="Confirm password..." 
                            className='h-12 w-full px-3 text-md dark:bg-[#1D232A] text-slate-600 dark:text-white border-slate-700 border rounded-md border-opacity-50 outline-none focus:border-blue-500 placeholder-gray-300 placeholder-opacity-0 transition duration-200 mt-6'
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                    />
                    <span className='text-md bg-white rounded-md dark:bg-[#1D232A] text-slate-500 text-opacity-80 absolute left-1 bottom-0 px-1 transition duration-200 input-text'>Nhập lại mật khẩu mới</span>
                </label>
                {formik.errors.confirmPassword ? <div className='text-red-500 text-sm'>{formik.errors.confirmPassword}</div> : null}

                <Button type='submit' className='w-full bg-main hover:bg-main-hover mt-5'>Tiếp theo</Button>
            </form>
        </>
     );
}
 
export default NewPassword;