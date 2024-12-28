import useDebound from "@/hooks/use-debound";
import { useSearchSitesQuery } from "@/api/featureApi/siteApiSlice";
import { getSideID } from "@/redux/reducer/site-detail.reducer";

import Tippy from "@tippyjs/react/headless";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const searchValueDebounce = useDebound(searchValue);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const { data: sites } = useSearchSitesQuery(
        {searchValue: searchValueDebounce}, 
        {refetchOnMountOrArgChange: true, 
            enabled: searchValueDebounce !== '',
            skip: searchValueDebounce === ''});


    const handleChooseSite = (siteID) => {
        dispatch(getSideID(siteID));
        navigateTo("/details/hotel");
        setSearchValue('');
        setShowSearchResult(false);
    }

    return ( 
        <Tippy
            interactive
            visible={showSearchResult && sites?.data?.length > 0}
            placement="bottom"
            onClickOutside={() => setShowSearchResult(false)}
            render={attrs => (
                <div className='w-[33.125rem] h-fit max-h-80 overflow-auto bg-white dark:bg-gray-800 border rounded-md' tabIndex="-1" {...attrs}>
                    {sites?.data?.map((item, index) => (
                        <div key={index} 
                            onClick={() => handleChooseSite(item.siteId)}
                            className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700">
                            <div className="justify-self-start">
                                <h1 className="font-semibold justify-self-start text-black dark:text-white">{item.siteName}</h1>

                                <div className='flex items-start'>
                                    <span className='material-icons-outlined text-sm text-gray-400'>location_on</span>
                                    <span className='justify-self-start text-start text-sm text-gray-400 pl-1'>{item.resolvedAddress}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div> 
                )}
        >
            <label className="input input-bordered flex items-center gap-2 rounded-full w-[33.125rem] min-w-28 mr-3">
                <input type="text" 
                        className="grow text-black dark:text-white" 
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowSearchResult(true)}
                        placeholder="Tìm địa điểm và lên kế hoạch du lịch ngay..." />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd" />
                </svg>
            </label>
        </Tippy>
     );
}
 
export default SearchBar;