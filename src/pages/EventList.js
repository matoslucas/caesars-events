import React from "react";
// import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// import firebase from '../components/Firebase'

import Grid from "@material-ui/core/Grid";
import EventCard from "../components/EventCard";

class EventList extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      eventListInfo: [],
      token: localStorage.getItem("token") ? localStorage.getItem("token") : ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.getMyEvents = this.getMyEvents.bind(this);
  }
  componentDidMount() {
    /*
        firebase.database().ref('/events/').once('value').then(function(snapshot) {
            console.log(snapshot.val() )
          });
        */
  }

  getMyEvents() {
    /*
        graph.setAccessToken(this.state.token);

        const _self = this
        const fields = [
            "id",
            "name",
            "type",
            "place",
            "attending_count",
            "cover",
            "description",
            "interested_count",
            "start_time",
            "end_time",
        ]

        var params = { fields: fields.join(",") };

        graph.get("me/events", params, function (err, res) {
            console.log(res);
            _self.setState({ eventListInfo: res.data });
        });
        */
    /*
        fb.api(
            '/me/events/',
            'GET',
            {
                "fields": fiels.join(","),
                "access_token": TOKEN,
            },
            function (res) {

                if (!res.error) {
                    //console.log(res)
                    _self.setState({ eventListInfo: res.data });
                }
            }
        )
        */
  }

  onClickHandler() {
    this.getMyEvents();
  }

  handleChange(event) {
    this.setState({ token: event.target.value });
    localStorage.setItem("token", event.target.value);
  }

  saveEvent(data) {
    console.log(data);

    /*
        var eventRef = firebase.database().ref('events/'+data.id);
        eventRef.set(data);
        */
  }

  render() {
    const { eventListInfo } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          alignItems: "center"
        }}
      >
        <TextField
          value={this.state.token}
          onChange={this.handleChange}
          label="Token"
          style={{ margin: 8 }}
          placeholder="insert token"
          helperText=""
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={this.onClickHandler}
        >
          load my events
        </Button>
        <Grid container justify="center" spacing={24}>
          {Array.isArray(eventListInfo)
            ? eventListInfo.map((event, index) => {
                console.log(event);
                return (
                  <Grid item key={event.id}>
                    <EventCard
                      data={event}
                      onSave={this.saveEvent}
                      scraping={true}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </div>
    );
  }
}
export default EventList;
