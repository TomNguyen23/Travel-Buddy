import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"  
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useChangePasswordMutation } from "@/api/featureApi/userApiSlice";

const ChangePasswordCard = () => {
    const { toast } = useToast();
    const [changePassword] = useChangePasswordMutation();
    const formik = useFormik({
        initialValues: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().required('Bắt buộc nhập'),
            newPassword: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 kí tự').required('Bắt buộc nhập'),
            confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Mật khẩu phải khớp với nhau').required('Bắt buộc nhập'),
        }),
        onSubmit: async (values) => {
            // eslint-disable-next-line no-unused-vars
            const { confirmNewPassword, ...otherValues } = values;
            
            await changePassword(otherValues)
                .unwrap()
                .then(() => {
                    toast({
                        title: "Thành công!",
                        description: "Mật khẩu đã được thay đổi",
                    })
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
        <Card className="w-full px-4 mt-4 dark:bg-gray-900">
                <CardHeader>
                    <CardTitle>Đổi mật khẩu</CardTitle>
                </CardHeader>
                <form onSubmit={formik.handleSubmit}>
                    <CardContent className="grid w-full items-center gap-1">
                        <div className="flex flex-col space-y-1.5">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Mật khẩu cũ</span>
                                </div>
                                <input type="password"
                                    id="oldPassword" 
                                    name="oldPassword"
                                    className="input input-bordered w-full rounded-sm"
                                    onChange={formik.handleChange}
                                    value={formik.values.oldPassword}
                                />
                            </label>
                            {formik.errors.oldPassword ? <div className='text-red-500 text-sm'>{formik.errors.oldPassword}</div> : null}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Mật khẩu mới</span>
                                </div>
                                <input type="password"
                                        id="newPassword" 
                                        name="newPassword"
                                        className="input input-bordered w-full rounded-sm"
                                        onChange={formik.handleChange}
                                        value={formik.values.newPassword}
                                    />
                            </label>
                            {formik.errors.newPassword ? <div className='text-red-500 text-sm'>{formik.errors.newPassword}</div> : null}
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Nhập lại mật khẩu mới</span>
                                </div>
                                <input type="password"
                                        id="confirmNewPassword" 
                                        name="confirmNewPassword"
                                        className="input input-bordered w-full rounded-sm"
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmNewPassword}
                                    />
                            </label>
                            {formik.errors.confirmNewPassword ? <div className='text-red-500 text-sm'>{formik.errors.confirmNewPassword}</div> : null}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button type='submit' className="bg-main hover:bg-main-hover">Xác nhận</Button>
                    </CardFooter>
                </form>
            </Card>
     );
}
 
export default ChangePasswordCard;