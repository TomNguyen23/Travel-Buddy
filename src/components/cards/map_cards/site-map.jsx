import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils"
import { useGetNearbySitesQuery } from '@/api/featureApi/siteApiSlice';
import { getSideID } from '@/redux/reducer/site-detail.reducer';

const SiteMapCard = ({ className, canMove }) => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const coordinates = useSelector((state) => state?.siteDetail?.amenityDetail);
    const [selectedSite, setSelectedSite] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        zoom: 15
    });

    useEffect(() => {
        setViewport({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            zoom: 15
        });
    }, [coordinates]);

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedSite(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    const onMarkerDragEnd = useCallback((event) => {
        setViewport({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng,
            zoom: 15
        });
      }, []);

    const {data} = useGetNearbySitesQuery(
        {lat: viewport.latitude, lng: viewport.longitude, degRadius: 1/111},
        {refetchOnMountOrArgChange: true}
    );
    const nearbySites = data?.filter(site => site.lat !== coordinates.lat || site.lng !== coordinates.lng);

    const handleGetNearbySiteID = (id) => {
        dispatch(getSideID(id));
        navigateTo('/details/hotel');
    }

    return ( 
        <Map
            attributionControl={false}
            {...viewport}
            width='100%'
            height='100%'
            mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX_API_KEY}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            {...(canMove ? {onMove: evt => setViewport(evt.viewState)} : {})}
        >
            <Marker 
                longitude={viewport.longitude} latitude={viewport.latitude}
                className={cn('', className)}
                draggable
                anchor="bottom"
                onDragEnd={onMarkerDragEnd}
            >
                <span className='material-icons text-red-600 text-5xl'>location_on</span>
            </Marker>

            {nearbySites?.map((site) => (
                <Marker 
                    key={site.siteId}
                    longitude={site.lng} latitude={site.lat}
                    className={cn('', className)}
                    anchor="top"
                    onClick={() => setSelectedSite(site)}
                >
                    <div className='material-icons text-blue-600 text-2xl'>location_on</div>
                </Marker>
            ))}

            {selectedSite ? (
                <Popup 
                    latitude={selectedSite.lat} longitude={selectedSite.lng}
                    onClose={() => setSelectedSite(null)}
                    closeOnClick={false}
                    className='font-medium text-2xl px-2 pt-10'
                >
                    <div className="card card-compact h-64">
                        <figure className="h-2/3">
                            <img
                            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                            className="w-full object-cover bg-center rounded-md"
                            alt="Movie" />
                        </figure>
                        <div className="card-body">
                            <h2 onClick={() => handleGetNearbySiteID(selectedSite.siteId)} className="font-medium text-gray-600 cursor-pointer hover:underline">{selectedSite.name}</h2>
                            <p className='text-xs text-gray-500'>{selectedSite.siteType.name}</p>
                            <p className="flex items-center">
                                <div className="flex items-center">
                                    <span className='text-sm pr-0.5'>{selectedSite.averageRating.toFixed(1)}</span>
                                    <span className='material-icons text-sm text-yellow-400'>star</span>
                                </div>
                                
                                <span className="text-xs text-gray-500 pl-2">
                                    {selectedSite.totalRating} đánh giá
                                </span>
                            </p>
                        </div>
                    </div>
                </Popup>
            ) : null}
        </Map>
     );
}
SiteMapCard.propTypes = {
    className: PropTypes.string,
    canMove: PropTypes.bool,
};

export default SiteMapCard;