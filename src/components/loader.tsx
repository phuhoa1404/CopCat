import React from "react";
import loader from "./img/loader.gif";

export const Loader = (props:any) => {
  return <img {...props} src={loader} alt="loading..." />;
};

export default Loader;