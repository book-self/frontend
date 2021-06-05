import { Typography } from '@material-ui/core';


export const NotFound = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', flexDirection: 'column'}}>
      <Typography variant="h1" style={{textAlign: 'center'}} color="secondary">404 Not Found</Typography>
      <Typography variant="h4" style={{textAlign: 'center', marginTop: "35px"}}>Time to turn a new page.</Typography>
    </div>
  );
}
