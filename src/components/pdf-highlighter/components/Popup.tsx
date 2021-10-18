import React, { Component } from "react";

import MouseMonitor from "./MouseMonitor";

interface Props {
  children: JSX.Element;
}

interface State {
  mouseIn: boolean;
}

export class Popup extends Component<Props, State> {
  state: State = {
    mouseIn: false,
  };

  render() {

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Popup;
