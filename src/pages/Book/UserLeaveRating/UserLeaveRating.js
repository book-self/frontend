import { useState, useEffect } from 'react';
import { Rating } from '@material-ui/lab';
import { IconButton, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import clsx from  'clsx';

import { fetchUserRating, postRating, patchRating } from './UserLeaveRatingFetch';
import { useStyles } from './UserLeaveRatingStyles';


export const UserRating = (props) => {
    const classes = useStyles();

    const [userRating, setUserRating] = useState(0);
    const [userReview, setUserReview] = useState("Leave an optional review.");

    const [displayReview, setDisplayReview] = useState(false);
    const [isReviewEditable, setIsReviewEditable] = useState(false);


    useEffect(() => {
      async function getUserRating() {
        const json = await fetchUserRating(props.bookId);
  
        if (json) { // if they have already left a rating
          
          setUserRating(json["rating"]);
          setUserReview(json["comment"] ?? "Leave an optional review."); // review could possibly be empty as it's optional
          setDisplayReview(true);
        }
      }
  
      // TODO only if the user exists:
      getUserRating();
    }, [props.bookId]);


    const handleRatingChange = (_, value) => {
        if (!displayReview) // must be their very first rating of this book, not very semantic... to be improved
            postRating(props.bookId, { "rating": value });
        else
            patchRating(props.bookId, { "rating": value });

        setUserRating(value);
        setDisplayReview(true);
    };
  

    const handleReviewChange = event => {
        setUserReview(event.target.value);
        setDisplayReview(true);
    };
  

    const handleReviewSubmit = () => {
        patchRating(props.bookId, { "comment": userReview }); // user pressed on the save icon
    };

    return (
        <div style={{textAlign: 'center', display: 'flex'}}>
            <div style={{width: "50%"}}>
                { displayReview ?
                    <Typography variant="h3" style={{fontWeight: 'bold'}} gutterBottom>Your rating</Typography>
                :
                <>
                    <Typography variant="h2" style={{fontWeight: 'bold'}} gutterBottom>Read this book?</Typography>
                    <Typography variant="h4" style={{marginBottom: '1rem'}}>Leave your rating</Typography>
                </>
                }
                <Rating style={{marginTop: '2rem'}} value={userRating} precision={1} size="large" onChange={handleRatingChange} />
            </div>

            <div className={ clsx(classes.review, { 'display: none': !displayReview, 'display: flex': displayReview }) }>
                <TextField
                    label="Share your opinion"
                    multiline
                    style={{width: "85%"}}
                    rows={10}
                    variant="outlined"
                    onChange={handleReviewChange}
                    value={userReview}
                    InputProps={{
                        className: classes.textField,
                    }}
                    disabled={!isReviewEditable}
                />
                { !isReviewEditable ?
                    <IconButton style={{position: 'relative', top: '-30px', left: '15px'}} onClick={() => { setIsReviewEditable(true); }}>
                        <EditIcon />
                    </IconButton>
                :
                    <IconButton style={{position: 'relative', top: '-30px', left: '15px'}} onClick={() => { handleReviewSubmit(); setIsReviewEditable(false); }}>
                        <SaveIcon />
                    </IconButton>
                } 
            </div>
        </div>
    )
}
