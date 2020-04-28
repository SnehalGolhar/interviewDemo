import React from "react";
import Card from "react-bootstrap/Card";
import "./Course.css";

function Course(props) {
  const { courseDetails } = props;
  console.log("courseDetails in props", courseDetails);
  return (
    <Card style={{ width: "25rem" }}>
      <Card.Header style={{ backgroundColor: "blue", color: "white" }}>
        {courseDetails.title}
      </Card.Header>
      <Card.Body>
        <div className="info">
          Department
          <span>{courseDetails.dept}</span>
        </div>
        <div className="info">
          Course <span>{courseDetails.course}</span>
        </div>
        <div className="info">
          Year <span>{courseDetails.year}</span>
        </div>
        <div className="info">
          semster <span>{courseDetails.sem}</span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Course;
