import { Helmet } from 'react-helmet';
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
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Paper from '@mui/material/Paper';
import SaveIcon from '@mui/icons-material/Save';
import { ScreenCrudToolbar } from '../../components/toolbar/ScreenCrudToolbar';
import { changePasswordUser } from '../../services/UserService';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export const UserChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      senhaAtual: '',
      novaSenha: '',
    },
    validationSchema: Yup.object().shape({
      senhaAtual: Yup.string()
        .min(6, 'Senha precisa ter no mínimo 6 caracteres')
        .required('Senha atual é obrigatório'),
      novaSenha: Yup.string()
        .min(6, 'Senha precisa ter no mínimo 6 caracteres')
        .required('Senha nova é obrigatório'),
    }),
    onSubmit: async (values) => {
      await dispatch(changePasswordUser(values, navigate));
    },
  });

  return (
    <>
      <Helmet>
        <title>Alterar Senha</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        <Container maxWidth={false}>
          <Paper sx={{ width: '100%' }}>
            <ScreenCrudToolbar title="Alterar Senha" />
            <Box>
              <form onSubmit={formik.handleSubmit}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                          <TextField
                            error={Boolean(
                              formik.touched.senhaAtual && formik.errors.senhaAtual
                            )}
                            fullWidth
                            helperText={
                              formik.touched.senhaAtual && formik.errors.senhaAtual
                            }
                            label="Senha Atual"
                            placeholder="Senha Atual"
                            type="password"
                            name="senhaAtual"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.senhaAtual}
                            variant="outlined"
                          />
                        </FormControl>
                      </Grid>
                      <Grid item md={6} xs={12}>
                        <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                          <TextField
                            error={Boolean(
                              formik.touched.novaSenha && formik.errors.novaSenha
                            )}
                            fullWidth
                            helperText={
                              formik.touched.novaSenha && formik.errors.novaSenha
                            }
                            label="Nova Senha"
                            placeholder="Nova Senha"
                            type="password"
                            name="novaSenha"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.novaSenha}
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
                    >
                      ALTERAR
                    </Button>
                  </Box>
                </Card>
              </form>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};
