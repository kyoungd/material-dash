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
import useStyles from "../../styles";
import { v4 as uuidv4 } from "uuid";
import Widget from "../../../../components/Widget/Widget";

export default function TableNews({ news }) {

    const classes = useStyles();
    const [newsSource, setNewsSource] = useState('YAHOO');
    if (news == null || Object.entries(news).length <= 0)
        return <div />

    let stories = news.twitters;
    switch (newsSource) {
        case 'YAHOO':
            stories = news.yahoos;
            break;
        case 'GOOGLE':
            stories = news.googles;
            break;
        case 'TWEET':
        default:
            stories = news.twitters;
            break;
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Widget title="NEWS" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                    <div className={classes.margin}>
                        <Button
                            color={newsSource === 'YAHOO' ? "primary" : "secondary"}
                            onClick={() => setNewsSource('YAHOO')}>Yahoo Finance</Button>
                        <Button
                            color={newsSource === 'GOOGLE' ? "primary" : "secondary"}
                            onClick={() => setNewsSource('GOOGLE')}>Google Finance</Button>
                        <Button
                            color={newsSource === 'TWEET' ? "primary" : "secondary"}
                            onClick={() => setNewsSource('TWEET')}>Tweets</Button>
                    </div>
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
                                    <TableCell><a href={story.link} target="_blank" rel="noreferrer">LINK</a></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Widget>
            </Grid>
        </Grid>
    );
}
