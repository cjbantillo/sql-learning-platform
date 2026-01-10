// Type declaration file for geojson
declare module "geojson" {
  export = GeoJSON;
}

declare namespace GeoJSON {
  export interface GeoJsonObject {
    type: string;
    bbox?: number[];
    crs?: CoordinateReferenceSystem;
  }

  export interface CoordinateReferenceSystem {
    type: string;
    properties: any;
  }

  export interface Position extends Array<number> {
    0: number;
    1: number;
    2?: number;
  }

  export interface Geometry extends GeoJsonObject {
    type:
      | "Point"
      | "MultiPoint"
      | "LineString"
      | "MultiLineString"
      | "Polygon"
      | "MultiPolygon"
      | "GeometryCollection";
    coordinates?: Position | Position[] | Position[][] | Position[][][];
  }

  export interface Feature extends GeoJsonObject {
    type: "Feature";
    geometry: Geometry | null;
    properties: any;
    id?: string | number;
  }

  export interface FeatureCollection extends GeoJsonObject {
    type: "FeatureCollection";
    features: Feature[];
  }
}
