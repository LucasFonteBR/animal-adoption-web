import { Container, Grid } from '@mui/material';
import { Helmet } from 'react-helmet';
import { CardQuantityDashboard } from '../../components/dashboard/CardQuantityDashboard';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({
    animais: 0,
    pessoasCadastradas: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const responseDashboard = await dispatch();
      if (responseDashboard) {
        setDashboardData(responseDashboard);
      }
    };
  });

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <>
            <CardQuantityDashboard
              title="Animais"
              quantity={dashboardData.animais}
            />
            <CardQuantityDashboard
              title="Pessoas cadastradas"
              quantity={dashboardData.pessoasCadastradas}
            />
          </>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
