import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup,
  Sentences
} from "./pdf-highlighter";

import "./pdf-highlighter/style/App.css";

import type { IHighlight } from "./pdf-highlighter";
import { txtHighlights2 as _testHighlights } from "./pdf-highlighter/highlight-txt";
import { Spinner } from "./pdf-highlighter/Spinner";
import { Sidebar } from "./pdf-highlighter/Sidebar";
import { convertSentenceHighlight } from './utils/sentence.util';

const testHighlights: Array<IHighlight> = _testHighlights;
console.log("Test Highlight:", testHighlights)
const senHighlights: Array<Sentences> = convertSentenceHighlight(testHighlights);


interface IState {
    url: string;
    highlights: Array<IHighlight>;
    highlightSens: Array<Sentences>
  }
  
  // const getNextId = () => String(Math.random()).slice(2);
  
  const parseIdFromHash = () =>
    document.location.hash.slice("#sentence-".length);
  
  const resetHash = () => {
    document.location.hash = "";
  };

  // const HighlightPopup = ({
  //   comment,
  // }: {
  //   comment: { text: string; emoji: string };
  // }) =>
  //   comment.text ? (
  //     <div className="Highlight__popup">
  //       {comment.emoji} {comment.text}
  //     </div>
  //   ) : null;
  
  const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
  const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

  const LOCAL_PDF_URL = 'https://duy-sieng-hoa.s3.ap-southeast-1.amazonaws.com/Documents/Test-Highlight.pdf'

  const S3_URL = "https://duy-sieng-hoa.s3.ap-southeast-1.amazonaws.com/Documents/Test20-10.pdf"
  
  const searchParams = new URLSearchParams(document.location.search);
  
  const initialUrl = LOCAL_PDF_URL || PRIMARY_PDF_URL;

  export const PDF = (props: IState) => {

    const data:Array<IHighlight> = useSelector((state: RootState) => state.data.data);
    const returnURL = useSelector((state: RootState) => state.data.url);
    const dataSens:Array<Sentences> = convertSentenceHighlight(data)
    // console.log("URL:", returnURL);
    // if (data) {
      console.log("Data:", data);

    // console.log("testHighLight:", testHighlights)

    const state = {
      url: returnURL,
      highlights: data,
      highlightSens: dataSens
    };
    // console.log("data:", data)
    // console.log("dataSens:", dataSens)

    // const state = {
    //   url: S3_URL,
    //   highlights: testHighlights
    //     ? [...testHighlights]
    //     : [],
    //   highlightSens: senHighlights ? [...senHighlights] : []
    // };
  
    // const setState = (url:any, highlight:any) => {
    //   state.url = url;
    //   state.highlights = highlight;
    // }
    
    let scrollViewerTo = (highlight: any) => {
       console.log("scrollViewerTo in PDF")
    };

    
    
    const scrollToHighlightFromHash = () => {
        const highlightSen = getHighlightById(parseIdFromHash());
        console.log("highlightSen",highlightSen)
        if (highlightSen) {
          scrollViewerTo(highlightSen);
        }
      };
    useEffect(() => {
      window.addEventListener(
        "hashchange",
        scrollToHighlightFromHash,
        false);
    }, [])
 
    const getHighlightById = (id: string) => {
        const { highlightSens } = state;
        // console.log("ID:", id)
        // console.log("Highlights:", highlightSens)
        return highlightSens.find((highlight) => highlight.senID === id);
      }

    const { url, highlights, highlightSens } = state;
  
      return (
        <div className="App" style={{ display: "flex", height: "90vh" }}>
          <Sidebar
            highlights={highlights}
          />
          <div
            style={{
              height: "93vh",
              width: "75vw",
              position: "relative",
            }}
          >
            <PdfLoader url={url} beforeLoad={<Spinner />}>
              {(pdfDocument) => (
                <PdfHighlighter
                  pdfDocument={pdfDocument}
                  enableAreaSelection={(event) => event.altKey}
                  onScrollChange={resetHash}
                  pdfScaleValue="1"
                  scrollRef={(scrollTo) => {
                    scrollViewerTo = scrollTo;
  
                    scrollToHighlightFromHash();
                  }} 
                  onSelectionFinished={(
                    position,
                    content,
                    hideTipAndSelection,
                    transformSelection
                  ) => (
                    <Tip
                      onOpen={transformSelection}
                      onConfirm={(comment) => {
                        }}
                    />
                  )} 
                  highlightTransform={(
                    highlight,
                    index,
                    setTip,
                    hideTip,
                    viewportToScaled,
                    screenshot,
                    isScrolledTo
                  ) => {
                    const isTextHighlight = !!Boolean(highlight);

                    const component = 
                      <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        metadata={highlight}
                      />
                     
                    
                    // highlight.sentences.map((sentence: any) => {
                    //   const component = 
                    //   <Highlight
                    //     isScrolledTo={isScrolledTo}
                    //     position={sentence.sentencePosition}
                    //     metadata={highlight.metadata}
                    //   />;
                    //   return (
                    //     <Popup
                    //       // popupContent={<HighlightPopup {...highlight} />}
                    //       key={index}
                    //       children={component}
                    //     />
                    //   );
                    // })
                    // const component = 
                    //   <Highlight
                    //     isScrolledTo={isScrolledTo}
                    //     position={highlight.position}
                    //     metadata={highlight}
                    //   />;
  
                    return (
                      <Popup
                        // popupContent={<HighlightPopup {...highlight} />}
                        key={index}
                        children={component}
                      />
                    );
                  }}
                  highlights={highlightSens}
                />
              )}
            </PdfLoader>
          </div>
        </div>
      );
      
    }
