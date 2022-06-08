import React, { useEffect, useState } from 'react';
import { Container, TableCell } from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { ScreenListToolbar } from '../../components/toolbar/ScreenListToolbar';
import { getAllAnimals } from '../../services/AnimalService';

const columns = [
  { id: 'name', label: 'NOME', minWidth: 200 },
  { id: 'age', label: 'IDADE', minWidth: 100 },
  { id: 'sex', label: 'SEXO', minWidth: 200 },
  { id: 'species', label: 'ESPÉCIE', minWidth: 200 },
];

const AnimalList = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const builderData = (response) => {
    setRows(response || []);
  };

  const searchAnimals = async () => {
    console.log('teste');
    const responseAnimals = await dispatch(getAllAnimals());
    builderData(responseAnimals);
  };

  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await searchAnimals();
    };
    if (!isLoadData && rows.length <= 0) {
      setLoadData(true);
      fetchData().then();
    }
    return () => {
      builderData(null);
    };
  }, [isLoadData]);

  return (
    <>
      <Helmet>
        <title>Lista de Animais</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenListToolbar
            title="Lista de Animais"
            goAddRegisterPath="/admin/animal/adicionar"
          ></ScreenListToolbar>
          <PerfectScrollbar>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ top: 1, minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </PerfectScrollbar>
        </Paper>
      </Container>
    </>
  );
};

export default AnimalList;
