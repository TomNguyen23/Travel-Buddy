import { Link } from "react-router-dom";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DefaultAvatar from "@/assets/images/default-avt.png";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/reducer/auth.reducer";
import ChangeThemeItem from "../items/change-theme-item";
import Tippy from "@tippyjs/react";
import { useState } from "react";
import useDebound from "@/hooks/use-debound";
import { useSearchSitesQuery } from "@/api/featureApi/siteApiSlice";

const MainHeader = () => {
    const token = useSelector((state) => state.auth.login.token);
    const userInfo = useSelector((state) => state.auth.login.user);
    const dispatch = useDispatch();

    // const[searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const searchValueDebounce = useDebound(searchValue, 1000);

    const { data: sites } = useSearchSitesQuery(
        {searchValue: searchValueDebounce}, 
        {refetchOnMountOrArgChange: true});

    // const { data: sites } = useSearchSitesQuery();

    const logoutHandler = () => {
        dispatch(logout());
    }
    return ( 
        <header className="flex justify-between items-center px-16 py-4 bg-white/30 dark:bg-[#020817]/30 backdrop-blur-md border-b fixed top-0 left-0 right-0 z-30">
            <div className="flex items-center">
                <img className="h-11 w-11 rounded-full" src="https://picsum.photos/200" alt="" />
                <h1 className="text-2xl font-bold ml-3">Travel Buddy</h1>
            </div>

            <Tippy
                interactive={true}
                visible={sites?.data.length == 0}
                render={attrs => (
                    <div className='w-[33.125rem]' tabIndex="-1" {...attrs}>
                        <div className="h-fit max-h-80 overflow-auto bg-white border rounded-md">
                            <div>
                                {sites?.data.map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 border-b">
                                        <div>
                                            <h1 className="font-semibold">{item.siteName}</h1>
                                            {/* <h1 className="font-semibold">Địa điểm</h1> */}

                                            <div className='flex items-start'>
                                                <span className='material-icons-outlined text-sm text-gray-400'>location_on</span>
                                                <span className='text-sm text-gray-400 pl-1'>{item.resolvedAddress}</span>
                                                {/* <span className='text-sm text-gray-400 pl-1'>Địa chỉ</span> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div> 
                  )}
            >
                <label className="input input-bordered flex items-center gap-2 rounded-full w-[33.125rem] min-w-28 mr-3">
                    <input type="text" 
                            className="grow" 
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
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
            <div className="flex items-center">

                <Link to="/discover" className="ml-5 font-semibold hover:text-main">Khám phá</Link>
                <Link to="/my-journeys" className="ml-5 font-semibold hover:text-main">Lên kế hoạch</Link>

                {token ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger className="ml-5">
                            <Avatar>
                            {userInfo.avatar 
                                ? <AvatarImage src={userInfo.avatar} />
                                : <AvatarImage src={DefaultAvatar} />
                            }
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Link to="/your-profile">Trang cá nhân</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={logoutHandler} className='text-red-600'>Đăng xuất</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : 
                (
                    <Link to="/login" className="ml-3 font-semibold px-6 py-3 bg-main hover:bg-main-hover text-white rounded-full">Đăng nhập</Link>
                )}

                <ChangeThemeItem />
            </div>
        </header>
     );
}
 
export default MainHeader;