import React from "react";
import {
  Card,
  CardHeader
} from "shards-react";
import {connect} from 'react-redux'

const UserDetails = ({ user,jobTitle }) => (
  <Card small className="mb-4 pt-3">
    <CardHeader className="border-bottom text-center">
      <div className="mb-3 mx-auto">
        <img
          className="rounded-circle"
          src={user.picture.url}
          alt={user.name}
          width="110"
        />
      </div>
      <h4 className="mb-0">{`${user.name} ${user.lastname}` }</h4>
      <span className="text-muted d-block mb-2">{jobTitle}</span>
      <span className="text-muted d-block mb-2">{user.email}</span>
    </CardHeader>
  </Card>
);


const msp = (state) => {
  return {
    user: state.user,
    jobTitle: "Barber",
  }
}


export default connect(msp)(UserDetails);
