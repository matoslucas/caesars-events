import React from 'react';

// import PropTypes from 'prop-types';
import ApiCalendar from 'react-google-calendar-api';

// Google calendar API testing 

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.handleItemClick = this.handleItemClick.bind(this);
      }
      
      handleItemClick(event, name): void {
        if (name === 'sign-in') {
          ApiCalendar.handleAuthClick();
        } else if (name === 'sign-out') {
          ApiCalendar.handleSignoutClick();
        }
      }

      createNow() {

        
       
        const customEvent = {
            calendarId: "primary",
              end: {
                date: "2018-12-04"
              },
              start: {
                date: "2018-12-03"
              },
              description: "test 15",
              summary: "test 15",
          }

         /*
          const eventFromNow = {
            event: customEvent,
            calendarId: "primary"
        }*/
      //createEvent(event: object, calendarId: string = this.calendar)
        ApiCalendar.createEvent(customEvent)
          .then((result: object) => {
            console.log(result);
              })
           .catch((error: any) => {
             console.log(error.body);
              });
      }

      render() {
        return (
            <div>
              <button
                  onClick={(e) => this.handleItemClick(e, 'sign-in')}
              >
                sign-in
              </button>
              <button
                  onClick={(e) => this.handleItemClick(e, 'sign-out')}
              >
                sign-out
              </button>

              <button onClick={this.createNow}  >
               Create now
              </button>
              </div>
          );
      }
}

export default Test