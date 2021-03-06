const {Header, Segment, Feed} = require("semantic-ui-react");

const EventsFeed = () => {
  const image = "/assets/user.png";
  const date = "3 days ago";
  const summary = "Diana joined an event";
  return (
    <>
      <Header attached color="teal" icon="newspaper" content="News feed" />
      <Segment attached="bottom">
        <Feed>
          <Feed.Event image={image} date={date} summary={summary} />
          <Feed.Event image={image} date={date} summary={summary} />
          <Feed.Event image={image} date={date} summary={summary} />
        </Feed>
      </Segment>
    </>
  );
};

export default EventsFeed;
