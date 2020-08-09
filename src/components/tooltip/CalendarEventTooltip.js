import React from "react";
import { Tooltip, Button } from "shards-react";

export default class CalendarEventTooltip extends React.Component {
  state = { open: false };


  toggle= () =>  {
    this.setState({
      open: !this.state.open
    });
  }

  render() {
    return (
      <div>
        <div style={{background:'#3688D8',color:"white",height:'100%'}} id={`eventToolTip${this.props.eventId}`}>
          <b>{this.props.timeText}</b>
          <i>{this.props.title}</i>
        </div>
        <Tooltip
          trigger="click"
          open={this.state.open}
          target={`#eventToolTip${this.props.eventId}`}
          toggle={this.toggle}
        >
          <Button style={{margin:".2em",height:'100%',display:'inline-block', whiteSpace:'normal', verticalAlign:'top'}}theme="danger">Cancel</Button><br/>
          <Button theme="success">&nbsp;&nbsp;Pay&nbsp;&nbsp;&nbsp;</Button>
        </Tooltip>
      </div>
    );
  }
}