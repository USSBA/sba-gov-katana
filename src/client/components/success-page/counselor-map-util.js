/* eslint-disable */
import { sortBy } from "lodash";
import { fitBounds } from "google-map-react/utils";

// Here world is a tube
const findZoomAndCenter = ({size, center: defaultCenter = {
      lat: 35.689,
      lng: 139.741
    }, zoom: defaultZoom = 10, zoomBounds = {
      min: 3,
      max: 17
    }},
  points
) => {
  if (size === undefined) {
    return {
      center: defaultCenter,
      zoom: defaultZoom
    };
  }
  if (points.length === 0) {
    return {
      center: defaultCenter,
      zoom: defaultZoom
    };
  }

  // to not write additional logic for one point
  const eps = 0.0001;

  const pointsNorm = points
    // convert all that latitude longitude
    .map((pt) => {
      return ({
        ...pt,
        lat: pt.lat !== undefined ? pt.lat : pt.latitude,
        lng: pt.lng !== undefined ? pt.lng : pt.longitude
      });
    })
    // add bounding box corners to points
    .reduce((r, pt) => {
      r.push(pt);

      if ("leftTopLatitude" in pt) {
        r.push({
          ...pt,
          lat: pt.leftTopLatitude,
          lng: pt.leftTopLongitude
        });

        r.push({
          ...pt,
          lat: pt.rightBottomLatitude,
          lng: pt.rightBottomLongitude
        });
      }

      return r;
    }, []);

  const {lat: latFirst, lng: lngFirst} = pointsNorm[0];

  const {nw, se} = pointsNorm
    .reduce(
      ({nw: ptNW, se: ptSE}, {lat, lng}) => {
        return ({
          nw: {
            lat: Math.max(ptNW.lat, lat + eps),
            lng: Math.min(ptNW.lng, lng - eps)
          },
          se: {
            lat: Math.min(ptSE.lat, lat - eps),
            lng: Math.max(ptSE.lng, lng + eps)
          }
        });
      }, {
        nw: {
          lat: latFirst,
          lng: lngFirst
        },
        se: {
          lat: latFirst,
          lng: lngFirst
        }
      }
  );

  // bounds on the tube can be not as simple {from, to}
  // ____***_____
  // but having zero meridean we could get bounds like
  // **_________*
  // The only idea I have is to use n^(log2(n) + c) algorithm to find such bounds

  // The idea is to find max distance between nearest pts (as I know similar algos always n*log(n))
  // so sorting is good here
  const pointsSorted = sortBy(pointsNorm, "lng");

  let dist = 0;
  let leftLng = 0;

  for (let i = 0; i < pointsSorted.length - 1; ++i) {
    const d = pointsSorted[i + 1].lng - pointsSorted[i].lng;
    if (d > dist) {
      leftLng = pointsSorted[i].lng;
      dist = d;
    }
  }

  const minInterval1 = se.lng - nw.lng;
  const minInterval2 = 360 - dist;

  // decide what kind of bounds we have
  // this ____***_____
  // or this **_________*
  const bounds = minInterval1 < minInterval2 ?
    {
      nw,
      se
    } :
    {
      nw: {
        lat: nw.lat,
        lng: leftLng + dist
      },
      se: {
        lat: se.lat,
        lng: leftLng + 360
      }
    };

  const primitiveCenter = {
    lng: (bounds.se.lng + bounds.nw.lng) / 2,
    lat: (bounds.se.lat + bounds.nw.lat) / 2
  };

  const {center: center0, zoom: zoom0} = fitBounds(bounds, size);

  const center = zoom0 > zoomBounds.max ?
    primitiveCenter :
    {
      ...center0,
      lng: center0.lng % 360
    };

  const zoom = Math.min(Math.max(zoom0, zoomBounds.min), zoomBounds.max);

  return {
    center,
    zoom
  };
};

export default findZoomAndCenter;
/* eslint-enable */
