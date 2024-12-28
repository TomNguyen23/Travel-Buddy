import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { useState, useCallback, useEffect } from "react";
import PropTypes from 'prop-types';
import useDebound from "@/hooks/use-debound";
import { useSelector } from "react-redux";

import OpeningDayItem from "@/components/items/new-site_items/opening-day-item";
import NewSiteMapCard from "@/components/cards/map_cards/new-site-map";
import MediaGallery from "@/components/items/review/media-gallery-item";
import UploadImage_v2Item from "@/components/items/review/upload-images-v2-item";
import { useEditMyPostedSiteMutation } from "@/api/featureApi/siteApiSlice";


const EditMySiteInfoItem = (props) => {
    const { toast } = useToast();

    const lat = useSelector((state) => state.newSite.newSiteInfo?.lat);
    const lng = useSelector((state) => state.newSite.newSiteInfo?.lng);
    const [openingTimes, setOpeningTimes] = useState([]); // Mặc định trống
    const [formattedOpeningTimes, setFormattedOpeningTimes] = useState([]);

    const handleOpeningTimesChange = useCallback((updatedOpeningTimes) => {
        setFormattedOpeningTimes(updatedOpeningTimes);
    }, []);

    const [resolvedAddress, setResolvedAddress] = useState('');
    const deboundResolvedAddress = useDebound(resolvedAddress);

    const [siteName, setSiteName] = useState('');
    const [phoneNumbers, setPhoneNumbers] = useState([]);
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [media, setMedia] = useState([]);
    const [mediaIds, setMediaIds] = useState([]); 
    const [newMedias, setNewMedias] = useState([]);

    useEffect(() => {
        setSiteName(props.site?.siteName);
        setPhoneNumbers(props.site?.phoneNumbers);
        setDescription(props.site?.description);
        setWebsite(props.site?.website);
        setResolvedAddress(props.site?.resolvedAddress);
        setOpeningTimes(props.site?.openingTimes);
        setMedia(props.site?.medias);
        setMediaIds(props.site?.medias.map((media) => media.id));
    }, [props.site]);

    // ham chuyen doi format cua fee
    function transformApiResponse(apiFeeResponse) {
        return apiFeeResponse.map(item => ({
            aspectId: item.aspect.id,
            feeLow: item.feeLow || 0,
            feeHigh: item.feeHigh || 0
        }));
    }

    // ham chuyen doi format cua service
    function extractServiceIds(response) {
        return response.flatMap(group => group.services.map(service => service.id));
    }

    const handleRemoveMedia = (index) => {
        const updatedMedia = media.filter((_, i) => i !== index);
        setMedia(updatedMedia);
    
        const updatedMediaIds = updatedMedia.map((media) => media.id);
        setMediaIds(updatedMediaIds); // Cập nhật mediaIds
    };

    const handleRemoveNewMedia = (url) => {
        setNewMedias((prev) => prev.filter((media) => media.url !== url));
    };

    const [editMyPostedSite] = useEditMyPostedSiteMutation();
    const handleSubmit = async () => {
        const phoneNumbersArr = Array.isArray(phoneNumbers) ? phoneNumbers : [phoneNumbers];
        const data = {
            siteId: props.site?.siteId,
            newSiteName: siteName,
            newLat: lat,
            newLng: lng,
            newResolvedAddress: resolvedAddress,
            newWebSite: website,
            newTypeId: props.site?.siteType?.id,
            newPhoneNumbers: phoneNumbersArr,
            newDescription: description,
            newOpeningTimes: formattedOpeningTimes,
            fees: transformApiResponse(props.site?.fees),
            newServices: extractServiceIds(props.site?.groupedServices),
            mediaIds: mediaIds,
            newMedias: newMedias,
        }

        await editMyPostedSite(data)
            .unwrap()
            .then(() => {
                toast({
                    title: "Thành công!",
                    description: "Thông tin đã được cập nhật",
                })
            })
            .catch((error) => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Có gì đó sai sai.",
                    description: error.data.message,
                    action: <ToastAction altText="Try again">Thử lại</ToastAction>,
                })
            })
    }

    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Thay đổi thông tin</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[700px] h-5/6 overflow-auto">
                <DialogHeader>
                    <DialogTitle>Thay đổi thông tin địa điểm</DialogTitle>
                    <DialogDescription>
                        Điền thông tin mới để cập nhật
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="flex flex-col space-y-3">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Tên địa điểm</span>
                            </div>
                            <input type="text" 
                                    id="siteName"
                                    name="siteName"
                                    value={siteName} 
                                    onChange={(e) => setSiteName(e.target.value)} 
                                    className="input input-bordered w-full rounded-sm" />
                        </label>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Website truy cập</span>
                            </div>
                            <input type="text" 
                                    id="website"
                                    name="website"
                                    value={website} 
                                    onChange={(e) => setWebsite(e.target.value)} 
                                    className="input input-bordered w-full rounded-sm" />
                            
                        </label>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Số điện thoại liên hệ</span>
                            </div>
                            <input type="text" 
                                    id="phoneNumbers"
                                    name="phoneNumbers"
                                    value={phoneNumbers}
                                    onChange={(e) => setPhoneNumbers(e.target.value)}
                                    className="input input-bordered w-full rounded-sm" />
                        </label>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text">Địa chỉ</span>
                            </div>
                            <input type="text" 
                                    id="resolvedAddress"
                                    name="resolvedAddress"
                                    value={resolvedAddress}
                                    onChange={(e) => setResolvedAddress(e.target.value)}
                                    className="input input-bordered w-full rounded-sm" />
                        </label>
                    </div>

                    <div className="flex flex-col space-y-3 h-[30rem]">
                        <NewSiteMapCard canMove 
                                        address={deboundResolvedAddress} 
                        />
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Giới thiệu về địa điểm</span>
                        </div>
                        <textarea 
                            className="textarea textarea-bordered textarea-lg h-28 rounded-md text-sm" placeholder="..."
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>

                    </label>
    
                    <div className="flex flex-col space-y-3">
                        <div className="label">
                            <span className="label-text font-medium">Giờ mở cửa (không bắt buộc)</span>
                        </div>

                        <OpeningDayItem 
                            openingTimes={openingTimes}
                            onOpeningTimesChange={handleOpeningTimesChange}
                            dayMappingInVietnamese={{
                                monday: 'Thứ Hai',
                                tuesday: 'Thứ Ba',
                                wednesday: 'Thứ Tư',
                                thursday: 'Thứ Năm',
                                friday: 'Thứ Sáu',
                                saturday: 'Thứ Bảy',
                                sunday: 'Chủ Nhật',
                            }}
                        />
                    </div>

                    <MediaGallery media={media} onRemoveMedia={handleRemoveMedia} />

                    <div>
                        <h1 className="text-xl font-semibold pb-1">Thêm ảnh/video về địa điểm</h1>
                        <UploadImage_v2Item 
                            getMediaInParent={(media) => setNewMedias([...newMedias, media])} 
                            removeMediaInParent={handleRemoveNewMedia}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Cập nhật</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
EditMySiteInfoItem.propTypes = {
    site: PropTypes.shape({
        siteId: PropTypes.string,
        siteName: PropTypes.string,
        phoneNumbers: PropTypes.arrayOf(PropTypes.string),
        description: PropTypes.string,
        website: PropTypes.string,
        resolvedAddress: PropTypes.string,
        openingTimes: PropTypes.arrayOf(PropTypes.object),
        fees: PropTypes.arrayOf(PropTypes.object),
        siteType: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        }),
        groupedServices: PropTypes.arrayOf(PropTypes.object),
        medias: PropTypes.arrayOf(PropTypes.object),

    }).isRequired,
};

export default EditMySiteInfoItem;