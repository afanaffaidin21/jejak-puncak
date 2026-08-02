type MapPoint = {
  latitude: number;
  longitude: number;
};

type StaticMapSize = {
  height: number;
  width: number;
};

const MAPBOX_STATIC_STYLE = "mapbox/streets-v12";
const DEFAULT_SIZE: StaticMapSize = { height: 360, width: 640 };

export function buildMapPreviewUrl(
  points: readonly MapPoint[],
  size: StaticMapSize = DEFAULT_SIZE,
) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const validPoints = points.filter(
    (point) =>
      Number.isFinite(point.latitude) && Number.isFinite(point.longitude),
  );

  if (!token || !validPoints.length) {
    return null;
  }

  const geoJson = encodeURIComponent(
    JSON.stringify({
      features: validPoints.map((point) => ({
        geometry: {
          coordinates: [point.longitude, point.latitude],
          type: "Point",
        },
        properties: {
          "marker-color": "#2f6f58",
          "marker-size": "small",
        },
        type: "Feature",
      })),
      type: "FeatureCollection",
    }),
  );

  return `https://api.mapbox.com/styles/v1/${MAPBOX_STATIC_STYLE}/static/geojson(${geoJson})/auto/${size.width}x${size.height}@2x?padding=56&access_token=${encodeURIComponent(token)}`;
}
