import { Typography } from '@material-ui/core';


export const NotFound = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh', flexDirection: 'column'}}>
      <Typography variant="h1" style={{color: "#ff0033", fontWeight: 'bold'}}>404 Not Found</Typography>
      <Typography variant="h4" style={{marginTop: "35px", fontWeight: 'bold'}}>I suggest you turn a new page.</Typography>
    </div>
  );
}
