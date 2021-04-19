import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    axios.get("/api/users")
      .then(res => {
        const users = res.data;   
        this.setState({ users });
      })
  }
 

  render() {
    return (
      <div>
      
       { this.state.users.map(users => <li>{users.userName}</li>)}

        <p>React Create user Component!</p>
      </div>
    );
  }
}