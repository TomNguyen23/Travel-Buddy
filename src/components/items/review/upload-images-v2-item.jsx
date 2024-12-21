import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { usePostMediaMutation } from '@/api/featureApi/mediaApiSlice';

const UploadImage_v2Item = (props) => {
    const { toast } = useToast();
    const [imageFile, setImageFile] = useState(null);
    const [imagesURL, setImagesURL] = useState([]);
    const [videosURL, setVideosURL] = useState([]);

    const [uploadMedia, {isLoading}] = usePostMediaMutation();
    const uploadImageHandler = async () => {

        if (imageFile) {
            const validImageTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp", "video/mp4"];
            if (!validImageTypes.includes(imageFile.type)) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: "File bạn chọn không phải là ảnh hoặc video",
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
                return;
            }
            // Do something with imageFile

            const formData = new FormData();
            formData.append('files', imageFile);

            await uploadMedia(formData)
                .unwrap()
                .then((response) => {
                    props.getMediaInParent(response[0]);

                    response.forEach((file) => {
                        if (file.url.includes('/image/')) {
                            setImagesURL((prev) => [...prev, file.url]);
                        } else if (file.url.includes('/video/')) {
                            setVideosURL((prev) => [...prev, file.url]);
                        }
                    });
                })
                .catch((error) => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Có gì đó sai sai.",
                        description: error.data.message,
                        action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                    });
                });
        }
    }

    useEffect(() => {
        uploadImageHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageFile]);

    const handleRemove = (url) => {
        setImagesURL((prev) => prev.filter((image) => image !== url));
        setVideosURL((prev) => prev.filter((video) => video !== url));
        props.removeMediaInParent(url); 
    };
    

    return ( 
        <section>
            <div className="flex items-center">
                <label className="bg-gray-200 dark:bg-gray-800 px-3 py-2 mr-2 font-medium cursor-pointer rounded-lg">
                    {isLoading ? "Đang tải lên..." : "+ Tải lên"}
                    <input
                        type="file"
                        name="images"
                        onChange={(e) => setImageFile(e.target.files[0])}
                        multiple
                        accept="image/png, image/jpeg, image/jpg, image/webp, video/mp4,"
                        hidden
                        {...isLoading && { disabled: true }}
                    />
                </label>
            </div>

            <div className="grid grid-cols-3 gap-6 my-4">
                {imagesURL &&
                    imagesURL.map((image, index) => {
                        return (
                            <div key={index} className="w-full relative">
                                <img src={image} className="rounded-md w-full h-32 object-cover" alt="upload" />
                                <span className="material-icons-outlined cursor-pointer absolute top-0 right-0 p-2 text-gray-500"
                                    onClick={() => handleRemove(image)}
                                >
                                    cancel
                                </span> 
                            </div>
                        );
                    })
                }
                {videosURL &&
                    videosURL.map((videoURL, index) => (
                        <div key={index} className="relative m-2">
                            <video src={videoURL} controls className="w-full h-32 object-cover rounded-md" />
                            <span className="material-icons-outlined cursor-pointer absolute top-0 right-0 p-2 text-gray-500"
                                onClick={() => handleRemove(videoURL)}
                            >
                                cancel
                            </span>
                        </div>
                ))}
            </div>
        </section> 
     );
}
UploadImage_v2Item.propTypes = {
    getMediaInParent: PropTypes.func,
    removeMediaInParent: PropTypes.func,
};

export default UploadImage_v2Item;