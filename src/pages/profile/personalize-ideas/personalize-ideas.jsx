import { useState } from "react";

import PersionlizeCard from "@/components/cards/other_cards/personalize_card";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { useGetPersonalizeQuery, usePostPersonalizeMutation } from "@/api/featureApi/userApiSlice";
import { useNavigate } from "react-router-dom";

const PersonalizeIdeas = () => {
    const { toast } = useToast();
    const navigateTo = useNavigate();
    const [checkedValues, setCheckedValues] = useState([]);

    const handleCheckboxChange = (id, isChecked) => {
        setCheckedValues(prevValues => {
            if (isChecked) {
                return [...prevValues, id];
            } else {
                return prevValues.filter(value => value !== id);
            }
        });
    };

    const [postPersonalize, {isLoading}] = usePostPersonalizeMutation();
    const handleConfirm = async () => {
        // console.log(checkedValues);

        await postPersonalize({selectedIds: checkedValues})
          .then(() => {
            navigateTo('/')
          })
          .catch((error) => {
              toast({
                  variant: "destructive",
                  title: "Uh oh! Có gì đó sai sai.",
                  description: error.data.message,
                  action: <ToastAction altText="Try again">Thử lại</ToastAction>,
              })
          })
    };

    const {data} = useGetPersonalizeQuery();

    return (  
        <div className="px-72 flex flex-col items-center">
            <div className="text-center">
                <h1 className="text-3xl font-bold p-2">Chọn ít nhất 5 địa điểm khiến bạn cảm thấy mới mẻ và thú vị</h1>
                <p>Điều này giúp chúng tôi mang đến cho bạn trải nghiệm tuyệt vời hơn!</p>
            </div>

            <div className="mt-7 pt-1 flex max-h-[31rem] justify-between flex-wrap overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {data?.choices.map(item => (
                    <PersionlizeCard key={item.siteId} id={item.siteId} destinationName={item.siteName} media={item.pictureUrl} onCheckboxChange={handleCheckboxChange} />
                ))}
            </div>

            
            {isLoading 
                ? <Button className='mt-3 w-1/5 bg-main hover:bg-main-hover' disabled>
                    Đang xác nhận 
                    <span className="loading loading-dots loading-md ml-2"></span>
                </Button>
                : <Button className="mt-3 w-1/5 bg-main hover:bg-main-hover" onClick={handleConfirm}>Xác nhận</Button>}
        </div>
    );
}
 
export default PersonalizeIdeas;