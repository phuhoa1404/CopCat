import React from "react";
import type { IHighlight } from "../pdf-highlighter";
import "./style/SideBar.css";
interface Props {
  highlights: Array<IHighlight>;
}

const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.metadata.docID}`;
};

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
            onClick={() => {
              updateHash(highlight);
            }}
          >
            <div>
              <br/><br/><b>*********************</b><br/>
              <strong className={highlight.metadata.color + 'Side'}>{highlight.metadata.title}</strong>
              {highlight.sentences ? (
                highlight.sentences.map((sentence:any, i:number) => (
                  <blockquote style={{ marginTop: "0.5rem" }}>
                    {`${sentence.text.slice(0, 150).trim()}...`}<br/>
                    <b>Similarity: {sentence.euclide}</b>
                    <br/>
                    ------------------------
                  </blockquote>
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
