import React from "react";
import { useEffect, useRef, useCallback } from "react";

import Pikaday from "pikaday";
import moment from "moment";

const DueDateForm = (props) => {
  const dateInput = useRef(null);
  const calendar = useRef(null);

  const defaultMoment = useCallback(() => {
    console.log("in defaultMoment");
    if (props.dueDate) {
      return moment(props.dueDate);
    } else {
      const time = moment().add(1, "day");

      time.set({
        hour: 12,
        minute: 0,
        second: 0,
      });

      return time;
    }
  }, [props.dueDate]);

  const defaultDate = useCallback(() => {
    console.log("in defaultDate");
    defaultMoment().toDate();
  }, [defaultMoment]);

  useEffect(() => {
    console.log('pikaday');
    const picker = new Pikaday({
      field: dateInput.current,
      bound: false,
      container: calendar.current,
      firstDay: 1,
      yearRange: 10,
      defaultDate: defaultDate(),
      setDefaultDate: true,
      format: "M/D/YYYY",
      i18n: {
        previousMonth: "Prev",
        nextMonth: "Next",
        months: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        weekdays: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        weekdaysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      },
      keyboardInput: false,
      toString(date, format) {
        return moment(date).format(format);
      },
    });
    picker.show();
  }, [defaultDate]);

  const handleNewDate = (e) => {
    e.preventDefault();
    console.log(dateInput.current.value);
    props.onSubmit(dateInput.current.value);
  }

  return (
    <div>
      <header>
        <span>Change due date</span>
        <a href="#" className="icon-sm icon-close" onClick={props.onClose}></a>
      </header>
      <div className="content">
        <form onSubmit={handleNewDate}>
          <div className="datepicker-select">
            <div className="datepicker-select-date">
              <label>
                Date
                <input
                  type="text"
                  placeholder="Enter date"
                  autoFocus={true}
                  ref={dateInput}
                  defaultValue={defaultMoment().format("M/D/YYYY")}
                />
              </label>
            </div>
            <div className="datepicker-select-time">
              <label>
                Time
                <input
                  type="text"
                  placeholder="Enter time"
                  defaultValue={defaultMoment().format("h:mm A")}
                />
              </label>
            </div>
            <div id="calendar-widget" ref={calendar}></div>
          </div>
          <button className="button" type="submit">
            Save
          </button>
          <button className="button red-button" type="reset">
            Remove
          </button>
        </form>
      </div>
    </div>
  );
};

export default DueDateForm;