import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Chip from '@material-ui/core/Chip';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import {
    Share as ShareIcon
} from "@material-ui/icons";
import { IconButton } from '@material-ui/core'
import SlideDialogBox from '../SlideDialogBox';
import { mdiConsoleNetworkOutline } from '@mdi/js';

const ENDPOINT = process.env.SERVER_ENDPOINT || "http://localhost:1337";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minWidth: 160,
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #dadde9',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
    },
    secondary: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fff',
    },
    sectionInfo: {
        color: '#aaa',
        fontWeight: 400,
        fontSize: 'calc(0.8vw)',
    },
    shareStudyButton: {
        margin: theme.spacing(0.5),
    },
}));

function volumeString(avgVol) {
    return avgVol > 1000000
        ? (avgVol / 1000000).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " M"
        : (avgVol / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " K";
}

// sector = { sector } avgVol = { average_volume_10days } float = { float_volume }
// shortPercent = { short_percent } shortVolume = { short_volume } summary = { summary }
// institutions = { major_investor }

export default function Ticker({ company, symbol, sentiment, avgVol, floats, shortPercent, shortVolume, institutions, summary, dispatch }) {
    const [openDialog, setOpenDialog] = React.useState(false);

    // dispatch({type: "SELECTION", payload: symbol});

    React.useEffect(() => {
        console.log(openDialog);
    }, [openDialog]);
    const classes = useStyles();
    const volume = volumeString(avgVol);
    const shorts = volumeString(shortVolume);
    return (
        <div className={classes.root} onClick={() => dispatch({ type: "SELECTION", payload: symbol })}>
            <div className={classes.section1}>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h4">
                            {symbol}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6">
                            {institutions}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography color="textSecondary" variant="body2">
                    {company}
                </Typography>
            </div>
            <Divider variant="middle" />
            <div className={classes.section2}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs={4}>
                        <Typography color="textSecondary" className={classes.sectionInfo} noWrap>
                            Volume
                        </Typography>
                        <Typography size="md">{volume}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography color="textSecondary" className={classes.sectionInfo} noWrap>
                            Short %
                        </Typography>
                        <Typography size="md">{shortPercent}%</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography color="textSecondary" className={classes.sectionInfo} noWrap>
                            Short Volume
                        </Typography>
                        <Typography size="md">{shorts}</Typography>
                    </Grid>
                </Grid>
                <Typography gutterBottom variant="body1">
                    <IconButton aria-label="chart"
                        onClick={(e) => {
                            console.log('ICON BUTTON CLICKED');
                            const apiUrl = ENDPOINT + "/studies?symbol=" + symbol;
                            navigator.clipboard.writeText(apiUrl).then(() => {
                                setOpenDialog(true);
                                console.log('---- copied');
                            });
                        }}
                    >
                        <ShareIcon />
                    </IconButton>
                    <SlideDialogBox
                        title="EXTERNAL LINK TO CLIPBOARD"
                        message="The script is copied to clipboard.  Paste it to Thinkscript."
                        openbox={openDialog}
                        setDialogState={setOpenDialog} />
                </Typography>
            </div>
        </div >
    );
}


// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import { Chip } from "@material-ui/core";

// const useStyles = makeStyles(theme => ({
//     root: {
//         minWidth: 200,
//     },
//     bullet: {
//         display: 'inline-block',
//         margin: '0 2px',
//         transform: 'scale(0.8)'
//     },
//     title: {
//         fontSize: 14
//     },
//     pos: {
//         marginBottom: 0
//     },
//     up: {
//         backgroundColor: theme.palette.success.main,
//         color: '#fff'
//     },
//     down: {
//         backgroundColor: theme.palette.warning.main,
//         color: '#fff'
//     },
//     neutral: {
//         backgroundColor: theme.palette.secondary.main,
//         color: '#fff'
//     },
//     widgetSymbol: {
//         alignSelf: 'flex-end',
//         marginTop: -5,
//         marginLeft: 80,
//         position: 'absolute'
//     }
// }));


// const sentimentWord = (sentmentValue) => {
//     if (sentmentValue > 5)
//         return "up";
//     else if (sentmentValue < -5)
//         return "down";
//     else
//         return "neutral";
// }

// export default function Ticker({ company, symbol, sentiment, lastNews, newsSummary }) {
//     const classes = useStyles();

//     return (
//         <Card className={classes.root} variant="outlined">
//             <CardActions>
//                 <CardContent>
//                     <Typography variant="h5" component="h2">
//                         {symbol} ({sentiment > 0 ? "+" : ""}{sentiment})
//                     </Typography>
//                     <Typography className={classes.pos} color="textSecondary">
//                         {company}
//                     </Typography>
//                 </CardContent>
//             </CardActions>
//         </Card >
//     );
// }
