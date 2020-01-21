import React from "react";
import styles from "./styles.module.scss";

const InputGroup = props => {
  const { from, to } = props;
  return (
    <div className={styles.inputField}>
      <div>
        <input value={from ? from : ""} placeholder="from" />
        -
        <input value={to ? to : ""} placeholder="to" />
      </div>
    </div>
  );
};

export default InputGroup;
