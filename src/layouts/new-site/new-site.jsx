import { Toaster } from "@/components/ui/toaster";
import PropTypes from "prop-types";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NewSitelayout = ({children}) => {
    const location = useLocation();

    const pathToStepMap = {
        '/new-site/site-type': 1,
        '/new-site/site-info': 2,
        '/new-site/site-media': 3,
    };

    useEffect(() => {
        const currentStep = pathToStepMap[location.pathname];
        if (currentStep) {
          const stepElements = document.querySelectorAll('.steps li');
          if (stepElements[currentStep - 1]) {
            stepElements[currentStep - 1].classList.add('step-neutral');
          }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);


    return ( 
        <>
            <header className="flex items-center px-16 py-4">
                {/* <img className="h-11 w-11 rounded-full" src="https://picsum.photos/200" alt="" /> */}
                <h1 className="text-2xl font-bold ml-3">Travel Buddy</h1>
            </header>

            <div className="px-52 flex justify-between items-start min-h-screen">
                <ul className="steps steps-vertical w-[20rem]">
                    <li className="step step-neutral">Chọn loại hình địa điểm</li>
                    <li className="step step-neutral">Thông tin về địa điểm</li>
                    <li className="step">Hình ảnh về địa điểm</li>
                    <li className="step">Xác nhận và chờ xét duyệt</li>
                </ul>
                <div className="w-[45rem]">
                    {children}
                </div>
                <Toaster />
            </div>
        </>
     );
}

NewSitelayout.propTypes = {
    children: PropTypes.node.isRequired,
  };
 
export default NewSitelayout;