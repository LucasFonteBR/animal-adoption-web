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
import NumberFormat from 'react-number-format';

const PeopleAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [perfilList, setPerfilList] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      cpf: '',
      rg: '',
      email: '',
      phone: '',
      birthDate: '',
      street: '',
      number: '',
      district: '',
      city: '',
      complement: '',
      zipCode: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      cpf: Yup.string()
        .required('CPF é obrigatório')
        .matches(/^(\d{3}\.?\d{3}\.?\d{3}-?\d{2})$/, 'CPF inválido'),
      rg: Yup.string()
        .required('RG é obrigatório')
        .matches(/^(\d{2}\.?\d{3}\.?\d{3}-?\d{1})$/, 'RG inválido'),
      birthDate: Yup.string().nullable(),
      email: Yup.string().required('Email é obrigatório'),
      phone: Yup.string().required('Telefone é obrigatório'),
      street: Yup.string().required('Rua é obrigatória'),
      number: Yup.string().required('Número é obrigatório'),
      zipCode: Yup.string().required('CEP é obrigatório'),
      complement: Yup.string(),
      city: Yup.string().required('Cidade é obrigatória'),
      district: Yup.string().required('Bairro é obrigatório'),
    }),
    onSubmit: async (values) => {
      await dispatch((values, navigate));
    },
  });
  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {};
    if (!isLoadData && perfilList.length <= 0) {
      setLoadData(true);
      fetchData().then();
    }
  });
  return (
    <>
      <Helmet>
        <title>Adicionar Pessoa</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenCrudToolbar title="Adicionar Pessoa" goBackPath="/admin/pessoa" />
          <Box>
            <form onSubmit={formik.handleSubmit}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(formik.touched.name && formik.errors.name)}
                          fullWidth
                          helperText={formik.touched.name && formik.errors.name}
                          label="Nome"
                          placeholder="Nome"
                          type="text"
                          name="name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="###.###.###-##"
                          mask="_"
                          error={Boolean(formik.touched.cpf && formik.errors?.cpf)}
                          fullWidth
                          helperText={formik.touched.cpf && formik.errors?.cpf}
                          label="CPF"
                          placeholder="CPF"
                          type="text"
                          name="cpf"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.cpf}
                          customInput={TextField}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="##.###.###-#"
                          mask="_"
                          error={Boolean(formik.touched.rg && formik.errors?.rg)}
                          fullWidth
                          helperText={formik.touched.rg && formik.errors?.rg}
                          label="RG"
                          placeholder="RG"
                          type="text"
                          name="rg"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.rg}
                          customInput={TextField}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="(##) #####-####"
                          mask="_"
                          error={Boolean(
                            formik.touched.phone && formik.errors?.phone
                          )}
                          fullWidth
                          helperText={formik.touched.phone && formik.errors?.phone}
                          label="Telefone"
                          placeholder="Telefone"
                          type="text"
                          name="phone"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.phone}
                          customInput={TextField}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.email && formik.errors.email
                          )}
                          fullWidth
                          helperText={formik.touched.email && formik.errors.email}
                          label="Email"
                          placeholder="Email"
                          type="text"
                          name="email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="##-##-####"
                          mask="_"
                          error={Boolean(
                            formik.touched.birthDate && formik.errors?.birthDate
                          )}
                          fullWidth
                          helperText={
                            formik.touched.birthDate && formik.errors?.birthDate
                          }
                          label="Data de Nascimento"
                          placeholder="Data de Nascimento"
                          type="text"
                          name="birthDate"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.birthDate}
                          customInput={TextField}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <NumberFormat
                          format="#####-###"
                          mask="_"
                          error={Boolean(
                            formik.touched.zipCode && formik.errors?.zipCode
                          )}
                          fullWidth
                          helperText={
                            formik.touched.zipCode && formik.errors?.zipCode
                          }
                          label="CEP"
                          placeholder="CEP"
                          type="text"
                          name="zipCode"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.zipCode}
                          customInput={TextField}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.street && formik.errors.street
                          )}
                          fullWidth
                          helperText={formik.touched.street && formik.errors.street}
                          label="Rua"
                          placeholder="Rua"
                          type="text"
                          name="street"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.street}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.number && formik.errors.number
                          )}
                          fullWidth
                          helperText={formik.touched.number && formik.errors.number}
                          label="Número"
                          placeholder="Número"
                          type="text"
                          name="number"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.number}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.complement && formik.errors.complement
                          )}
                          fullWidth
                          helperText={
                            formik.touched.complement && formik.errors.complement
                          }
                          label="Complemento"
                          placeholder="Complemento"
                          type="text"
                          name="complement"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.complement}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.district && formik.errors.district
                          )}
                          fullWidth
                          helperText={
                            formik.touched.district && formik.errors.district
                          }
                          label="Bairro"
                          placeholder="Bairro"
                          type="text"
                          name="district"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.district}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(formik.touched.city && formik.errors.city)}
                          fullWidth
                          helperText={formik.touched.city && formik.errors.city}
                          label="Cidade"
                          placeholder="Cidade"
                          type="text"
                          name="city"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.city}
                          customInput={TextField}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
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

export default PeopleAdd;
