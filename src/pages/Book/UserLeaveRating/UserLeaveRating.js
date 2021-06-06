import { useState, useEffect } from 'react';
import { Rating } from '@material-ui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  IconButton, TextField, Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteForever from '@material-ui/icons/DeleteForever';

import { fetchUserRating, postRating, patchRating, deleteRating } from './UserLeaveRatingFetch';
import { useStyles } from './UserLeaveRatingStyles';

import { useSelector } from 'react-redux';
import { selectUser } from "../../../store/User/UserSlice";
import { Prompt } from 'react-router';


export const UserLeaveRating = (props) => {
    const classes = useStyles();

    const { id } = useSelector(selectUser);

    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState(null);

    const [isAlreadyRated, setIsAlreadyRated] = useState(false);
    const [isReviewEditable, setIsReviewEditable] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);


    useEffect(() => {
      async function getUserRating() {
        const json = await fetchUserRating(props.bookId);
  
        if (json) { // if they have already left a rating
          setUserRating(json["rating"]);
          setUserReview(json["comment"]); // review could possibly be empty as it's optional
          setIsAlreadyRated(true);
        }
      }
  
      getUserRating();
    }, [props.bookId]);


    const handleRatingChange = (_, value) => {
        if (!isAlreadyRated)
          postRating(props.bookId, { "rating": value });
        else
          patchRating(props.bookId, { "rating": value });

        setUserRating(value);
        setIsAlreadyRated(true);
    };


    const handleReviewSubmit = () => {
        let review = userReview?.trim();
        if (review === '') review = null;

        setUserReview(review);
        patchRating(props.bookId, { "comment": review }); // user pressed on the save icon
    };


    const handleRatingDelete = () => {
      deleteRating(props.bookId)
        .then(statusCode => {
          if (statusCode === 200) {
            // reset all state to defaults:
            setUserRating(0);
            setUserReview(null);
            setIsAlreadyRated(false);
            setIsReviewEditable(false);
            setIsDeleteDialogOpen(false);
          }
        });
    }


    return ( id &&
      <>
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center'}}>

            <div>
                { isAlreadyRated ? <Typography variant="h3" style={{fontWeight: 'bold'}} gutterBottom>Your rating</Typography> :
                  <>
                    <Typography variant="h2" style={{fontWeight: 'bold'}} gutterBottom>Read this book?</Typography>
                    <Typography variant="h4" style={{marginBottom: '1rem'}}>Leave your rating</Typography>
                  </>
                }
                <Rating style={{marginTop: '1rem'}} value={userRating} precision={1} size="large" onChange={handleRatingChange} />
            </div>

          { isAlreadyRated && <>
            <div className={classes.review}>
                <TextField
                    label={userReview ? null : "Leave an optional review"}
                    multiline
                    style={{width: "85%"}}
                    rows={10}
                    variant="outlined"
                    onChange={(event) => setUserReview(event.target.value)}
                    value={userReview ?? ''}
                    InputProps={{
                        className: classes.textField,
                    }}
                    disabled={!isReviewEditable}
                />
                { !isReviewEditable ?
                    <IconButton className={classes.iconButton} onClick={() => { setIsReviewEditable(true); }}>
                        <EditIcon />
                    </IconButton>
                :
                    <IconButton className={classes.iconButton} onClick={() => { handleReviewSubmit(); setIsReviewEditable(false); }}>
                        <SaveIcon />
                    </IconButton>
                } 
            </div>

            <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
              <DeleteForever style={{fontSize: "2.5rem"}} />
            </IconButton>

            <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
              <DialogTitle>{'Delete your rating & review?'}</DialogTitle>

              <DialogContent>
                <DialogContentText>
                  This action can't be undone. But you can always leave another rating if you change your mind later. 
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <Button onClick={() => setIsDeleteDialogOpen(false)} color="secondary">
                  Disagree
                </Button>
                <Button onClick={handleRatingDelete} color="primary" autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </>
          }
        </div>

        <Prompt
          when={isReviewEditable}
          message="You haven't saved your review! Do you still want to leave?"
        />
      </>
    )
}
