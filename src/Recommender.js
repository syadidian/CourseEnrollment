import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert'
import Course from './Course';


class Recommender extends React.Component {
  constructor(props) {
    super(props);
    };
  getCourses() {
    let courses = [];
    console.log(this.props.data2);
   // console.log(this.props.data);
    // for(const course of Object.entries(this.props.data2)) {
    //   console.log(this.props.data2);
    //   courses.push (
    //     <Course key={course[0]} coursekey={course[0]} data={course[1]} setCartCourses = {this.props.setCartCourses}/>
       

    //   )
    // }

    return courses;
  }

  render() {
    return (
      <div style={{margin: '5px'}}>
        {this.getCourses()}
      </div>

    )
  }
}
    export default Recommender;