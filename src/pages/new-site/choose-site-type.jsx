import { useGetSiteTypeQuery } from "@/api/featureApi/siteApiSlice";
import { Button } from "@/components/ui/button";
import { getNewSiteType } from "@/redux/reducer/new-site.reducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ChooseSiteType = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  // const data = [{
  //     "id": 1,
  //     "site-type": "Jewelry"
  //   }, {
  //     "id": 2,
  //     "site-type": "Computers"
  //   }, {
  //     "id": 3,
  //     "site-type": "Kids"
  //   }, {
  //     "id": 4,
  //     "site-type": "Books"
  //   }, {
  //     "id": 5,
  //     "site-type": "Tools"
  //   }, {
  //     "id": 6,
  //     "site-type": "Beauty"
  //   }, {
  //     "id": 7,
  //     "site-type": "Tools"
  //   }, {
  //     "id": 8,
  //     "site-type": "Computers"
  //   }, {
  //     "id": 9,
  //     "site-type": "Garden"
  //   }, {
  //     "id": 10,
  //     "site-type": "Home"
  //   }];
  
  const {data: siteTypes} = useGetSiteTypeQuery();

  const [siteType, setSiteType] = useState(null);

  const handleRadioChange = (e) => {
      setSiteType(e.target.value);
  }
  const handleConfirm = () => {
      if (siteType) {
        dispatch(getNewSiteType({typeId: siteType}));
        navigateTo('/new-site/site-info');
      }
  }

  return ( 
      <div className="px-72 flex flex-col items-center">
          <div className="text-center">
              <h1 className="text-3xl font-bold p-2">Lựa chọn loại hình địa điểm của bạn</h1>
              <p>Hãy cho chúng tôi biết loại hình địa điểm của bạn để phục vụ cho việc phân loại</p>
          </div>

          <div className="mt-7 pt-1 max-h-[31rem] grid grid-cols-4 gap-5 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {siteTypes?.data.map((item) => (
                  <div key={item.id} className="h-20 w-48 rounded-xl mx-3 mt-3 mb-8 relative">
                      <input type="radio" 
                              name='siteType'
                              id={`siteType-${item.id}`}
                              onChange={handleRadioChange} 
                              value={item.id}
                              // checked={isChecked}
                              className="appearance-none relative h-full w-full bg-white border rounded-xl shadow-lg cursor-pointer hover:scale-110 hover:transition ease-in-out delay-150 duration-300 checked:ring-4 checked:ring-main" />
                      <label htmlFor={`siteType-${item.id}`} className="absolute top-0 left-0 h-full w-full hover:scale-110 hover:transition ease-in-out delay-150 duration-300 cursor-pointer flex items-center justify-center">
                          <p className="text-center font-medium ">{item["name"]}</p>
                      </label>
                  </div>
              ))}
              
          </div>

          <Button className="mt-3 w-1/5 bg-main hover:bg-main-hover" onClick={handleConfirm}>Tiếp theo</Button>
      </div>
    );
}
 
export default ChooseSiteType;