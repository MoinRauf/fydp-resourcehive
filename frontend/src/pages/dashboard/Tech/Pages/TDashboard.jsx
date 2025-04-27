import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Stack, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiCard from "@mui/material/Card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import Layout from "../components/Layout/Layout";
import AppTheme from "../../../form/admin/shared-theme/AppTheme";
import ApiSender from "../Trigger/ApiSender";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...(theme.palette.mode === "dark" && {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)({
  flex: 1,
  minHeight: "100vh",
  padding: "60px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Dashboard = () => {
  const [model1Data, setModel1Data] = useState([]);
  const [model2Data, setModel2Data] = useState([]);
  const [model3Data, setModel3Data] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        // Optional: Trigger API before fetching
        await axios.post("http://127.0.0.1:8000/trigger");

        const [res1, res2, res3] = await Promise.all([
          axios.post("http://127.0.0.1:5000/venti/predict"),
          axios.get("http://127.0.0.1:5000/venti/predict2"),
          axios.get("http://127.0.0.1:5000/venti/predict"),
        ]);

        setModel1Data(res1.data);
        setModel2Data(res2.data);
        setModel3Data(res3.data);
      } catch (error) {
        console.error("Error fetching model data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModelData();
  }, []);

  const combinedData = model1Data.map((item, index) => ({
    name: item.name,
    model1: item.value,
    model2: model2Data[index]?.value || 0,
    model3: model3Data[index]?.value || 0,
  }));

  if (loading) {
    return (
      <AppTheme>
        <CssBaseline enableColorScheme />
        <Layout>
          <SignInContainer>
            <CircularProgress />
          </SignInContainer>
        </Layout>
      </AppTheme>
    );
  }

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Layout>
        <SignInContainer>
          <ApiSender/>
          <Grid container spacing={4}>
            {/* Model 1 Graph */}
            <Grid item xs={12} md={6}>
              <Card>
                <Typography variant="h6" gutterBottom>Model 1 Output</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={model1Data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Model 2 Graph */}
            <Grid item xs={12} md={6}>
              <Card>
                <Typography variant="h6" gutterBottom>Model 2 Output</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={model2Data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Model 3 Graph */}
            <Grid item xs={12} md={6}>
              <Card>
                <Typography variant="h6" gutterBottom>Model 3 Output</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={model3Data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

            {/* Combined Graph */}
            <Grid item xs={12} md={6}>
              <Card>
                <Typography variant="h6" gutterBottom>Combined Models Output</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={combinedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="model1" stroke="#8884d8" name="Model 1" />
                    <Line type="monotone" dataKey="model2" stroke="#82ca9d" name="Model 2" />
                    <Line type="monotone" dataKey="model3" stroke="#ffc658" name="Model 3" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Grid>

          </Grid>
        </SignInContainer>
      </Layout>
    </AppTheme>
  );
};

export default Dashboard;
