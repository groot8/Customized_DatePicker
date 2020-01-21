import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import styles from "./styles.module.scss";
import InputGroup from "./InputGroup";
import "./styles.css";

export default class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleDayMouseEnter = this.handleDayMouseEnter.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: null,
      to: null,
      enteredTo: null // Keep track of the last day for mouseEnter.
    };
  }

  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  }

  handleDayClick(day) {
    const { from, to } = this.state;
    if (from && to && day >= from && day <= to) {
      this.handleResetClick();
      return;
    }
    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        enteredTo: null
      });
    } else {
      this.setState({
        to: day,
        enteredTo: day
      });
    }
  }

  handleDayMouseEnter(day) {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        enteredTo: day
      });
    }
  }

  handleResetClick() {
    this.setState(this.getInitialState());
  }

  render() {
    const { from, to, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from };
    const selectedDays = [from, { from, to: enteredTo }];
    return (
      <div className={styles.container}>
        <InputGroup
          from={from ? from.toLocaleDateString() : ""}
          to={to ? to.toLocaleDateString() : ""}
        />
        <div className={styles.inputField} />
        <DayPicker
          className="Range"
          numberOfMonths={new Date().getMonth() + 1}
          toMonth={new Date()}
          selectedDays={selectedDays}
          disabledDays={disabledDays}
          modifiers={modifiers}
          navbarElement={<div />}
          onDayClick={this.handleDayClick}
          onDayMouseEnter={this.handleDayMouseEnter}
        />
      </div>
    );
  }
}
