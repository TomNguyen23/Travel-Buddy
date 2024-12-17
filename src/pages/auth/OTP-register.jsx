import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useOTPverificationMutation } from "@/api/featureApi/authApiSlice";
import { clearRegister } from "@/redux/reducer/auth.reducer";
import OTPcard from "@/components/cards/other_cards/OTP_card";

const OTPRegister = () => {
    const { toast } = useToast();

    const email = useSelector(state => state?.auth?.register?.user?.email);
    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [sendOTP, { isLoading }] = useOTPverificationMutation();

    const handleSubmit = async (value) => {
        await sendOTP({ email: email, otp: value })
                .unwrap()
                .then(() => {
                    dispatch(clearRegister());
                    navigateTo('/personalize')
                })
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Có gì đó sai sai.",
                        description: error.data.message,
                        action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                    })
                });
    };

    return ( 
        <div className="flex justify-center">
            <OTPcard email={email} isLoading={isLoading} countdown="900" handleSubmitInParent={handleSubmit} />
        </div>
     );
}
 
export default OTPRegister;