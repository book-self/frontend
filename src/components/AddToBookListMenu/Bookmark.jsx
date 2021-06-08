import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fab from "@material-ui/core/Fab";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/User/UserSlice";

import { fetchAllUserBookLists } from "../../pages/BookList/BookListFetch";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  fab: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const Bookmark = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

    const [bookLists, setBookLists] = useState(null);
    const [inList, setInList] = useState("None");
    const { id } = useSelector(selectUser);

    useEffect(() => {
      if (!id) return;

      async function getBookLists() {
        const lists = await fetchAllUserBookLists(id);
        setBookLists(lists);

        for (const list of lists) {
          if (list.books.includes(props.bookId)) {
            setInList(list.id);
            break;
          }
        }
      }

      getBookLists();
    }, [id, props.bookId]);

    const handleChange = (value) => {
      if (value === inList) return;

      const oldListId = inList;
      if (oldListId !== "None")
        axios.delete(
          `${process.env.REACT_APP_API_URL}/v1/book-lists/${oldListId}/books/${props.bookId}`
        );

      setInList(value);
      axios.post(
        `${process.env.REACT_APP_API_URL}/v1/book-lists/${value}/books/${props.bookId}`
      );
    };

  return (
    <div className={classes.root} style={{ width: props.width}}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleExpansionChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="primary" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className={classes.fab}>
            <Fab color="primary" aria-label="add" mar>
              <LibraryAddIcon />
            </Fab>
            <Typography
              variant="h5"
              component="span"
              color="primary"
              style={{
                fontWeight: "bold",
                marginBottom: "1rem",
                fontVariant: "small-caps",
                textAlign: "center",
              }}
            >
              {id && "save for later"}
              {!id && "sign in to save"}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {id && (
            <div
              style={{
                position: "relative",
                width: "300px",
              }}
            >
              {!bookLists ? (
                <Skeleton
                  variant="rect"
                  width={250}
                  height={125}
                  style={{ margin: "auto" }}
                />
              ) : (
                <FormControl style={{ marginLeft: "1.25rem" }}>
                  <RadioGroup
                    value={inList}
                    onChange={(event) => handleChange(event.target.value)}
                  >
                    <FormControlLabel
                      control={<Radio color="primary" />}
                      value="None"
                      label="None"
                    />

                    {bookLists?.map((bookList, index) => (
                      <FormControlLabel
                        key={index}
                        control={<Radio color="primary" />}
                        value={bookList.id}
                        label={bookList.bookListName ?? bookList.listType}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
