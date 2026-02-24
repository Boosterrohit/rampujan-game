// Type definitions for Winwheel.js

interface SegmentOptions {
  size?: number | null;
  text?: string;
  fillStyle?: string | null;
  strokeStyle?: string | null;
  lineWidth?: number | null;
  textFontFamily?: string | null;
  textFontSize?: number | null;
  textFontWeight?: string | null;
  textOrientation?: string | null;
  textAlignment?: string | null;
  textDirection?: string | null;
  textMargin?: number | null;
  textFillStyle?: string | null;
  textStrokeStyle?: string | null;
  textLineWidth?: number | null;
  image?: string | null;
  imageDirection?: string | null;
  imgData?: HTMLImageElement | null;
}

interface AnimationOptions {
  type?: string;
  direction?: string;
  propertyName?: string | null;
  propertyValue?: number | null;
  duration?: number;
  yoyo?: boolean;
  repeat?: number | null;
  easing?: string | null;
  stopAngle?: number | null;
  spins?: number | null;
  clearTheCanvas?: boolean | null;
  callbackFinished?: ((segment: Segment) => void) | string | null;
  callbackBefore?: (() => void) | string | null;
  callbackAfter?: (() => void) | string | null;
  callbackSound?: (() => void) | string | null;
  soundTrigger?: string;
}

interface PinOptions {
  visible?: boolean;
  number?: number;
  outerRadius?: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  margin?: number;
  responsive?: boolean;
}

interface PointerGuideOptions {
  display?: boolean;
  strokeStyle?: string;
  lineWidth?: number;
}

interface WinwheelOptions {
  canvasId?: string;
  centerX?: number | null;
  centerY?: number | null;
  outerRadius?: number | null;
  innerRadius?: number;
  numSegments?: number;
  drawMode?: string;
  rotationAngle?: number;
  textFontFamily?: string;
  textFontSize?: number;
  textFontWeight?: string;
  textOrientation?: string;
  textAlignment?: string;
  textDirection?: string;
  textMargin?: number | null;
  textFillStyle?: string;
  textStrokeStyle?: string | null;
  textLineWidth?: number;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  clearTheCanvas?: boolean;
  imageOverlay?: boolean;
  drawText?: boolean;
  pointerAngle?: number;
  wheelImage?: HTMLImageElement | null;
  imageDirection?: string;
  responsive?: boolean;
  scaleFactor?: number;
  segments?: SegmentOptions[];
  animation?: AnimationOptions;
  pins?: PinOptions;
  pointerGuide?: PointerGuideOptions;
}

declare class Segment {
  size: number | null;
  text: string;
  fillStyle: string | null;
  strokeStyle: string | null;
  lineWidth: number | null;
  textFontFamily: string | null;
  textFontSize: number | null;
  textFontWeight: string | null;
  textOrientation: string | null;
  textAlignment: string | null;
  textDirection: string | null;
  textMargin: number | null;
  textFillStyle: string | null;
  textStrokeStyle: string | null;
  textLineWidth: number | null;
  image: string | null;
  imageDirection: string | null;
  imgData: HTMLImageElement | null;
  startAngle: number;
  endAngle: number;

  constructor(options?: SegmentOptions);
  changeImage(imageSrc: string, imageDirection?: string): void;
}

declare class Animation {
  type: string;
  direction: string;
  propertyName: string | null;
  propertyValue: number | null;
  duration: number;
  yoyo: boolean;
  repeat: number | null;
  easing: string | null;
  stopAngle: number | null;
  spins: number | null;
  clearTheCanvas: boolean | null;
  callbackFinished: ((segment: Segment) => void) | string | null;
  callbackBefore: (() => void) | string | null;
  callbackAfter: (() => void) | string | null;
  callbackSound: (() => void) | string | null;
  soundTrigger: string;
  _stopAngle?: number;

  constructor(options?: AnimationOptions);
}

declare class Pin {
  visible: boolean;
  number: number;
  outerRadius: number;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  margin: number;
  responsive: boolean;

  constructor(options?: PinOptions);
}

declare class PointerGuide {
  display: boolean;
  strokeStyle: string;
  lineWidth: number;

  constructor(options?: PointerGuideOptions);
}

declare class Winwheel {
  canvasId: string;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  centerX: number | null;
  centerY: number | null;
  outerRadius: number | null;
  innerRadius: number;
  numSegments: number;
  drawMode: string;
  rotationAngle: number;
  textFontFamily: string;
  textFontSize: number;
  textFontWeight: string;
  textOrientation: string;
  textAlignment: string;
  textDirection: string;
  textMargin: number | null;
  textFillStyle: string;
  textStrokeStyle: string | null;
  textLineWidth: number;
  fillStyle: string;
  strokeStyle: string;
  lineWidth: number;
  clearTheCanvas: boolean;
  imageOverlay: boolean;
  drawText: boolean;
  pointerAngle: number;
  wheelImage: HTMLImageElement | null;
  imageDirection: string;
  responsive: boolean;
  scaleFactor: number;
  segments: (Segment | null)[];
  animation: Animation;
  pins?: Pin;
  pointerGuide: PointerGuide;
  tween?: any;
  _originalCanvasWidth?: number;
  _originalCanvasHeight?: number;
  _responsiveScaleHeight?: string;
  _responsiveMinWidth?: string;
  _responsiveMinHeight?: string;
  _responsiveMargin?: string;
  _lastSoundTriggerNumber?: number;

  constructor(options?: WinwheelOptions, draw?: boolean);

  updateSegmentSizes(): void;
  clearCanvas(): void;
  draw(clearCanvas?: boolean): void;
  drawPins(): void;
  drawPointerGuide(): void;
  drawWheelImage(): void;
  drawSegmentImages(): void;
  drawSegments(): void;
  drawSegmentText(): void;
  degToRad(degrees: number): number;
  setCenter(x: number, y: number): void;
  addSegment(options: SegmentOptions, position?: number): Segment;
  setCanvasId(canvasId: string): void;
  deleteSegment(position?: number): void;
  windowToCanvas(x: number, y: number): { x: number; y: number };
  getSegmentAt(x: number, y: number): Segment | null;
  getSegmentNumberAt(x: number, y: number): number | null;
  getIndicatedSegment(): Segment;
  getIndicatedSegmentNumber(): number;
  getCurrentPinNumber(): number;
  getRotationPosition(): number;
  startAnimation(): void;
  stopAnimation(callback?: boolean): void;
  pauseAnimation(): void;
  resumeAnimation(): void;
  computeAnimation(): void;
  getRandomForSegment(segmentNumber: number): number;
}

declare function winwheelPercentToDegrees(percent: number): number;

declare module "winwheel" {
  export = Winwheel;
}