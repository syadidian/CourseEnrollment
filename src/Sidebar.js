import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import SearchAndFilter from './SearchAndFilter';
import ChipArea from './ChipArea';
import Button from 'react-bootstrap/Button';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.searchAndFilter = new SearchAndFilter();
    this.subject = React.createRef();
    this.minimumCredits = React.createRef();
    this.maximumCredits = React.createRef();
    this.search = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.chipAdd = this.chipAdd.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.onChipDelete = this.onChipDelete.bind(this);
    this.handleLogic = this.handleLogic.bind(this);
    this.handleLogic2 = this.handleLogic2.bind(this);

   // this.changeLogic = this.changeLogic.bind(this);
    this.state = {
        chipList: [],
        color: 'primary',
        text: "AND", 
        color2: 'primary',
        text2: "OFF"
    };
  }

 

handleChange(e) {
    this.setState({search: e.target.value});
 }

 keyPressed(e) {
  if (e.keyCode == 13) {
    this.chipAdd()
   // e.preventDefault();
  }
}

  chipAdd(){
    console.log("initial chip add" + this.state.text);
    let chipTD = [];
    chipTD = this.state.chipList;
    chipTD.push(this.state.search);
    console.log(this.state.search);
    console.log(chipTD);
    //this.state.chipList.push(this.search);
  this.setState( {chipList: chipTD} );
  console.log(this.state.chipList);
  this.setState( {search: ""} );
  console.log(this.state.search);
  this.setCourses();
 }

 onChipDelete(title){
  console.log("Deleting " + title);
  console.log(this.state.chipList);
  let cL = [];
   cL = this.state.chipList;
  console.log(this.state.chipList);
  console.log(cL);

      console.log(title);
      var ind = cL.indexOf(title);
      console.log(ind);
       if (ind !== -1)
       {
        cL.splice(ind, 1);
       }
        console.log(cL);
  this.setState({chipList: cL});
  this.setCourses();
}

  setCourses() {
    this.props.setCourses(this.searchAndFilter.searchAndFilter(this.state.text, this.state.chipList, this.props.courses, this.search.current.value, this.subject.current.value, this.minimumCredits.current.value, this.maximumCredits.current.value));
  }

  handleCreditsKeyDown(e) {
    if(['0','1','2','3','4','5','6','7','8','9','Backspace','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Tab'].indexOf(e.key) === -1)
      e.preventDefault();
  }

  getSubjectOptions() {
    let subjectOptions = [];

    for(const subject of this.props.subjects) {
      subjectOptions.push(<option key={subject}>{subject}</option>);
    }

    return subjectOptions;
  }

  handleLogic = () =>{
    //console.log(this.state.color);
    console.log("LOGIC should change");
    console.log("Before click" + this.state.text);
    if(this.state.text === 'AND')
    {
     //   this.setState({ color: 'danger' });
        this.setState({ text: "OR", color: 'danger' }, () => {this.setCourses()});
    }
    else if(this.state.text === 'OR')
    {
    //    this.setState({ color: 'primary'});
        this.setState({ text: 'AND', color: 'primary' }, () => {this.setCourses()});
    }
    //opposite logic of what is showing is actually taking place
    // so if OR is showing, AND is currently taking place
    console.log("After click" + this.state.text);
   // this.changeLogic();
  
}

handleLogic2 = () =>{
  //console.log(this.state.color);
  console.log("LOGIC should change");
  console.log("Before click" + this.state.text2);
  if(this.state.text2 === 'OFF')
  {
      this.setState({ text2: "ON", color2: 'danger' }, () => {this.setCourses()});
      alert("Recommender is now ON. Please make sure you have rated previous courses (in the Previous Courses tab). You can also further filter the recommendations by adding Interest Areas and/or Search Keywords + Subjects.")
  }
  else if(this.state.text2 === 'ON')
  {
  //    this.setState({ color: 'primary'});
      this.setState({ text2: 'OFF', color2: 'primary' }, () => {this.setCourses()});
  }
  //opposite logic of what is showing is actually taking place
  // so if OR is showing, AND is currently taking place
  console.log("After click" + this.state.text2);
 // this.changeLogic();

}

/* <div>Recommendations</div>
<Button variant={this.state.color2} onClick= {this.handleLogic2} >{this.state.text2}</Button>
<div>Interest Areas</div>
<Form>
        <div key={`default-checkbox`} className="mb-3">
          <Form.Check type="checkbox" id={`default-checkbox`} label={`math`}/>
        </div>
</Form> */

  render() {
   // console.log(this.state.text);
   // this.setCourses();
    return (
      <>
        <Card style={{width: 'calc(20vw - 5px)', marginLeft: '5px', height: 'calc(100vh - 10px)', position: 'fixed', overflowY: 'auto'}}>
          <Card.Body>
            <Card.Title>Search and Filter</Card.Title>
            <Form>
              <Form.Group controlId="formKeywords" onChange={() => this.setCourses()} style={{width: '100%'}}>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" placeholder="Search" autoComplete="off" onKeyDown={this.keyPressed} onChange={this.handleChange} ref={this.search}/>
              </Form.Group>

              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control as="select" ref={this.subject} onClick={() => this.setCourses()}>
                  {this.getSubjectOptions()}
                </Form.Control>
              </Form.Group>

              <div style={{display: 'flex', flexDirection: 'row'}}>
                <Form.Group controlId="minimumCredits" onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Label>Credits</Form.Label>
                  <Form.Control type="text" placeholder="minimum" autoComplete="off" ref={this.minimumCredits}/>
                </Form.Group>
                <div style={{marginLeft: '5px', marginRight: '5px', marginTop: '38px'}}>to</div>
                <Form.Group controlId="maximumCredits" style={{marginTop: '32px'}} onChange={() => this.setCourses()} onKeyDown={(e) => this.handleCreditsKeyDown(e)}>
                  <Form.Control type="text" placeholder="maximum" autoComplete="off" ref={this.maximumCredits}/>
                </Form.Group>
              </div>
            </Form>
            <div>Logic</div>
            <Button variant={this.state.color} onClick= {this.handleLogic} >{this.state.text}</Button>
            <ChipArea chips={this.state.chipList} onChipDelete={this.onChipDelete}/>
          </Card.Body>
        </Card>
      </>
    )
  }
}

export default Sidebar;
