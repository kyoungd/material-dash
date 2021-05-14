import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);


export function PopHtmlTooltip(buttonText, title, text) {
    return (
        <HtmlTooltip
            title={
                <React.Fragment>
                    <Typography color="inherit">{title}</Typography>
                    <em>{text}</em>
                </React.Fragment>
            } >
            <Button>{buttonText}</Button>
        </HtmlTooltip>
    )
}


export function PopLightTooltip(buttonText, popupMessage) {
    return (
        <LightTooltip title={popupMessage}>
            <Button>{buttonText}</Button>
        </LightTooltip>
    )
}


export function PopDarkTooltip(buttonText, popupMessage) {
    return (
        <BootstrapTooltip title={popupMessage}>
            <Button>{buttonText}</Button>
        </BootstrapTooltip>
    )
}


// export default function CustomizedTooltips() {
//     return (
//         <div>
//             { PopLightTooltip("light", "pop up light")}
//             { PopDarkTooltip("dark", "pop up dark")}
//             { PopHtmlTooltip("html", "my title", "I bring you good news.")}
//         </div>
//     );
// }
