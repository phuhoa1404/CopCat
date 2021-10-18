import type { PDFDocumentProxy } from "pdfjs-dist/types/display/api";

export interface LTWH {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Scaled {
  x1: number;
  y1: number;

  x2: number;
  y2: number;

  width: number;
  height: number;
}

export interface Position {
  boundingRect: LTWH;
  rects: Array<LTWH>;
  pageNumber: number;
}

export interface ScaledPosition {
  boundingRect: Scaled;
  rects: Array<Scaled>;
  pageNumber: number;
  usePdfCoordinates?: boolean;
}

export interface MetaData {
  docID: string;
  title?: string;
  author?: string;
  publish?: number;
  color?: string;
}

export interface Sentences{
  id: string;
  text: string;
  euclide: number;
  position: ScaledPosition;
}

export interface IHighlight{
  metadata: MetaData;
  sentences: Array<Sentences>;
}


export interface Viewport {
  convertToPdfPoint: (x: number, y: number) => Array<number>;
  convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number>;
  width: number;
  height: number;
}

export interface T_EventBus {
  on: (eventName: string, callback: () => void) => void;
  off: (eventName: string, callback: () => void) => void;
}

export interface T_PDFJS_Viewer {
  container: HTMLDivElement;
  viewer: HTMLDivElement;
  getPageView: (page: number) => {
    textLayer: { textLayerDiv: HTMLDivElement };
    viewport: Viewport;
    div: HTMLDivElement;
    canvas: HTMLCanvasElement;
  };
  setDocument: (document: PDFDocumentProxy) => Promise<void>;
  scrollPageIntoView: (options: {
    pageNumber: number;
    destArray: Array<any>;
  }) => void;
  currentScaleValue: string;
}

export interface T_PDFJS_LinkService {
  setDocument: (document: Object) => void;
  setViewer: (viewer: T_PDFJS_Viewer) => void;
}