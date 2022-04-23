import React, { useState } from 'react';
import { Container, Fab, Switch, TableCell, Tooltip } from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PerfectScrollbar from 'react-perfect-scrollbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { ScreenListToolbar } from '../../components/toolbar/ScreenListToolbar';
import { Link } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'NOME', minWidth: 200 },
  { id: 'age', label: 'IDADE', minWidth: 100 },
  { id: 'sex', label: 'SEXO', minWidth: 200 },
  { id: 'species', label: 'ESPÉCIE', minWidth: 200 },
];

const AnimalList = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const handleChangeBlockUnblockCompany = async (event, row) => {
    const checked = event.target.checked;
    let result;
    if (checked) {
      result = await dispatch(row.id);
    }

    if (!checked) {
      result = await dispatch(row.id);
    }

    if (!result) {
      return;
    }
    const updateRows = [...rows];
    row[event.target.name] = checked;
    updateRows[row] = row;
    setRows(updateRows);
  };

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
                          if (column.id === 'actions') {
                            return (
                              <TableCell key={column.id} align="right">
                                <Link to={`/admin/animal/visualizar/${row.id}`}>
                                  <Tooltip
                                    title="Detalhes"
                                    sx={{
                                      marginRight: 1,
                                      marginBottom: 0.3,
                                      marginTop: 0.3,
                                      padding: 2,
                                    }}
                                  >
                                    <Fab color="default" size="small">
                                      <VisibilityIcon />
                                    </Fab>
                                  </Tooltip>
                                </Link>
                                <Link to={`/admin/animal/editar/${row.id}`}>
                                  <Tooltip
                                    title="Alterar"
                                    sx={{
                                      marginRight: 1,
                                      marginBottom: 0.3,
                                      marginTop: 0.3,
                                      padding: 2,
                                    }}
                                  >
                                    <Fab color="default" size="small">
                                      <EditIcon />
                                    </Fab>
                                  </Tooltip>
                                </Link>
                              </TableCell>
                            );
                          }
                          const value = row[column.id];
                          if (typeof value === 'boolean') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Switch
                                  checked={row[column.id]}
                                  onChange={(e) =>
                                    handleChangeBlockUnblockCompany(e, row)
                                  }
                                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  name={column.id}
                                />
                              </TableCell>
                            );
                          }
                          if (column.id === 'nomeDPO') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <p>{value}</p>
                                <p>{row.emailDPO}</p>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format ? column.format(value) : value}
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
