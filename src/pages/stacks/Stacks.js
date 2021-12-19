import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";

// data

// const dataStackData = [
//   ["threebars", "FANG (2Min)", "15:19:37", "$10.5, $11, $11, $10"],
//   ["threebars", "FANG (5Min)", "15:19:37", "$10.5, $11, $11, $10"]
// ];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  }
}))

const convert2DataTable = (data) => {
  let result = [];
  data.forEach(element => {
    const item = Object.keys(element).map(key => element[key])
    result.push(item);
  });
  return result;
}

const getStatusData = async (url) => {
  try {
    const result = await axios.get(url);
    console.log(result.data);
    const data = result.data;
    const datatable = convert2DataTable(data);
    return datatable;
  }
  catch (error) {
    console.log(error);
  }
}

export default function Stacks() {
  const [dataStackData, setDataStackData] = useState([]);
  const [dataScoreData, setDataScoreData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:3001";
        const url1 = ENDPOINT + "/stocks/stacks";
        const result1 = await getStatusData(url1);
        const url2 = ENDPOINT + "/stocks/scores";
        const result2 = await getStatusData(url2);
        setDataStackData(result1);
        setDataScoreData(result2);
      }
      catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <PageTitle title="Stacks" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Stack List"
            data={dataStackData}
            columns={["Type", "Symbol", "Time", "Closes"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MUIDataTable
            title="Score List"
            data={dataScoreData}
            columns={["Type", "Symbol", "Closes", "Time"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
