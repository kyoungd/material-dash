import React, { useState } from "react";
import { Grid, Select, MenuItem, Input } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";
import { useUserState, useUserDispatch } from "../../../../context/UserContext";

export default function BigStat(props) {
  var { product, total, color, firstdata, sentiment, third } = props;
  var classes = useStyles();
  var theme = useTheme();
  var userState = useUserState();
  var userDispatch = useUserDispatch();

  // local
  var [value, setValue] = useState("daily");

  return (
    <div
      className={userState.media === props.product.toUpperCase() ? classes.notificationContainer : classes.none}
      onClick={() => {
        console.log('clicked BigStat...', props);
        userDispatch({ type: "MEDIA", payload: props.product.toUpperCase() });
      }} >
      <Widget
        header={
          <div className={classes.title}>
            <Typography variant="h5">{product}</Typography>

            <Select
              value={value}
              onChange={e => setValue(e.target.value)}
              input={
                <Input
                  disableUnderline
                  classes={{ input: classes.selectInput }}
                />
              }
              className={classes.select}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </div>
        }
        upperTitle
        bodyClass={classes.bodyWidgetOverflow}
      >
        <div className={classes.totalValueContainer}>
          <div className={classes.totalValue}>
            <Typography size="xxl" color="text" colorBrightness="secondary">
              {total[value] > 0 ? total[value] : ''}
            </Typography>
            {/* <Typography color={total.percent.profit ? "success" : "secondary"}>
              &nbsp;{total.percent.profit ? "+" : "-"}
              {total.percent.value}%
            </Typography> */}
          </div>
          <BarChart width={150} height={70} data={getRandomData()}>
            <Bar
              dataKey="value"
              fill={theme.palette[color].main}
              radius={10}
              barSize={10}
            />
          </BarChart>
        </div>
        <div className={classes.bottomStatsContainer}>
          <div className={classnames(classes.statCell, classes.borderRight)}>
            <Grid container alignItems="center">
              <Typography variant="h6">{firstdata[value].value}</Typography>
              <ArrowForwardIcon
                className={classnames(classes.profitArrow, {
                  [classes.profitArrowDanger]: !firstdata[value].profit,
                })}
              />
            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
              {firstdata[value].title}
            </Typography>
          </div>
          <div className={classes.statCell}>
            <Grid container alignItems="center">
              <Typography variant="h6">{sentiment[value].value}</Typography>
              <ArrowForwardIcon
                className={classnames(classes.profitArrow, {
                  [classes.profitArrowDanger]: !sentiment[value].profit,
                })}
              />
            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
              {sentiment[value].title}
            </Typography>
          </div>
          <div className={classnames(classes.statCell, classes.borderRight)}>
            <Grid container alignItems="center">
              <Typography variant="h6">
                {third[value].value}
              </Typography>
              <ArrowForwardIcon
                className={classnames(classes.profitArrow, {
                  [classes.profitArrowDanger]: !third[value].profit,
                })}
              />
            </Grid>
            <Typography size="sm" color="text" colorBrightness="secondary">
              {third[value].title}
            </Typography>
          </div>
        </div>
      </Widget>
    </div>
  );
}

// #######################################################################

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
