import React from "react";
import PropTypes from "prop-types";
import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
// import Typography from '@material-ui/core/Typography';
import pink from "@material-ui/core/colors/pink";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SendIcon from "@material-ui/icons/Send";

// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import CloseIcon from '@material-ui/icons/Close';

import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";

import Logo from "../img/Logo";

const styles = theme => ({
  card: {
    maxWidth: 300,
    minWidth: 300
  },
  margin: {
    margin: 0
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "space-around"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: pink[500]
  }
});

class EventCard extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      expanded: this.props.single,
      disabledButton: false
    };

    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    // this.imageClickHandler = this.imageClickHandler.bind(this)
    this.createMarkup = this.createMarkup.bind(this);
  }

  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  onClickHandler() {
    //hideButton
    this.setState({ disabledButton: true });
    this.props.onSave(this.props.data);
  }

  formatDate(dateTime) {
    let newDateString = dateTime;
    var options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    };

    if (window.Intl) {
      const d = new Date(dateTime);
      newDateString = new Intl.DateTimeFormat("en-US", options).format(d);
    }
    // console.log(dateTime, newDateString)

    return newDateString;
  }

  createMarkup(text) {
    if (!text) return "";
    var newText = text.replace(
      "(www.[a-zA-Z0-9-.]+.[a-zA-Z]{2,3}(/S*)?)/g",
      '<a href="//$1">$1</a>'
    );
    // console.log(newText)
    return newText;
  }

  render() {
    const { expanded, disabledButton } = this.state;
    const { classes, GoogleCalendarLink, sign, single } = this.props;
    const {
      price,
      webUrl,
      ticketsUrl,
      category,
      propertyName,
      name,
      dates,
      summary,
      thumbnail,
      url,
      location
    } = this.props.data;
    //console.log(thumbnail)

    let image =
      "https://www.caesars.com/content/dam/corporate/homepage/caesars-black-laurel-logo.png";
    if (thumbnail && thumbnail.url) {
      image = "https://www.caesars.com/" + thumbnail.url;
    }

    let URLMAP = `https://www.google.com/maps/search/?api=1&query=Caesars+Palace+Las+Vegas+Hotel+%26+Casino`;
    if (location) {
      URLMAP = `https://www.google.com/maps/search/?api=1&query=${
        location.latitude
      },${location.longitude}`;
    }
    const street = "TBD";

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Logo />}
          action={
            <IconButton onClick={this.onClickHandler} disabled={disabledButton}>
              {sign && !GoogleCalendarLink ? <FavoriteBorderIcon /> : null}
            </IconButton>
          }
          title={propertyName}
          subheader={""}
        />

        <CardMedia className={classes.media} image={image} title="" />

        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <Button
            href={URLMAP}
            target="_blank"
            style={{ width: "100%", height: 65 }}
            size="small"
            variant="outlined"
            color="secondary"
          >
            {name}
          </Button>

          {/*
                    single? null:  
                        <Button style={{width: '100%'}} size="small" variant="outlined" color="secondary" onClick={this.handleExpandClick}>
                            {expanded?<CloseIcon />:<MoreHorizIcon />}
                        </Button>
                    */}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          {price ? (
            <Chip
              label={<b>{"$" + price} </b>}
              className={classes.chip}
              color="secondary"
              deleteIcon={<FavoriteIcon />}
            />
          ) : null}

          <Fab href={ticketsUrl} target="_blank" size="small">
            <AddShoppingCart />
          </Fab>

          <Fab
            href={"https://www.facebook.com/sharer/sharer.php?u=" + webUrl}
            target="_blank"
            size="small"
            aria-label="Share"
          >
            <ShareIcon />
          </Fab>
          {single ? null : (
            <Fab
              size="small"
              className={classnames(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </Fab>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div
              className="textarea"
              style={{ color: "#fff", whiteSpace: "pre-line" }}
            >
              <Linkify>{summary}</Linkify>
            </div>
            <Divider variant="middle" />
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventCard);
