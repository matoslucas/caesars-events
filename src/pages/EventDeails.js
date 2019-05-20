import React from "react";
// import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";

import EventCard from "../components/EventCard";

class EventDeails extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      data: {
        id: 0,
        attending_count: 0,
        description: "",
        name: "",
        cover: {
          source: ""
        },
        start_time: new Date(),
        end_time: new Date(),
        place: {
          location: {
            street: "",
            city: "",
            state: ""
          }
        }
      }
    };

    this.loadEventFromFireBase = this.loadEventFromFireBase.bind(this);
    // this.onClickHandler = this.onClickHandler.bind(this)
    // this.getMyEvents = this.getMyEvents.bind(this)
  }

  componentDidMount() {
    this.loadEventFromFireBase();
  }

  loadEventFromFireBase() {
    //console.log(firebase.database().ref('/events/'))
    const { match } = this.props;
    /*
        const _self = this

        firebase.database().ref('/events/'+match.params.id).once('value').then(function (snapshot) {                       
            _self.setState({ data: snapshot.val() })
        });
       */
  }

  render() {
    //const { match } = this.props
    const { data } = this.state;
    if (!data) return <Redirect to="/" />;
    //return 'detils' + match.params.id
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <EventCard
          data={data}
          sign={false}
          onSave={null}
          single={true}
          GoogleCalendarLink={null}
        />
      </div>
    );
  }
}

export default EventDeails;
