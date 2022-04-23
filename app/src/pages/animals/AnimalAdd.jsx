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

const AnimalAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      age: '',
      sex: '',
      species: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório'),
      age: Yup.string().required('Idade é obrigatória'),
      sex: Yup.string().required('Sexo é obrigatório'),
      species: Yup.string().required('Espécie é obrigatória'),
    }),
  });
  return (
    <>
      <Helmet>
        <title>Adicionar Animal</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenCrudToolbar title="Adicionar Animal" goBackPath="/admin/animal" />
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
                          helperText={formik.touched?.nome && formik.errors?.name}
                          label="Nome"
                          placeholder="Nome"
                          type="text"
                          name="name"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(formik.touched.age && formik.errors.age)}
                          fullWidth
                          helperText={formik.touched?.age && formik.errors?.age}
                          label="Idade"
                          placeholder="Idade"
                          type="text"
                          name="age"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.age}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(formik.touched.sex && formik.errors.sex)}
                          fullWidth
                          helperText={formik.touched.sex && formik.errors.sex}
                          label="Sexo"
                          placeholder="Sexo"
                          type="text"
                          name="sex"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.sex}
                          inputProps={{ style: { textTransform: 'uppercase' } }}
                          variant="outlined"
                        />
                      </FormControl>
                      <FormControl fullWidth variant="outlined" sx={{ p: 2 }}>
                        <TextField
                          error={Boolean(
                            formik.touched.species && formik.errors.species
                          )}
                          fullWidth
                          helperText={
                            formik.touched.species && formik.errors.species
                          }
                          label="Espécie"
                          placeholder="Espécie"
                          type="text"
                          name="species"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.species}
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

export default AnimalAdd;
