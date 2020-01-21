import React from "react";
import ReactDOM from "react-dom";
import DropDown from "./DropDown/index";

const App = () => {
  return (
    <div>
      <DropDown />
    </div>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
