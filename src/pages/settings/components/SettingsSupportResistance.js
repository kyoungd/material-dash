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

export default function SettingsSupportResistance({ settings, dispatch }) {
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

    const boxChecked = (checkboxName) => {
        const keys = Object.keys(state);
        if (checkboxName in keys)
            if (state[checkboxName])
                return <Checkbox color="primary" defaultChecked />
        return <Checkbox color="primary" />
    }

    return (
        <>
            <Card className={classes.card}>
                <CardHeader title="Support and Resistance Lines" />
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
                                control={boxChecked("sr_1h_x")}
                                onChange={handleChange}
                                name="sr_1h_x"
                                label="1 hour"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                onChange={handleChange}
                                name="sr_4h_x"
                                label="4 hour"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                onChange={handleChange}
                                name="sr_1d_x"
                                label="daily"
                            />
                            <FormControlLabel
                                control={<Checkbox color="primary" />}
                                onChange={handleChange}
                                name="sr_1w_x"
                                label="weekly"
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    );
}
