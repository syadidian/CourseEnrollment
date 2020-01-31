import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
import fallback from './fallback';
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Card from 'react-bootstrap/Card';
import ButtonToolbar from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Accordion from 'react-bootstrap/Accordion';
import Navbar from 'react-bootstrap/Navbar';
import { arrayExpression } from '@babel/types';
import Recommender from './Recommender';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      key: "home",
      hideButton: false,
      cartCourses: [],
      recCourses: [],
      intRatings: [],
      filteredRecCourses: [],
      // activeState1: 1,
      // activeState2: 2,
      // activeState3: 3,
      // activeState4: 4,
      // activeState5: 5

    };
  }

  getIntAreas() {
    //  console.log(this.state.subjects);
     // console.log(this.state.allCourses);
      let listSubs = [];
      for(const subject of Object.entries(this.state.subjects))
      {
        //console.log(subject[1]);
        if(subject[1] !== "All"){
        listSubs.push(
          <Card.Header>
            <Card key={subject[1]}>
              <Card.Body>
                <p>{subject[1]}</p>
              </Card.Body>
              <ToggleButtonGroup type="radio" name="rating" size="sm" >
                <ToggleButton name="rating" value={1} onChange={() => this.getIntRating(1, subject[1])}>1★</ToggleButton>
                <ToggleButton name="rating" value={2} onChange={() => this.getIntRating(2, subject[1])}>2★</ToggleButton>
                <ToggleButton name="rating" value={3} onChange={() => this.getIntRating(3, subject[1])}>3★</ToggleButton>
                <ToggleButton name="rating" value={4} onChange={() => this.getIntRating(4, subject[1])}>4★</ToggleButton>
                <ToggleButton name="rating" value={5} onChange={() => this.getIntRating(5, subject[1])}>5★</ToggleButton>
              </ToggleButtonGroup>
            </Card>
          </Card.Header>
        );
        }
      }
      return listSubs;
    }

  getIntRating(value, subject)
  {
     let newIntRatings = this.state.intRatings;
     console.log(value);
    console.log(subject);
    let sub = {};
    sub.rating = value;
    sub.subject = subject
    let duplicate = false;
    if (newIntRatings.length == 0)
    {
        console.log("Frist go");
        sub.seen = 0;
        sub.seen = sub.seen + 1;
        newIntRatings.push(sub);
        this.setState({intRatings: newIntRatings});
        console.log(this.state.intRatings);
    }
    else{
      for(var i = 0; i < newIntRatings.length ; i++){
        console.log(newIntRatings[i])
        if(newIntRatings[i].subject === subject)
        {
          console.log("seen" + newIntRatings[i].seen);
          sub.seen = newIntRatings[i].seen + 1;
          newIntRatings[i].rating = (newIntRatings[i].rating + value)/sub.seen;
          duplicate = true;
          break;
        }
      }
      if(duplicate == false)
      {
        sub.seen = 0;
        sub.seen = sub.seen + 1;
        newIntRatings.push(sub);
      }
      this.setState({intRatings: newIntRatings});
    }
    console.log(this.state.intRatings);
  }

  getRecCourses(input) {
  //  let newRecCourses = this.state.allCourses;
  //  console.log(newRecCourses);
  //  console.log(data2);

    let listSec = [];
    for(const section of Object.entries(this.state.allCourses))
    {
        //  console.log(section);
        //  console.log(section[1]);
        // console.log(section[1].name);
      //   console.log(section[1].number);
        //  console.log(section[1].subject);
        //  console.log(section[1].keywords);
     
        for(const enrolled of Object.values(this.state.recCourses))
        {
          for(let i=0; i < enrolled.length; i++)
          {
         // console.log(enrolled[i]);
            if(enrolled[i] === section[0])
            {
       //   let star = 0; 
           //let value = 0; 
              listSec.push(
                <Card.Header> 
                  <Card key = {section.name}>
                    <Card.Body> 
                      <p>{section[1].name}</p>
                      <p>{section[1].number}</p> 
                      </Card.Body>
                      <ToggleButtonGroup type="radio" name = "rating" size="sm">
                        <ToggleButton name = "rating" value={1} onChange={()=>this.getCourseRating(1, section[1])}>1★</ToggleButton>
                        <ToggleButton name = "rating" value={2} onChange={()=>this.getCourseRating(2, section[1])}>2★</ToggleButton>
                        <ToggleButton name = "rating" value={3} onChange={()=>this.getCourseRating(3, section[1])}>3★</ToggleButton>
                        <ToggleButton name = "rating" value={4} onChange={()=>this.getCourseRating(4, section[1])}>4★</ToggleButton>
                        <ToggleButton name = "rating" value={5} onChange={()=>this.getCourseRating(5, section[1])}>5★</ToggleButton>
                      </ToggleButtonGroup>
                  </Card>
                  </Card.Header>
              );
            }
          }
        }
    }
    return listSec;
  }

  getCourseRating(value, course)
  {
   // if(value === 1)
  // // if(this.state.activeState1 === 0)
  //   {this.setState({activeState1: 1}, () => {
  //   console.log(this.state.activeState1);});}
  //   this.setState({activeState1: 1});
  //  // if(value === 2)
  //   {this.setState({activeState2: 2});}
  //  // if(value === 3)
  //   {this.setState({activeState3: 3});}
  //  // if(value === 4)
  //   {this.setState({activeState4: 4});}
  // //  if(value === 5)
  //   {this.setState({activeState5: 5});}
  //   console.log(this.state.activeState1, this.state.activeState2 , this.state.activeState3,
  //     this.state.activeState4 , this.state.activeState5);
    
    let newIntRatings = this.state.intRatings;
     console.log(value);
    console.log(course);
    let sub = {};
    sub.rating = value;
    sub.subject = course.subject;
    let duplicate = false;
    if (newIntRatings.length == 0)
    {
        console.log("Frist go");
        sub.seen = 0;
        sub.seen = sub.seen + 1;
        newIntRatings.push(sub);
        this.setState({intRatings: newIntRatings});
        console.log(this.state.intRatings);
    }
    else{
      for(var i = 0; i < newIntRatings.length ; i++){
        console.log(newIntRatings[i])
        if(newIntRatings[i].subject === sub.subject)
        {
          sub.seen = newIntRatings[i].seen + 1;
          newIntRatings[i].rating = (newIntRatings[i].rating + value)/sub.seen;
          duplicate = true;
          break;
        }
      }
      if(duplicate == false)
      {
        sub.seen = 0;
        sub.seen = sub.seen + 1;
        newIntRatings.push(sub);
      }
      this.setState({intRatings: newIntRatings});
    }
    console.log(this.state.intRatings);
  }


  setCartCourses(data) {
    // Set Cart Courses
   // var newCartCourses = this.state.cartCourses;
 //   this.setState({newCartCourses: data}); 
  //  console.log(data);
  //  console.log(this.state.cartCourses);

   // this.getSectionInfo(data);
  //  this.setState({cartCourses: data});
    this.addCartCourses(data);
    console.log(this.state.cartCourses);
  }

  addCartCourses(data1) {
    // Set Cart Courses
   // console.log("back at top");
    let newCartCourses = this.state.cartCourses;
    if (newCartCourses.length == 0 && this.state.cartCourses.length == 0)
    {
      console.log("Frist go");
      newCartCourses.push(data1);
      this.setState({cartCourses: newCartCourses});
      console.log(this.state.cartCourses);
      return this.getSectionInfo();
    }

    // Course added to the queue to go to cart (poor naming)
    let dupFound = false;
    // A duplicate was found 
    let dupFound2 = false;

    //False if course being added is not in cart yet
    let newSub = true;
    let newSec = true;

 //  this.setState({newCartCourses: data});
// newCartCourses.push(data); 
    console.log(newCartCourses);
    console.log(data1);
    console.log(this.state.cartCourses);

  //if (newCartCourses[newCartCourses.length-1].coursekey === data1.coursekey)
  //{

  for(var i = 0; i < newCartCourses.length ; i++){
    console.log(newCartCourses[i]);
    console.log(newCartCourses.length);  
    console.log(newCartCourses[i].coursekey);
    console.log(data1.coursekey);

      if(data1.isAllAdded == true)
      {
        console.log("inAll")
        console.log(newCartCourses[i].sections);
        console.log(data1.sections);
        console.log(newCartCourses[i].coursekey);
        console.log(data1.coursekey);
        if(newCartCourses[i].coursekey === data1.coursekey)
        {
          console.log(newCartCourses[i].sections.length);
          console.log(data1.sections.length);
          if(newCartCourses[i].sections.length == data1.sections.length)
          {
            dupFound2 = true;
            console.log(dupFound2);
          }
          if(newCartCourses[i].subsections.length == data1.subsections.length && data1.subsections.length > 0)
          {
            dupFound2 = true;
            console.log(dupFound2);
          //  break;
          }
          else
          {
            dupFound2 = false;
          }
        }
        if(dupFound2 == true)
        {
          alert("Course already in cart! Not added.");
          dupFound = true;
         // newCartCourses.splice(i, 1);
           data1.isSubAdded = false;
           data1.isSecAdded = false;
        }
        else
        {
          data1.isSubAdded = true;
          data1.isSecAdded = true;
        }
      }
    }

 
    console.log(dupFound);
    if(dupFound == false)
    {
      console.log( newCartCourses.length);
    for(var s = 0; s < newCartCourses.length; s++)
    {
      if(data1.isSecAdded == true)
      {
          console.log(newCartCourses);
          console.log("insec");
          var t = 0;
          for(t = 0; t < newCartCourses.length; t++)
          {
            for(var j = 0; j < data1.sections.length; j++)
            {
              console.log(newCartCourses[t]);
              console.log(newCartCourses[t].sections);
              console.log(newCartCourses);
              
              console.log(data1.sections);
              console.log(data1.sections[j]);

              console.log(newCartCourses[t].coursekey);
              console.log(data1.coursekey);
          
              if(newCartCourses[t].sections.includes(data1.sections[j]) && newCartCourses[t].coursekey === data1.coursekey)
              {
                alert("A section from this course is already in the cart. Check it out!");
                dupFound = true;
                newSec = false;
                data1.isSubAdded = true;
              }
              else if (newCartCourses[t].coursekey === data1.coursekey)
              {
                //console.log("SUB2");
                newCartCourses[t].sections.push(data1.sections[j]); 
                //dupFound = true;
                console.log(newCartCourses[t].sections);
                dupFound = true;
                newSec = false;
                data1.isSubAdded = true;
              }
              console.log(newCartCourses[t]);
            }
          }
          console.log(newSec);
          // if(newSec == true)
          // {
          //   console.log(t);
          //   newCartCourses[t-1].sections.push(data1.sections[j]); 
          // }
      }
      if(data1.isSubAdded == true)
      {
          console.log("insub");
  
        var m = 0;
        for(m = 0; m < newCartCourses.length; m++)
        {
          console.log(i);
          for(var w = 0; w < data1.subsections.length; w++){
          
              console.log(newCartCourses[m].subsections);
              console.log(newCartCourses);
              
              console.log(data1.subsections);
              console.log(data1.subsections[w]);

              console.log(newCartCourses[m].coursekey);
              console.log(data1.coursekey);
              if(newCartCourses[m].subsections.includes(data1.subsections[w]) && newCartCourses[m].coursekey === data1.coursekey)
              {
              //alert("A subsection from this course is already in the cart. Check it out!");
              dupFound = true;
              newSub = false;
              //break;
              }
              else if (newCartCourses[m].coursekey === data1.coursekey)
              {
                console.log(data1.subsections[w]);
                newCartCourses[m].subsections.push(data1.subsections[w]); 
                dupFound = true;
                newSub = false; 
              }
            }
          }
          // if(newSub == true)
          // {
          //   newCartCourses[m].subsections.push(data1.sections[w]); 
          // } 
      }
    }
  }
  console.log(dupFound);
    if (dupFound == false )
    {
      console.log(data1.isAllAdded)
      newCartCourses.push(data1); 
    }
  

    console.log(newCartCourses);
   
    this.setState({cartCourses: newCartCourses});
    this.setState({hideButton: false});
    console.log(this.state.cartCourses);
    return this.getSectionInfo();
   // console.log("nowhere" + this.state.cartCourses);
  }
  
  getSectionInfo()
  {
   // console.log(this.state.cartCourses);
   let listSec = [];
  // console.log(data2);
   console.log(this.state.cartCourses);
     listSec.push(
    <Card.Header> 
        
    </Card.Header>
 // this.state.cartCourses[0]
   );
  
   let wholeCourse = {};
   let sectionArr = [];
   let subsArr = [];

      for(const section of Object.entries(this.state.cartCourses))
      {
     /*   if(section[1].sections === "" || section[1].sections === undefined)
        {
          break;
        }*/
        console.log(section);
       // style={{ display: this.state.hideButton ? "none" : "block" }}
        listSec.push(
          <Card key = {section.name}>
            <Card.Body> 
            {console.log("in the card")}
            <Button className="fullButton" variant="primary" size="sm" onClick={()=>this.removeFull(section[1].coursekey, section[1])}> Remove Entire Course</Button>
            {console.log(section[1].name)}
            {console.log(section[1].number)}
           <p>{section[1].name}</p>
           <p>{section[1].number}</p> 
            </Card.Body>
          </Card>
        );
        console.log(section[1].sections);
        if(section[1].sections != null)
        {
        for(const secVal of Object.values(section[1].sections))
        {
          
          listSec.push(
            <Card key = {section.name}>
            <Card.Body> 
              
            <Button variant="primary" size="sm" onClick={()=>this.removeSection(section[1].coursekey, secVal)}> Remove Section</Button>
            {console.log(secVal)}
            {secVal}
            { console.log(listSec)}

            </Card.Body>
          </Card>
           );
            console.log(listSec);

        }
       // console.log(sectionArr);
        // wholeCourse[section] = sectionArr;
        console.log(section[1].subsections);
        // if(section[1].subsections == undefined){
        //   break;
        // }
         if(section[1].subsections !== undefined){
          console.log(section[1].subsections);
        for(const subsection of Object.entries(section[1].subsections))
        {
         // console.log(subsection);
          listSec.push(
            <Card key = {section.name}>
            <Card.Body> 
            { console.log(subsection)}
            {console.log(section[1])}
            {console.log(section[1].coursekey)}
            <Button variant="primary" size="sm" onClick={()=>this.removeSubsection(section[1].coursekey, subsection[1])}> Remove Subsection</Button>
            {subsection[1]}
           { console.log(subsection[1])}
            </Card.Body>
          </Card>
          );
        }
      } 
      }
      }
    console.log(listSec);
    return listSec;
  }

 removeFull(coursekey, course) {
   console.log(course);
    let newCartCourses4 = this.state.cartCourses;
    console.log(this.state.cartCourses);
    console.log(newCartCourses4);
   console.log(coursekey);
   console.log(course);
   //console.log(index);
   for(var i = 0; i < newCartCourses4.length ; i++)
   {
      //console.log(section);
      console.log(newCartCourses4)
      if(newCartCourses4[i].coursekey === coursekey)
      {
        newCartCourses4[i].name = "";
        newCartCourses4[i].number = "";
        newCartCourses4[i].sections = "";
        newCartCourses4[i].subsections = "";
      }
    
     this.setState({hideButton: true});
        // var ind = section[1].indexOf(course);
        // console.log(ind);
        //  if (ind !== -1)
        //  {
        //   section[1].sections.splice(ind, 1);
        //   section[1].subsections = [];
        //   section[1] = [];
        //  }
        
        //  console.log(section[1]);
          console.log(newCartCourses4);
    }
    this.setState({cartCourses: newCartCourses4});
  }

   removeSection(coursekey, sect) {
    let newCartCourses3 = this.state.cartCourses;
    console.log(this.state.cartCourses);
    console.log(newCartCourses3);
   console.log(coursekey);
   console.log(sect);
   //console.log(index);
 
    for(const section of Object.entries(newCartCourses3))
    {
      console.log(section[1].sections)
        console.log(sect);
        var ind = section[1].sections.indexOf(sect);
        console.log(ind);
         if (ind !== -1)
         {
          section[1].sections.splice(ind, 1);
          section[1].subsections = [];
         }
       
          console.log(section[1].sections);
          console.log(section[1].subsections);
          console.log(newCartCourses3);
    }
    this.setState({cartCourses: newCartCourses3});
  }

   removeSubsection(coursekey, subsect) {
    let newCartCourses2 = this.state.cartCourses;
    console.log(this.state.cartCourses);
    console.log(newCartCourses2);
   console.log(coursekey);
   console.log(subsect);
   //console.log(index);
 
    for(const section of Object.entries(newCartCourses2))
    {
      console.log(section[1].subsections)
        console.log(subsect);
        var ind = section[1].subsections.indexOf(subsect);
        console.log(ind);
         if (ind !== -1)
         {
          section[1].subsections.splice(ind, 1);
         }
          console.log(section[1].subsections);
          console.log(newCartCourses2);
    }
    this.setState({cartCourses: newCartCourses2});
  }

  componentDidMount() {
    // fetch('https://mysqlcs639.cs.wisc.edu:5000/classes').then(
    //   res => res.json()
    // ).then(data => this.setState({allCourses: data, filteredCourses: data, subjects: this.getSubjects(data)}))
    this.setState({allCourses: fallback, filteredCourses: fallback, subjects: this.getSubjects(fallback)});
  }

  componentDidMount() {
    Promise.all([fetch('https://mysqlcs639.cs.wisc.edu/classes'),
    fetch('https://mysqlcs639.cs.wisc.edu/students/5022025924/classes/completed/')
    ])
    .then(( [res, res2]) => Promise.all([res.json(), res2.json()]))
    .then(([data, data2]) => this.setState({allCourses: data, recCourses: data2, filteredCourses: data, subjects: this.getSubjects(data)}));
    console.log(this.data);
  }



  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(const course of Object.values(data)) {
      if(subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({filteredCourses: courses})
  }

  setRecCourses(courses) {
    let newFilRec = this.state.filteredRecCourses;
    console.log("main");

    for(const section of Object.entries(this.state.allCourses))
    {
         console.log(section);
      //    console.log(section[1]);
        // console.log(section[1].name);
        // console.log(section[1].number);
        //  console.log(section[1].subject);
        //  console.log(section[1].keywords);
       
      for(const rating of Object.entries(this.state.intRatings))
      {
    //  console.log(rating[1]);
    let dupFound = false;
      if (section[1].subject ===  rating[1].subject && rating[1].rating >= 3)
      {
        for(const previous of Object.values(this.state.recCourses))
        {
          for(let i=0; i < previous.length; i++)
          {
          console.log(previous[i]);
            if(previous[i] === section[0])
            {
             ///  console.log(this.state.recCourses);
              console.log(section[0]);
              dupFound = true;
              break;
            }
          }   
        }
        for(const filtered of Object.entries(this.state.filteredRecCourses))
        {
          console.log(filtered[1])
          if (section[1].name === filtered[1].name)
          {
            dupFound = true;
          }
        }
        if(dupFound === false)
        {
          newFilRec.push(section[1]);
        }
      }

    //To remove after low Ratings
    // else if (section[1].subject ===  rating[1].subject && rating[1].rating < 3)
    // {
    //   console.log("inelse");
    //   //newFilRec = "";
    //   // this.setState({filteredRecCourses: newFilRec});
    //   // this.setRecCourses();
    //   for(var j = 0; j < newFilRec.length; j++)
    //   {
    //     console.log(newFilRec[j]);
    //     if(newFilRec[j].subject === rating[1].subject)
    //     {
    //       newFilRec[j] = ""; 
    //     }
    //   }
    //  // this.setState({filteredRecCourses: newFilRec});
    //   //this.setRecCourses();
    // }
    this.setState({filteredRecCourses: newFilRec});
    console.log(this.state.filteredRecCourses);
  }
}
}

  clearRecCourses(courses) {
    let newFilRec = [];
    this.setState({ filteredRecCourses: newFilRec });
    // this.setState({ activeState1: 0 });
    // this.setState({ activeState2: 0 });
    // this.setState({ activeState3: 0 });
    // this.setState({ activeState4: 0 });
    // this.setState({ activeState5: 0 });

    console.log(this.state.filteredRecCourses);
  }


 // <!-- <Recommender data2 = {this.state.recCourses} setRecCourses = {(data2) => this.setRecCourses(data2)} />

  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
      <Tabs  activeKey={this.state.key}  onSelect={key => this.setState({ key })}>
				<Tab  eventKey="home" title="Home" >
        
        <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects}/>
          <div style={{marginLeft: '20vw'}}>
          <CourseArea data={this.state.filteredCourses} setCartCourses = {(data) => this.setCartCourses(data)}/>
          </div>


				</Tab>
				<Tab eventKey="cart" title="Cart">
            {this.getSectionInfo()}
      	</Tab> 
        <Tab eventKey="recommender" title="Recommender">
            <Row className="justify-content-md-center">
              
              <Col sm="auto" ><div  style = {{fontWeight: 'bold'}}>Step 1: Rate Previous Courses<br /></div>
              {this.getRecCourses()}</Col>
              <Col md="auto"><div  style = {{fontWeight: 'bold'}}>Step 2: Rate your Interests<br /></div> 
              {this.getIntAreas()}</Col>
              <Col xl><div  style = {{fontWeight: 'bold'}}>Recommended Classes:</div>
              <Button size="sm" variant="primary" onClick= {() =>this.setRecCourses()} >Generate Recommendations</Button>
              <Button size="sm" variant="danger" onClick= {() =>this.clearRecCourses()} >Clear Recommendations</Button>
              <CourseArea data={this.state.filteredRecCourses} setCartCourses = {(data) => this.setCartCourses(data)}/></Col> 
            </Row>
      	</Tab> 
			</Tabs>
    

      </>
    )
  }
}

export default App;
