import React, { useEffect, useState } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CreateEvent from "./components/eventComponent";
import CreateUser from "./components/userComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

/*
const App = () => {
  return (
    <div>
      {users.map(u => <h4 key={u._id}>userName : {u.userName}</h4>)}
      {events.map(u => <h4 key={u._id}>eventName : {u.title}</h4>)}
    </div>
  )
}
export default App
*/

function App() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const getData = async () => {
    const res = await axios.get("/api/users");
    setUsers(res.data);

    const res2 = await axios.get("/api/events");
    setEvents(res2.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const classes = useStyles();

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Xperience
          </Typography>
          <Button
            component={Link}
            to="/create-user"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            user
          </Button>
          <Button
            component={Link}
            to="/create-event"
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            event
          </Button>
        </Toolbar>
      </AppBar>
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={CreateUser} />
          <Route path="/create-user" component={CreateUser} />
          <Route path="/create-event" component={CreateEvent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
