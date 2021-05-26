import { Typography } from '@material-ui/core';


export const NotFound = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', flexDirection: 'column'}}>
      <Typography variant="h1" color="secondary">404 Not Found</Typography>
      <Typography variant="h4" style={{marginTop: "35px"}}>I suggest you turn a new page.</Typography>
    </div>
  );
}
