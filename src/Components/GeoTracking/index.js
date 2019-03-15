import {geolocated} from 'react-geolocated';
import GeoTracking from './GeoTracking';

export default geolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  })(GeoTracking);