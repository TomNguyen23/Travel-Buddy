import { useRemoveAccountMutation } from "@/api/featureApi/userApiSlice"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
  
import { logout } from "@/redux/reducer/auth.reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const RemoveAccountCard = () => {
    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const [removeAccount] = useRemoveAccountMutation();

    const handleRemoveAccount = async () => {
        await removeAccount()
            .unwrap()
            .then(() => {
                dispatch(logout());
                navigateTo('/login');
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
    return ( 
        <Card className="w-full px-4 mt-2 dark:bg-gray-900">
            <CardHeader>
                <CardTitle>Xóa tài khoản</CardTitle>
            </CardHeader>

            <CardContent className="grid w-full items-center">
                    <div className="flex justify-between items-center">
                        <p className="text-sm">Một khi bạn quyết định xóa tài khoản, sẽ không thể hoàn tác. Hãy cân nhắc!</p>
                        <button 
                            className="btn text-white dark:text-black bg-red-500 hover:bg-red-600" 
                            onClick={()=>document.getElementById('remove-acc-modal').showModal()}>
                                Xóa tài khoản
                        </button>

                        <dialog id="remove-acc-modal" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Xác nhận xóa tài khoản</h3>
                                <p className="py-4">Bạn thật sự muốn xóa tài khoản? Cảm ơn bạn đã cùng chúng tôi trải qua những hành trình để lại những kỉ niệm thật đáng nhớ.</p>
                                <div className="modal-action">
                                <form method="dialog" className="space-x-2">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Hủy</button>
                                    <button onClick={handleRemoveAccount} className="btn bg-red-500 hover:bg-red-600 text-white dark:text-black">Xóa</button>
                                </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
            </CardContent>
        </Card>

     );
}
 
export default RemoveAccountCard;