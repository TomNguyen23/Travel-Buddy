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

import NewSiteFeeItem from "@/components/items/new-site_items/new-site-fee-item"

import { useCallback, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { getNewSiteType } from "@/redux/reducer/new-site.reducer";
import ChooseSiteServiceCard from "@/components/cards/new-site_cards/choose-site-services-card";
import { useEditMyPostedSiteMutation } from "@/api/featureApi/siteApiSlice";

const EditSiteBusinessItem = (props) => {
    const { toast } = useToast();
    const dispatch = useDispatch();

    const [fees, setFees] = useState([]);
    const [feeFromProps, setFeeFromProps] = useState([]);
    const getFeesCallback = useCallback((fees) => setFees(fees), []);

    const [validServices, setValidServices] = useState([]);
    const [serviceIDs, setServiceIDs] = useState([]);

    const handleServicesChange = (serviceID, isChecked) => {
        const id = Number(serviceID); // Ensure serviceID is a number
        setServiceIDs(prevValues => {
            if (isChecked) {
                return [...prevValues, id];
            } else {
                return prevValues.filter(value => value !== id);
            }
        });
    };

    useEffect(() => {
        if (props.site?.groupedServices) {
            const allServiceIDs = props.site?.groupedServices.flatMap(group => 
                group.services.map(service => service.id)
            );
            setValidServices(allServiceIDs);
            setServiceIDs(allServiceIDs);
        }

        setFeeFromProps(props.site?.fees);

        dispatch(getNewSiteType({ typeId: props.site?.siteType?.id }));
    }, [props.site, dispatch]);

    const [editMyPostedSite] = useEditMyPostedSiteMutation();
    const handleSubmit = async () => {
        const data = {
            siteId: props.site?.siteId,
            newSiteName: props.site?.siteName,
            newLat: props.site?.lat,
            newLng: props.site?.lng,
            newResolvedAddress: props.site?.resolvedAddress,
            newWebSite: props.site?.website,
            newTypeId: props.site?.siteType?.id,
            newPhoneNumbers: props.site?.phoneNumbers,
            newDescription: props.site?.description,
            newOpeningTimes: props.site?.openingTimes,
            fees: fees,
            newServices: serviceIDs,
            mediaIds: props.site?.medias.map((media) => media.id),
            newMedias: [],
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
    };

    return ( 
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Thay đổi thông tin kinh doanh</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[700px] sm:max-h-[700px] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Thay đổi thông tin kinh doanh</DialogTitle>
                    <DialogDescription>
                        Thay đổi thông tin kinh doanh của bạn
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col space-y-3">
                    <div className="label">
                        <span className="label-text font-medium">Các loại chi phí</span>
                    </div>
                    <NewSiteFeeItem 
                        getFees={getFeesCallback} 
                        initialFees={feeFromProps} 
                    />
                </div>

                <div className="flex flex-col space-y-3">
                    <ChooseSiteServiceCard
                        onServicesChange={handleServicesChange}
                        selectedServices={validServices}
                    />
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit}>Cập nhật</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
}
EditSiteBusinessItem.propTypes = {
    site: PropTypes.shape({
        fees: PropTypes.array,
        siteId: PropTypes.number,
        siteName: PropTypes.string,
        lat: PropTypes.number,
        lng: PropTypes.number,
        resolvedAddress: PropTypes.string,
        website: PropTypes.string,
        phoneNumbers: PropTypes.array,
        description: PropTypes.string,
        openingTimes: PropTypes.array,
        medias: PropTypes.array,
        siteType: PropTypes.shape({
            id: PropTypes.number
        }),
        groupedServices: PropTypes.array
    })
};

export default EditSiteBusinessItem;