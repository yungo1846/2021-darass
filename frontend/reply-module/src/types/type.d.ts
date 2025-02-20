declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";

declare interface Window {
  Kakao: any;
}

declare type ValueOf<T> = T[keyof T];
