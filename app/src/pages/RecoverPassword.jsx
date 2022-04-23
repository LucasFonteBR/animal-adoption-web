import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';
import { recoverPassword } from '../services/AuthenticatorService';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const RecoverPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Recuperar Senha</title>
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
        <Container maxWidth="sm">
          <Card sx={{ mt: '20%', p: 5, textAlign: 'center' }}>
            <Formik
              initialValues={{
                usuario: '',
              }}
              validationSchema={Yup.object().shape({
                usuario: Yup.string()
                  .email('Email do usuário inválido')
                  .required('Email do usuário é obrigatório'),
              })}
              onSubmit={async (values) => {
                await dispatch(recoverPassword(values, navigate));
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                touched,
                values,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box sx={{ textAlign: 'left', mb: 1 }}>
                    <Typography color="textPrimary" variant="h6">
                      Para recuperar sua senha, informe seu e-mail e siga as
                      instruções enviadas.
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <TextField
                    error={Boolean(touched.usuario && errors.usuario)}
                    fullWidth
                    helperText={touched.usuario && errors.usuario}
                    label="Email"
                    margin="normal"
                    name="usuario"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.usuario}
                    variant="outlined"
                  />
                  <Box sx={{ py: 1, textAlign: 'right' }}>
                    <Typography color="textSecondary" variant="body1">
                      <Link to="/login" variant="h6">
                        Login
                      </Link>
                    </Typography>
                  </Box>
                  <Box sx={{ py: 1, textAlign: 'center' }}>
                    <Button
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                      title="Recuperar Senha"
                      sx={{ mt: 1, width: '150px' }}
                      startIcon={<PasswordIcon titleAccess="Recuperar Senha" />}
                    >
                      Recuperar
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default RecoverPassword;
