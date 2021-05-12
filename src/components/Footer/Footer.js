import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export const Footer = () => {
  return (
    <Box m={3}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'© BookSelf '+(new Date().getFullYear())}
      </Typography>
    </Box>
  );
}