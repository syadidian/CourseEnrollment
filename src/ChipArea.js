import React from 'react';
import Card from 'react-bootstrap/Card';
import Chip from './Chip';

class ChipArea extends React.Component{
    state = {
        
      }

getChips() {
    let chipList = [];
   // console.log(this.props.chips);

    for(const chipLabel of Object.values(this.props.chips)) {
       
        chipList.push(<Chip key={chipLabel} title={chipLabel} onChipDelete={this.props.onChipDelete}/>);
    }
 //   console.log(chipList);
    return chipList;
}



render() {
    return <Card style={{display: 'flex', flexWrap: 'wrap', alginItems:'flex-start', padding:4}}>
        {this.getChips()}
    </Card>
}

}

export default ChipArea;