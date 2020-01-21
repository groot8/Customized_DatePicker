import React, { Component } from "react";
import styles from "./styles.module.scss";
import CustomDatePicker from ".././CustomDatePicker/index";

export default class DropDown extends Component {
  container = React.createRef();
  state = {
    open: false
  };
  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open
      };
    });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false
      });
    }
  };

  render() {
    return (
      <div className={styles.container} ref={this.container}>
        <button
          type="button"
          class={styles.button}
          onClick={this.handleButtonClick}
        >
          Custom
        </button>
        {this.state.open && (
          <div class={styles.dropdown}>
            <div className={styles.header}>Choose a Period of Time</div>
            <div className={styles.body}>
              <CustomDatePicker />
            </div>
          </div>
        )}
      </div>
    );
  }
}
