import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Course from "./Components/Courses/Course";

import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isError: false,
      isDisable: true,

      input: "",
      courseDetails: {
        title: "",
        dept: "",
        course: "",
        year: "",
        sem: "",
      },
    };
  }
  componentDidMount() {}

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleClick = () => {
    var validationRegex = /([A-Za-z]+)((:| |-)?)(\d+)\s(\b(F|S|Su|W|Fall|Spring|Summer|Winter)\b.*\s((20)?\d{2})|((20)?\d{2}).*\s\b(F|S|Su|W|Fall|Spring|Summer|Winter)\b)/i;
    const inputValue = this.state.input;
    var matches = validationRegex.exec(inputValue);

    if (matches === null) {
      this.setState({
        isError: true,
      });

      return;
    } else {
      const semesters = {
        SU: "Summer",
        S: "Spring",
        W: "Winter",
        F: "Fall",
        WINTER: "Winter",
        SUMMER: "Summer",
        SPRING: "Spring",
        FALL: "Fall",
      };
      let dept = matches[1];
      let course = matches[4];
      let year = "";
      let semester = "";
      let temp = matches[5].split(" ");
      if (isNaN(temp[0])) {
        semester =
          semesters[temp[0].toUpperCase()] === undefined
            ? temp[0]
            : semesters[temp[0].toUpperCase()];
        year = temp[1];
      } else {
        year = temp[0];
        semester =
          semesters[temp[1].toUpperCase()] === undefined
            ? temp[0]
            : semesters[temp[1].toUpperCase()];

        this.setState({
          isError: false,
          isDisable: false,

          courseDetails: {
            title: dept + course,
            dept: dept,
            course: course,
            year: year,
            sem: semester,
          },
        });
      }
    }
  };

  render() {
    let errorInfo = "";
    if (this.state.isError) {
      errorInfo = (
        <small id="errorText" class="form-text text-danger">
          {"we can not parse course"}
        </small>
      );
    }

    return (
      <div className="App">
        <div class="input-group">
          {" "}
          <label>Course Name</label>
        </div>
        <div class="input-group">
          <input
            ref="myInput"
            type="text"
            class="form-control"
            placeholder="Enter Course name"
            className={this.state.isError ? "course-input" : ""}
            onChange={this.handleChange}
          />

          <span class="form-group-btn" styles="width:0;">
            <button
              type="button"
              class={
                this.state.isError
                  ? "btn btn-outline-danger"
                  : "btn btn-outline-primary"
              }
              id="btn-submit"
              onClick={this.handleClick}
            >
              Submit
            </button>
          </span>
          <div class="input-group">{errorInfo}</div>

          <div
            className="courseInfo"
            style={{
              display:
                this.state.isError || this.state.isDisable ? "none" : "block",
            }}
          >
            <Course courseDetails={this.state.courseDetails} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
