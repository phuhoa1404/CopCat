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
import { txtHighlights as _testHighlights } from "./pdf-highlighter/highlight-txt";
import { Spinner } from "./pdf-highlighter/Spinner";
import { Sidebar } from "./pdf-highlighter/Sidebar";
import { convertSentenceHighlight } from './utils/sentence.util';

const testHighlights: Array<IHighlight> = _testHighlights;
const senHighlights = convertSentenceHighlight(testHighlights);


interface IState {
    url: string;
    highlights: Array<IHighlight>;
  }
  
  const getNextId = () => String(Math.random()).slice(2);
  
  const parseIdFromHash = () =>
    document.location.hash.slice("#sentence-".length);
  
  const resetHash = () => {
    document.location.hash = "";
  };

  

  
  const HighlightPopup = ({
    comment,
  }: {
    comment: { text: string; emoji: string };
  }) =>
    comment.text ? (
      <div className="Highlight__popup">
        {comment.emoji} {comment.text}
      </div>
    ) : null;
  
  const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
  const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

  const LOCAL_PDF_URL = 'https://duy-sieng-hoa.s3.ap-southeast-1.amazonaws.com/Documents/Test-Highlight.pdf'
  
  const searchParams = new URLSearchParams(document.location.search);
  
  const initialUrl = LOCAL_PDF_URL || PRIMARY_PDF_URL;

  export const PDF = (props: IState) => {

    const data = useSelector((state: RootState) => state.global.highlightSentence);
    
    // if (data) {
    //   console.log("Data:", data?.url);}

    // console.log("testHighLight:", testHighlights)

    // const state = {
    //   url: initialUrl,
    //   highlights: data.url[0][0]
    // };

    const state = {
      url: initialUrl,
      highlights: testHighlights
        ? [...testHighlights]
        : [],
      highlightSens: senHighlights ? [...senHighlights] : []
    };
  
    // const setState = (url:any, highlight:any) => {
    //   state.url = url;
    //   state.highlights = highlight;
    // }
    
    const scrollViewerTo = (highlight: any) => {};
    
    const  scrollToHighlightFromHash = () => {
        const highlight = getHighlightById(parseIdFromHash());
        if (highlight) {
          scrollViewerTo(highlight);
        }
      };
    
    
    window.addEventListener(
      "hashchange",
      scrollToHighlightFromHash,
      false
    );

    
    const getHighlightById = (id: string) => {
        const { highlights } = state;
        console.log("ID:", id)
        console.log("Highlights:", highlights)
        // console.log("Highlight:", highlights)
        for (let doc of highlights) {
          let search = doc.sentences.find((sen:any) => sen.senID === id);
          console.log("List:", doc.sentences)
          console.log("Result:",search)
          // return search;
        }
        
        // console.log("Return:", highlights.find((highlight:any) => console.log(Highlight)))
        return highlights;
      }

      const { url, highlights, highlightSens } = state;
  
      return (
        <div className="App" style={{ display: "flex", height: "100vh" }}>
          <Sidebar
            highlights={highlights}
          />
          <div
            style={{
              height: "99vh",
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
                  pdfScaleValue="0.85"
                  scrollRef={(scrollTo) => {
                    scrollViewerTo(scrollTo);
  
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
                    // const isTextHighlight = !Boolean(highlight.metadata);
                    
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
                    const component = 
                      <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        metadata={highlight}
                      />;
  
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

export default PDF