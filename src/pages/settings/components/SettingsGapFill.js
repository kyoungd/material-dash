import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
} from "@material-ui/core";

// styles
import useStyles from "../styles";

export default function SettingsNotifications({ settings, dispatch }) {
    const [state, setState] = useState({});
    useEffect(() => {
        setState(settings);
    }, [settings]);

    var classes = useStyles();

    const handleChange = (event) => {
        const isChecked = event.target.checked;
        setState({ [event.target.name]: isChecked }, () => {
            dispatch({ type: "SETTINGS", payload: state });
        });
    };

    return (
        <>
            <Card className={classes.card}>
                <CardHeader title="Gap Fills" />
                <Divider />
                <CardContent>
                    <Grid container spacing={6} wrap="wrap">
                        <Grid item md={4} sm={6} sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                            xs={12}
                        >
                            <FormControlLabel
                                onChange={handleChange}
                                control={<Checkbox color="primary" />}
                                label="Overnight"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                control={<Checkbox />}
                                label="Daily"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                control={<Checkbox />}
                                label="Weekly"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
