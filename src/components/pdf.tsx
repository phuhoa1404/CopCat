import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './reducers';
import {
  PdfLoader,
  PdfHighlighter,
  Tip,
  Highlight,
  Popup
} from "./pdf-highlighter";

import type { IHighlight } from "./pdf-highlighter";
import { testHighlights as _testHighlights } from "./pdf-highlighter/test-highlights";
import { Spinner } from "./pdf-highlighter/Spinner";
import { Sidebar } from "./pdf-highlighter/Sidebar";
import { AreaHighlight } from 'react-pdf-highlighter';

const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;


interface IState {
    url: string;
    highlights: Array<IHighlight>;
  }
  
  const getNextId = () => String(Math.random()).slice(2);
  
  const parseIdFromHash = () =>
    document.location.hash.slice("#highlight-".length);
  
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
    
    if (data) {
      console.log("Data:", data?.url);}

    console.log("testHighLight:", testHighlights)

    // const state = {
    //   url: initialUrl,
    //   highlights: data.url[0][0]
    // };

    const state = {
      url: initialUrl,
      highlights: testHighlights
        ? [...testHighlights]
        : [],
    };
  
    const setState = (url:any, highlight:any) => {
      state.url = url;
      state.highlights = highlight;
    }
    
    const scrollViewerTo = (highlight: any) => {};
    
    const  scrollToHighlightFromHash = () => {
        const highlight = getHighlightById(parseIdFromHash());
    
        if (highlight) {
          scrollViewerTo(highlight);
        }
      };
    
    useEffect (() => {
        window.addEventListener(
          "hashchange",
          scrollToHighlightFromHash,
          false
        );
      }, [])
    
    const getHighlightById = (id: string) => {
        const { highlights } = state;
    
        return highlights.find((highlight:any) => highlight.id === id);
      }

      const { url, highlights } = state;
  
      return (
        <div className="App" style={{ display: "flex", height: "100vh" }}>
          <Sidebar
            highlights={highlights}
          />
          <div
            style={{
              height: "100vh",
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
                  // pdfScaleValue="page-width"
                  scrollRef={(scrollTo:any) => {
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
  
                        hideTipAndSelection();
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
                    const isTextHighlight = !Boolean(
                      highlight.content && highlight.content.image
                    );
  
                    const component = isTextHighlight ? (
                      <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        comment={highlight.comment}
                      />
                    ) : (
                      <AreaHighlight
                        isScrolledTo={isScrolledTo}
                        highlight={highlight}
                        onChange={(boundingRect) => {
                          
                        }}
                      />
                    );
  
                    return (
                      <Popup
                        popupContent={<HighlightPopup {...highlight} />}
                        onMouseOver={(popupContent) =>
                          setTip(highlight, (highlight) => popupContent)
                        }
                        onMouseOut={hideTip}
                        key={index}
                        children={component}
                      />
                    );
                  }}
                  highlights={highlights}
                />
              )}
            </PdfLoader>
          </div>
        </div>
      );
    }
      


export default PDF