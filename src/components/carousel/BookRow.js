import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    rowContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 100px",
        minHeight: '600px'
    }
});


export default function BookRow(props) {
    const classes = useStyles();

    return (
        <div className={classes.rowContainer}>
            { props.books }
        </div>
    )
}
