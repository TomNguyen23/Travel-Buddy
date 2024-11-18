import { useState } from "react";
import PropTypes from "prop-types";
// import { Button } from "@/components/ui/button";

const UploadImagesItem = (props) => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [imagesURL, setImagesURL] = useState([]);
    const [selectedVideos, setSelectedVideos] = useState([]);
    const [videosURL, setVideosURL] = useState([]);

    const onSelectFile = (event) => {
        const selectedFiles = event.target.files;
        const selectedFilesArray = Array.from(selectedFiles);

        const imagesArray = [];
        const videosArray = [];

        selectedFilesArray.forEach((file) => {
            if (file.type.startsWith("image/")) {
                imagesArray.push(URL.createObjectURL(file));
            } else if (file.type.startsWith("video/")) {
                videosArray.push(URL.createObjectURL(file));
            }
        });

        setImagesURL((previousImagesURL) => previousImagesURL.concat(imagesArray));
        setVideosURL((previousVideosURL) => previousVideosURL.concat(videosArray));

        setSelectedImages((previousImages) => {
            const newImages = previousImages.concat(selectedFilesArray.filter(file => file.type.startsWith("image/")));
            props.getImages(newImages); // Pass the selected images to the parent
            return newImages;
        });

        setSelectedVideos((previousVideos) => {
            const newVideos = previousVideos.concat(selectedFilesArray.filter(file => file.type.startsWith("video/")));
            props.getVideos(newVideos); // Pass the selected videos to the parent
            return newVideos;
        });

        // FOR BUG IN CHROME
        event.target.value = "";
    };

    function handleDeleteImage(imageToDelete) {
        // Find the index of the image to delete
        const indexToDelete = imagesURL.indexOf(imageToDelete);

        // Remove the image from the selectedImages array
        setSelectedImages((previousImages) => {
            const newImages = [...previousImages];
            newImages.splice(indexToDelete, 1);
            props.getImages(newImages);
            return newImages;
        });

        // Remove the image URL from the imagesURL array
        setImagesURL((previousImagesURL) => {
            const newImagesURL = [...previousImagesURL];
            newImagesURL.splice(indexToDelete, 1);
            return newImagesURL;
        });

        // Revoke the object URL
        URL.revokeObjectURL(imageToDelete);
    }

    function handleDeleteVideo(videoToDelete) {
        const indexToDelete = videosURL.indexOf(videoToDelete);

        setSelectedVideos((previousVideos) => {
            const newVideos = [...previousVideos];
            newVideos.splice(indexToDelete, 1);
            props.getVideos(newVideos);
            return newVideos;
        });

        setVideosURL((previousVideosURL) => {
            const newVideosURL = [...previousVideosURL];
            newVideosURL.splice(indexToDelete, 1);
            return newVideosURL;
        });

        URL.revokeObjectURL(videoToDelete);
    }

    return ( 
        <section>
            <div className="flex items-center">
                <label className="bg-gray-200 dark:bg-gray-800 px-3 py-2 mr-2 font-medium cursor-pointer rounded-lg">
                    + Tải ảnh lên
                    <input
                        type="file"
                        name="images"
                        onChange={onSelectFile}
                        multiple
                        accept="image/png, image/jpeg, image/webp, video/mp4,"
                        hidden
                    />
                </label>

                {(selectedImages.length + selectedVideos.length) > 5 ? (
                        <p className="font-light text-red-700">Bạn đã đăng quá số lượng ảnh giới hạn</p>) 
                        : (
                            null
                        // <Button onClick={() => console.log("images: ",selectedImages, "videos: ", selectedVideos)} className='bg-main hover:bg-main-hover'>Upload</Button>
                    )
                }
            </div>

            <div className="grid grid-cols-3 gap-6 my-4">
                {imagesURL &&
                    imagesURL.map((image) => {
                        return (
                            <div key={image} className="w-full relative">
                                <img src={image} className="rounded-md w-full h-32 object-cover" alt="upload" />
                                <span className="material-icons-outlined cursor-pointer absolute top-0 right-0 p-2 text-gray-500"
                                    onClick={() => handleDeleteImage(image)}
                                >
                                    cancel
                                </span> 
                            </div>
                        );
                    })
                }
                {videosURL.map((videoURL, index) => (
                    <div key={index} className="relative m-2">
                        <video src={videoURL} controls className="w-full h-32 object-cover rounded-md" />
                        <span className="material-icons-outlined cursor-pointer absolute top-0 right-0 p-2 text-gray-500"
                                    onClick={() => handleDeleteVideo(videoURL)}
                                >
                                    cancel
                                </span>
                    </div>
                ))}
            </div>

            

            
        </section>
     );
}

UploadImagesItem.propTypes = {
    getImages: PropTypes.func.isRequired,
    getVideos: PropTypes.func.isRequired
};
 
export default UploadImagesItem;