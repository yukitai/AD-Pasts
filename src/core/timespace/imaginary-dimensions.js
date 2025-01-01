import { Timespace } from "./timespace";

export const ImaginaryDimensions = {
  get isUnlocked() {
    return Timespace.isImaginaryDimensionsUnlock;
  }
};

window.ImaginaryDimensions = ImaginaryDimensions;