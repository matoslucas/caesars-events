import React from "react";
// import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { DatePicker } from "material-ui-pickers";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import EventCard from "../components/EventCard";
import ApiCalendar from "react-google-calendar-api";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      events: [],
      filteredEvents: [],
      GoogleCalendarEvents: [],
      sign: ApiCalendar.sign,
      loading: true
    };

    this.signUpdate = this.signUpdate.bind(this);
    this.loadDataFromApi = this.loadDataFromApi.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.setGoogleCalendarEvents = this.setGoogleCalendarEvents.bind(this);
    this.saveEvent = this.saveEvent.bind(this);

    ApiCalendar.onLoad(() => {
      ApiCalendar.listenSign(this.signUpdate);
      if (ApiCalendar.sign) {
        this.signUpdate(ApiCalendar.sign);
      } else {
        ApiCalendar.handleAuthClick();
      }
    });
  }

  getGoogleCalendarUpcomingEvents() {
    ApiCalendar.listUpcomingEvents(300).then(({ result }) => {
      this.setGoogleCalendarEvents(result.items);
    });
  }

  componentDidMount() {
    this.loadDataFromApi();
  }

  setGoogleCalendarEvents(GoogleCalendarEvents) {
    this.setState({
      GoogleCalendarEvents
    });
  }

  signUpdate(sign) {
    if (sign) {
      this.getGoogleCalendarUpcomingEvents();
    }
    this.setState({
      sign
    });
  }

  formatDate(date) {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    // console.log( year + '-' + month + '-' + day)
    return year + "-" + month + "-" + day;
  }

  loadDataFromApi() {
    const url = "http://demo5918996.mockable.io/";
    //const url = 'https://www.caesars.com/api/v1/markets/lvm/events'
    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({ events: json, filteredEvents: json, loading: false });
      })
      .catch(ex => {
        console.log("parsing failed", ex);
      });
  }

  saveEvent(data) {
    const { events } = this.state;
    const _self = this;

    let eventData = {
      calendarId: "primary",
      end: {
        dateTime: data.end_time
      },
      start: {
        dateTime: data.start_time
      },
      description: data.description,
      summary: data.name,
      reminders: {
        useDefault: true
      }
    };

    if (data.place && data.place.location) {
      eventData.location =
        data.place.location.latitude + "," + data.place.location.longitude;
    }

    ApiCalendar.createEvent(eventData)
      .then(data => {
        const newValue = events.map((event, index) => {
          if (event.name === eventData.summary) {
            event.GoogleCalendarLink = data.result.htmlLink;
          }
          return event;
        });
        _self.setState({ events: newValue });
      })
      .catch(error => {
        console.log(error.body);
      });
  }

  handleItemClick(event, name) {
    if (name === "sign-in") {
      ApiCalendar.handleAuthClick();
    } else if (name === "sign-out") {
      ApiCalendar.handleSignoutClick();
    }
  }

  handleDateChange(date) {
    const { events } = this.state;

    // filter events
    const newValue = events.filter(item => {
      let toRet = false;
      if (Array.isArray(item.dates)) {
        toRet = item.dates.find(fechas => {
          // console.log(fechas.start)
          return date.isSame(fechas.start, "day");
        });
      }
      return toRet;
    });

    this.setState({ filteredEvents: newValue });
  }

  render() {
    const { loading, filteredEvents, GoogleCalendarEvents, sign } = this.state;

    return (
      <div>
        <AppBar position="static" color="secondary">
          <Toolbar style={{ display: "flex", justifyContent: "flex-end" }}>
            <DatePicker
              format="MMM DD ddd"
              // value={selectedDate}
              onChange={date => this.handleDateChange(date)}
            />
          </Toolbar>
        </AppBar>

        <br />
        <Grid container justify="center" spacing={24}>
          {filteredEvents.length > 1 ? (
            filteredEvents.map((event, index) => {
              console.log(event);
              let GoogleCalendarLink = event.GoogleCalendarLink;
              GoogleCalendarEvents.filter(
                gce => gce.summary === event.name
              ).forEach(event => {
                GoogleCalendarLink = event.url;
              });
              // console.log(GoogleCalendarLink)
              return (
                <Grid item key={event.name + index}>
                  <EventCard
                    data={event}
                    sign={sign}
                    single={true}
                    onSave={this.saveEvent}
                    GoogleCalendarLink={GoogleCalendarLink}
                  />
                </Grid>
              );
            })
          ) : (
            <Button variant="outlined">
              {loading ? "Loading..." : "No Events found for that Date"}
            </Button>
          )}
        </Grid>
      </div>
    );
  }
}

export default Home;
