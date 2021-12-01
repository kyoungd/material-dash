import React, { useState } from "react";
import {
    Button,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Chip,
    Grid
} from "@material-ui/core";
import moment from 'moment';
import { v4 as uuidv4 } from "uuid";
import Widget from "../../../../components/Widget/Widget";
import useStyles from "../../styles";

export default function TableNews({ news }) {
    const [newsSource, setNewsSource] = useState('YAHOO');
    const classes = useStyles();

    if (news == null || news.length <= 0)
        return <div />

    let stories = news.tweet;
    switch (newsSource) {
        case 'YAHOO':
            stories = news.yahoo;
            break;
        case 'GOOGLE':
            stories = news.google;
            break;
        case 'TWEET':
        default:
            stories = news.tweet;
            break;
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <div className={classes.margin}>
                    <Button color={newsSource === 'YAHOO' ? "primary" : "secondary"}>Yahoo Finance</Button>
                    <Button color={newsSource === 'GOOGLE' ? "primary" : "secondary"}>Google</Button>
                    <Button color={newsSource === 'TWEET' ? "primary" : "secondary"}>Tweet</Button>
                </div>
                <Widget title="NEWS" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                    <Table className="mb-0">
                        <TableBody>
                            <TableRow key="0">
                                <TableCell>PUB DATE</TableCell>
                                <TableCell>TITLE</TableCell>
                                <TableCell>DESCRIPTION</TableCell>
                                <TableCell>SENTIMENT</TableCell>
                                <TableCell>LINK</TableCell>
                            </TableRow>
                            {stories.map((story) => (
                                <TableRow key={uuidv4()}>
                                    <TableCell>{moment(story.pub_date).format("HH:mm:ss")}</TableCell>
                                    <TableCell>{story.title}</TableCell>
                                    <TableCell>{story.description}</TableCell>
                                    <TableCell>{story.sentiment}</TableCell>
                                    <TableCell><a href={story.link} rel="noreferrer">LINK</a></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Widget>
            </Grid>
        </Grid>
    );
}
