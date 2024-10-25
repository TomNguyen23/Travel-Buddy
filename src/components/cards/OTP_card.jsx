import { useEffect, useState } from 'react';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { Button } from "@/components/ui/button"

import PropTypes from 'prop-types';

const OTPcard = (props) => {
    const { toast } = useToast();
    const [value, setValue] = useState("");
    const [counter, setCounter] = useState(props.countdown);


    useEffect(() => {
        const timer = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevCounter - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return { minutes, remainingSeconds };
    };

    const { minutes, remainingSeconds } = formatTime(counter);

    const handleSubmitInChild = async (e) => {
        e.preventDefault();
        if (value.length !== 6) {
            toast({
                variant: "destructive",
                title: "Mã OTP phải đủ 6 ký tự",
            })
            return;
        }

        if (counter === 0) {
            toast({
                variant: "destructive",
                title: "Thời gian đã hết",
                description: "Mã OTP của bạn đã hết hạn. Vui lòng yêu cầu mã mới.",
                action: <ToastAction altText="Try again">Thử lại</ToastAction>,
            });
            return;
        }

        if (isNaN(value)) {
            toast({
                variant: "destructive",
                title: "Mã OTP phải là số",
            });
            return;
        }

        props.handleSubmitInParent(value);
        
    };

    return ( 
        <Card className="w-[40rem] shadow-lg">
            <CardHeader>
                <CardTitle>Xác minh bằng OTP</CardTitle>
                <CardDescription>Hãy xác minh bằng cách nhập mã OTP được gửi đến email <strong>{props.email}</strong> để hoàn tất thao tác của bạn</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmitInChild}>
                <CardContent className="flex flex-col items-center my-3">
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={value} onChange={(value) => setValue(value)}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPGroup key={index} className="font-medium">
                                <InputOTPSlot index={index} className='h-14 w-12' />
                            </InputOTPGroup>
                        ))}
                    </InputOTP>

                    <div className="w-full mt-3 flex justify-center text-sm text-muted-foreground">
                        <div className="flex items-center">
                            <p>Mã hết hạn sau:</p>
                            <span className="countdown pl-1 text-red-700">
                                <span style={{"--value": minutes}}></span>:
                                <span style={{"--value": remainingSeconds}}></span>
                            </span> 
                            <span className="text-red-700">s</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-center">
                    {
                        props.isLoading 
                        ? <Button className="mt-4 px-20" disabled>
                            Xác minh
                            <span className="loading loading-dots loading-md ml-2"></span>
                        </Button>
                        : <Button type="submit" className="mt-4 px-20 bg-[#FFAB3E] hover:bg-[#f4c17e]">Xác minh</Button>
                    }
                    <p className="text-sm text-muted-foreground">Không nhận được mã? <span className="text-blue-400 cursor-pointer">gửi lại</span> </p>
                </CardFooter>
            </form>
        </Card>
     );
}
OTPcard.propTypes = {
    handleSubmitInParent: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    countdown: PropTypes.number.isRequired,
};

export default OTPcard;