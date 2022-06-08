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
import { getAllVaccines } from '../../services/VaccineService';

const columns = [{ id: 'name', label: 'NOME', minWidth: 200 }];

const VaccineList = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const builderData = (response) => {
    setRows(response || []);
  };

  const searchVaccines = async () => {
    console.log('vacina');
    const responseVaccines = await dispatch(getAllVaccines());
    builderData(responseVaccines);
  };

  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await searchVaccines();
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
        <title>Lista de Vacinas</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenListToolbar
            title="Lista de Vacinas"
            goAddRegisterPath="/admin/vacina/adicionar"
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

export default VaccineList;
