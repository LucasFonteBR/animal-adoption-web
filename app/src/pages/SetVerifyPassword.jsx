import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate, useParams } from 'react-router';
import PropTypes from 'prop-types';
import {
  changeRecoverPassword,
  firstAccess,
} from '../services/AuthenticatorService';
import { useDispatch } from 'react-redux';

export const SetVerifyPassword = (props) => {
  const { typeOperation } = props;
  const { hash } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <Helmet>
        <title>Redefinição Senha</title>
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
                senha: '',
                repitaSenha: '',
                codigo: '',
              }}
              validationSchema={Yup.object().shape({
                senha: Yup.string().required('Senha é obrigatório'),
                repitaSenha: Yup.string()
                  .oneOf([Yup.ref('senha'), null], 'As senhas devem corresponder')
                  .required('Repita a senha é obrigatório'),
                codigo: Yup.string().required('Código é obrigatório'),
              })}
              onSubmit={async (values) => {
                const requestBody = {
                  senha: values.senha,
                  hash,
                  codigo: values.codigo,
                };

                if (typeOperation === 'FIRST_ACCESS') {
                  await dispatch(firstAccess(requestBody, navigate));
                }

                if (typeOperation === 'RECOVER_PASSWORD') {
                  await dispatch(changeRecoverPassword(requestBody, navigate));
                }
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
                      Redefina sua senha de acesso ao sistema.
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                    <TextField
                      error={Boolean(touched.senha && errors.senha)}
                      fullWidth
                      helperText={touched.senha && errors.senha}
                      label="Senha"
                      placeholder="Senha"
                      margin="normal"
                      name="senha"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.senha}
                      variant="outlined"
                    />
                  </FormControl>

                  <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                    <TextField
                      error={Boolean(touched.repitaSenha && errors.repitaSenha)}
                      fullWidth
                      helperText={touched.repitaSenha && errors.repitaSenha}
                      label="Repita a senha"
                      placeholder="Repita a senha"
                      margin="normal"
                      name="repitaSenha"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.repitaSenha}
                      variant="outlined"
                    />
                  </FormControl>

                  <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                    <TextField
                      error={Boolean(touched.codigo && errors.codigo)}
                      fullWidth
                      helperText={touched.codigo && errors.codigo}
                      label="Código enviado por e-mail"
                      placeholder="Código enviado por e-mail"
                      margin="normal"
                      name="codigo"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.codigo}
                      variant="outlined"
                    />
                  </FormControl>

                  <Box sx={{ py: 1, textAlign: 'center' }}>
                    <Button
                      color="primary"
                      size="large"
                      type="submit"
                      variant="contained"
                      title="Acessar"
                      sx={{ mt: 1, width: '150px' }}
                      startIcon={<LoginIcon titleAccess="Acessar" />}
                    >
                      ACESSAR
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

SetVerifyPassword.prototype = {
  typeOperation: PropTypes.string.isRequired,
};
