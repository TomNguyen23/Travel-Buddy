import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from "@/components/ui/button"  

import { useState } from "react";

const UserProfileCard = () => {
    const [username, setUsername] = useState("LupyzZz");
    const [email, setEmail] = useState("lupyzZz12@gmail.com");
    const [socialLink, setSocialLink] = useState("https://facebook.com/profile=.....");

    const handleUpdateProfile = () => {
        const updateData = { username, email, socialLink };
        console.log(updateData);
    }

    return ( 
        <Card className="w-full px-4 mt-4 dark:bg-gray-900">
            <CardHeader>
                <CardTitle>Dữ liệu cá nhân</CardTitle>
                
            </CardHeader>

            <CardContent className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Biệt danh</span>
                        </div>
                        <input type="text" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                className="input input-bordered w-full rounded-sm" />
                        <div className="label">
                            <span className="label-text-alt">
                                Tất cả các hoạt động của bạn (đánh giá, đăng địa điểm,...) sẽ được biết đến với biệt danh này
                            </span>
                        </div>
                    </label>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">E-mail</span>
                        </div>
                        <input type="text" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="input input-bordered w-full rounded-sm" />
                        <div className="label">
                            <span className="label-text-alt">
                                E-mail sẽ được sử dụng trong một số trường hợp liên quan đến bảo mật
                            </span>
                        </div>
                    </label>
                </div>

                <div className="flex flex-col space-y-1.5">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Liên kết mạng xã hội</span>
                        </div>
                        <input type="text" 
                                value={socialLink}
                                onChange={(e) => setSocialLink(e.target.value)}
                                className="input input-bordered w-full rounded-sm" />
                    </label>
                </div>

                <div className="flex items-center">
                    <p className="font-semibold">Đã tham gia vào 20/11/2024</p>
                    <div className="badge badge-info text-white ml-2">Công khai</div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleUpdateProfile} className="bg-[#FFAB3E] hover:bg-[#f4c17e]">Lưu cập nhật</Button>
            </CardFooter>
        </Card>
     );
}
 
export default UserProfileCard;