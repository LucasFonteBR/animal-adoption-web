import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  TextField,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import { ScreenCrudToolbar } from '../../components/toolbar/ScreenCrudToolbar';
import SaveIcon from '@mui/icons-material/Save';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../../services/UserService';

const UserAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      nome: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object().shape({
      nome: Yup.string().required('Nome é obrigatório'),
      email: Yup.string().email('Email inválido').required('Email é obrigatório'),
      password: Yup.string().required('Senha é obrigatória'),
      confirmPassword: Yup.string().required('Confirme a senha é obrigatória'),
    }),
    onSubmit: async (values) => {
      await dispatch(addUser(values, navigate));
    },
  });

  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const responseProfile = await dispatch();
    };
  });

  return (
    <>
      <Helmet>
        <title>Adicionar Usuário</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenCrudToolbar title="Adicionar Usuário" goBackPath="/admin/usuario" />
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(formik.touched.nome && formik.errors.nome)}
                          fullWidth
                          helperText={formik.touched.nome && formik.errors.nome}
                          label="Nome"
                          placeholder="Nome"
                          type="text"
                          name="nome"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.nome}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.email && formik.errors.email
                          )}
                          fullWidth
                          helperText={formik.touched.email && formik.errors.email}
                          label="Email"
                          placeholder="Email"
                          type="email"
                          name="email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.password && formik.errors.password
                          )}
                          fullWidth
                          helperText={
                            formik.touched.password && formik.errors.password
                          }
                          label="Senha"
                          placeholder="Senha"
                          type="password"
                          name="password"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.confirmPassword &&
                              formik.errors.confirmPassword
                          )}
                          fullWidth
                          helperText={
                            formik.touched.confirmPassword &&
                            formik.errors.confirmPassword
                          }
                          label="Confirme a sua senha"
                          placeholder="ConfirmPassword"
                          type="password"
                          name="confirmPassword"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.confirmPassword}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <Box
                  sx={{
                    textAlign: 'center',
                    p: 2,
                  }}
                >
                  <Button
                    color="primary"
                    size="large"
                    type="submit"
                    variant="contained"
                    startIcon={<SaveIcon fontSize="large" />}
                    sx={{ width: 150 }}
                    title="Cadastrar"
                  >
                    CADASTRAR
                  </Button>
                </Box>
              </Card>
            </form>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default UserAdd;
