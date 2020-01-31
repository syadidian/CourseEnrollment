import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Alert from 'react-bootstrap/Alert'


var cartC = [];

class Course extends React.Component {
  render() {
    return (
      <Card style={{width: '60%', marginTop: '5px', marginBottom: '5px'}}>
        <Card.Body>
          <Card.Title> {this.props.data.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted"> {this.props.data.number} - {this.getCredits()}</Card.Subtitle>
          <ButtonToolbar>
               <Button variant="primary" onClick={this.addFull} >Add Course to Cart</Button>
            </ButtonToolbar>
          <Accordion defaultActiveKey="1">
            {this.getSections()}
         </Accordion>
        </Card.Body> 
      </Card>
    )
  }

//  CS 639 -> All -> All
  addFull = ()=>{
    alert("Course Added to Cart");
    let wholeCourse = [];
    wholeCourse.name = this.props.data.name; 
    wholeCourse.number = this.props.data.number;
    wholeCourse.coursekey = this.props.coursekey; 
   
    //wholeCourse.isSectionAdded = false;
   // wholeCourse.isSubAdded = false;
    wholeCourse.isAllAdded= true;

    wholeCourse.sections = [];
    wholeCourse.subsections = [];
    // let secArr =  [];
    // let subsectionArr = [];
  //  console.log(  wholeCourse);
    // this.props.data.key = wholeCourse.name;
 //  console.log(this.props.data.key);

    for(const section of Object.entries(this.props.data.sections)){
      let sectionArr = [];
    //  console.log(section[0]);
      wholeCourse.sections.push(section[0]);
      console.log(wholeCourse.sections);
      // wholeCourse[section] = sectionArr;
      // console.log(wholeCourse[section]);
      // secArr.push( wholeCourse[section]);
      // console.log(secArr);
      if(section[1].subsections !== undefined){

      for(const subsection of Object.entries(section[1].subsections)){
      //  let subsArr = [];
       // console.log(subsection);
       wholeCourse.subsections.push(subsection[0]);
       console.log(wholeCourse.subsections);
  //      console.log(subsection[0]);
      //  wholeCourse[subsection] = subsArr;
       // subsectionArr.push(wholeCourse[subsection] );
      }
    } 
    }
    
  //  wholeCourse.sections = secArr;
  //  wholeCourse.subssections = subsectionArr;
    //console.log(  this.props.cartCourse);
    this.props.setCartCourses(wholeCourse);
  }
  
// CS 639 -> Section 1 -> All
  addSection = (lecture)=>{
    alert("Section Added to Cart");
    console.log(lecture);
    let sectionCourse = [];
 //   console.log(lecture);
    sectionCourse.name = this.props.data.name; 
    sectionCourse.coursekey = this.props.coursekey; 
    sectionCourse.number = this.props.data.number;

    sectionCourse.isSecAdded = true;
    //sectionCourse.isSubAdded = false;
    //sectionCourse.isAllAdded= false;

    sectionCourse.sections = [];
    sectionCourse.subsections = [];

  //  let lec = [];
   // console.log( "secNUm" + this.props.data.number);
  //  lec.push(lecture);
  //  console.log(lec);
   sectionCourse.sections.push(lecture);
   console.log(sectionCourse.sections)

    for(const section of Object.entries(this.props.data.sections)){

      if(section[1].subsections !== undefined){
      for(const subsection of Object.entries(section[1].subsections)){
       // let subsArr = [];
        console.log(subsection);
        sectionCourse.subsections.push(subsection[0] );
        console.log(subsection[0]);
        console.log(sectionCourse.subsections);
       
     // sectionCourse.subsections = subsArr;
      }
    } 
    }
 //   console.log(  wholeCourse);
    this.props.setCartCourses(sectionCourse);
  }

// CS 639 -> Section 1 -> Subsection 1
  addSub = (lecture, subsection)=>{
    alert("Subsection Added to Cart");
    let sectionCourse = [];

    // let sub = [];
    // let lec = [];
    // console.log(lecture);
    // console.log(subsection);

    sectionCourse.name = this.props.data.name; 
    sectionCourse.number = this.props.data.number;
    sectionCourse.coursekey = this.props.coursekey; 

//    sectionCourse.isSectionAdded = false;
    sectionCourse.isSubAdded = true;
//    sectionCourse.isAllAdded= false;

  sectionCourse.sections = [];
  sectionCourse.subsections = [];
  //  console.log(  wholeCourse);
   // console.log( "secNUm" + this.props.data.number);
   // lec.push(lecture);
    sectionCourse.sections.push(lecture);;

    //sub.push(subsection);
    sectionCourse.subsections.push(subsection);
 //   console.log(  wholeCourse);
    this.props.setCartCourses(sectionCourse);
  }


  parseTime(time1) {
    //if(time.includes(" { ") || time.includes(" } ")){
      //{
       // console.log("t1" + time1);
        time1 = time1.replace("{", '');
       // console.log(" t2" + time1);
        time1 = time1.replace("}", "");
        time1 = time1.replace(/"/g, "");
        time1 = time1.replace(",", "\n"); 
        time1 = time1.replace("monday:", "Monday: ");
        time1 = time1.replace("tuesday:", "Tuesday: ");
        time1 = time1.replace("wednesday:", "Wednesday: ");
        time1 = time1.replace("thursday:", "Thursday: ");
        time1 = time1.replace("friday:", "Friday: ");

        //console.log("t3" + time1);

    return time1;
    //  }
    }
      

  getCredits() {
    if(this.props.data.credits === 1)
      return '1 credit';
    else
      return this.props.data.credits + ' credits';
  }

  getSections() {
    
    let listSec = [];

    if(this.props.data.sections != null)
    {
    for(const lectures of Object.keys(this.props.data.sections))
    {
      listSec.push(
        <Card key = {lectures}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={lectures}>
            {lectures}
          </Accordion.Toggle>
          <ButtonToolbar>
               <Button variant="primary" size="sm" onClick={()=>this.addSection(lectures)}>Add Section</Button>
            </ButtonToolbar>
        </Card.Header>
        <Accordion.Collapse eventKey={lectures}>
          <Card.Body> 
            Instructor: {this.props.data.sections[lectures].instructor}
          <p>Time: {this.parseTime(JSON.stringify(this.props.data.sections[lectures].time))}</p>
          
            <Accordion defaultActiveKey="1">
          
             {this.getSubsections(this.props.data.sections[lectures], lectures)}
            </Accordion>
          
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      )
    }
   
     return listSec;
  }
}


  getSubsections(lectures, speclec) {
   // console.log(lectures.subsections);
   let listSubs = [];

   if(lectures.subsections != null){
    for(const subs of Object.entries(lectures.subsections))
    {
   // console.log (speclec); 
      listSubs.push(
        <Card key = {subs[0]}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={subs[0]}>
            {subs[0]}
          </Accordion.Toggle>
          <ButtonToolbar>
               <Button variant="primary" size="sm" onClick={()=>this.addSub(speclec, subs[0])}>Add Subsection</Button>
            </ButtonToolbar>
        </Card.Header>
        <Accordion.Collapse eventKey={subs[0]}>
          <Card.Body> 
            Location: {subs[1].location}
            <p>Time: {this.parseTime(JSON.stringify(subs[1].time))}</p>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      )
    }
  //  console.log (listSubs);
    return listSubs;
    
  }
}

 
}

export default Course;
