import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Map, { GeolocateControl, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch } from 'react-redux';
import { cn } from "@/lib/utils"
import { getNewSiteCoordinates } from '@/redux/reducer/new-site.reducer';

const NewSiteMapCard = ({ className, canMove }) => {
    const dispatch = useDispatch();
    const [coordinates, setCoordinates] = useState({lat: 21.028511, lng: 105.804817});
    const [viewport, setViewport] = useState({
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        zoom: 15
    });

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                setCoordinates({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                })

                dispatch(getNewSiteCoordinates({lat: position.coords.latitude, lng: position.coords.longitude}));
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setViewport({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            zoom: 15
        });
    }, [coordinates]);


    const onMarkerDragEnd = useCallback((event) => {
        setViewport({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng,
            zoom: 15
        });
        dispatch(getNewSiteCoordinates({lat: event.lngLat.lat, lng: event.lngLat.lng}));
        // console.log(event.lngLat.lat, event.lngLat.lng);
      }, [dispatch]);

    
    

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
                color='red'
            >
            </Marker>

            <GeolocateControl />
        </Map>
     );
}
NewSiteMapCard.propTypes = {
    className: PropTypes.string,
    canMove: PropTypes.bool,
};

export default NewSiteMapCard;