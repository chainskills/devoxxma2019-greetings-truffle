import React, {useEffect, useState} from "react";

import "materialize-css/dist/css/materialize.min.css";

import "./Account.css";

const Events = ({drizzle, greetings, serviceFee}) => {
  const {Greetings} = drizzle.contracts;
  const [eventGreetings, setEventGreetings] = useState(null);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    //M.AutoInit();
    // eslint-disable-next-line
  }, []);

  const subscribe = () => {
    console.log("Subscribe");
    if (eventGreetings !== null) {
      // event already registered
      return;
    }
    const event = Greetings.events
      .GreetingsChangedEvent({
        fromBlock: "latest",
        toBlock: "latest"
      })
      .on("data", function(event) {
        const eventMessage =
          "account: " +
          event.returnValues._account +
          ", greetings: " +
          event.returnValues._greetings;

        console.log(eventMessage);
      })
      .on("error", function(error) {
        console.error(error);
      });

    setEventGreetings(event);
  };

  const unsubscribe = () => {
    console.log("Unsubscribe");
    if (eventGreetings !== null) {
      eventGreetings.unsubscribe();
      setEventGreetings(null);
    }
  };

  return (
    <div className="row">
      <div className="col m3 push-m8 input-field">
        {eventGreetings !== null && (
          <a
            href="#!"
            className="waves-effect waves-light btn left primary-content blue"
            style={{margin: "5px"}}
            onClick={() => unsubscribe()}
          >
            Unsubscribe
          </a>
        )}
        {eventGreetings === null && (
          <a
            href="#!"
            className="waves-effect waves-light btn left primary-content blue"
            style={{margin: "5px"}}
            onClick={() => subscribe()}
          >
            Subscribe
          </a>
        )}
      </div>
      {events}
    </div>
  );
};

export default Events;
