import React from "react";
import type { IHighlight, Sentences } from "../pdf-highlighter";
import "./style/SideBar.css";
interface Props {
  highlights: Array<IHighlight>;
}

// const updateHashDoc = (highlight: IHighlight) => {
//   document.location.hash = `highlight-${highlight.id}`;
// };

const updateHashSen = (sentence: Sentences) => {
  document.location.hash = `sentence-${sentence.senID}`;
}

export function Sidebar({
  highlights,
}: Props) {
  return (
    <div className="sidebar" style={{ width: "20vw", height: "95vh" }}>

      <ul className="sidebar__highlights" style={{paddingLeft:0}}>
        {highlights.map((highlight, index) => (
          <li
            key={index}
            style={{width: '18vw'}}
            className="sidebar__highlight"
            // onClick={() => {
            //   updateHashDoc(highlight);
            // }}
          >
            <div>
              <br/><br/><b>*********************</b><br/>
              <strong className={highlight.metadata.color + 'Side'}>
                {highlight.metadata.title}</strong>
              {highlight.sentences ? (
                highlight.sentences.map((sentence:any, i:number) => (
                  <div onClick={() => {
                    updateHashSen(sentence);
                  }}>
                    <blockquote style={{ marginTop: "0.5rem" }}>
                    {`${sentence.text.slice(0, 150).trim()}...`}</blockquote>
                    <b>Similarity: {sentence.euclide}</b>
                    <br/>
                    ------------------------
                  
                  </div>
                ))) : null
              }
              
            </div>
            <div className="highlight__location">
              <i>Author: {highlight.metadata.author}</i><br/>
              <p>Published: {highlight.metadata.publish}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
