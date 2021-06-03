import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/User/UserSlice";
import { Container } from "@material-ui/core";

import {ShelfTest} from "../../components/Shelf/ShelfTest"
import { fetchBookLists } from "../../components/Shelf/ShelfFetch";

export const ShelfPage = ({ location }) => {
  const [bookLists, setBookLists] = useState([]);
  const { username, id } = useSelector(selectUser);

  useEffect(() => {
    (
      async () => {
        const { data } = await fetchBookLists(id);
        setBookLists(data);
      }
    )()
  }, [id])

  return (
    <Container maxWidth="sm">
      <h1>Book Lists of { username }</h1>
      
      <ShelfTest lists = {bookLists}/>
    </Container>
  );
};
