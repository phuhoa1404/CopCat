import React, { Component } from "react";

import "../style/Highlight.css";

import type { LTWH } from "../types.js";

interface Props {
  position: {
    boundingRect: LTWH;
    rects: Array<LTWH>;
  };
  onClick?: () => void;
  metadata: {
    docID: string;
    title?: string;
    author?: string;
    publish?: number;
    color?: string;
  };
  isScrolledTo: boolean;
}

export class Highlight extends Component<Props> {
  render() {
    const {
      position,
      onClick,
      metadata,
      isScrolledTo,
    } = this.props;

    const { rects, boundingRect } = position;

    return (
      <div
        className={`Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`}
      >
        {/* {metadata ? (
          <div
            className="Highlight__emoji"
            style={{
              left: 20,
              top: boundingRect.top,
            }}
          >
            {metadata.title}
          </div>
        ) : null} */}
        <div className="Highlight__parts">
          {rects.map((rect, index) => (
            <div
              onClick={onClick}
              key={index}
              style={rect}
              className={metadata.color}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Highlight;
