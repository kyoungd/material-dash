// My custom useStyles hook

import makeStyles from '@material-ui/styles/makeStyles';
export const useStyles = styles => makeStyles(theme => styles(theme))();
