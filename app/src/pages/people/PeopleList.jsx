import React, { useEffect, useState } from 'react';
import { Button, Container, Fab, TableCell, Tooltip } from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { ScreenListToolbar } from '../../components/toolbar/ScreenListToolbar';
import { deletePerson, getAllPeople } from '../../services/PeopleService';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { id: 'name', label: 'NOME', minWidth: 200 },
  { id: 'cpf', label: 'DOCUMENTO', minWidth: 200 },
  { id: 'city', label: 'ENDEREÇO', minWidth: 100 },
  { id: 'status', align: 'center', label: 'ATIVA' },
  {
    id: 'actions',
    align: 'right',
    minWidth: 130,
    disablePadding: false,
    label: 'AÇÕES',
  },
];

const PeopleList = () => {
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const builderData = (response) => {
    setRows(response || []);
  };
  const searchPeople = async () => {
    console.log('pessoa');
    const peopleResponse = await dispatch(getAllPeople());
    builderData(peopleResponse);
  };

  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await searchPeople();
    };
    if (!isLoadData && rows.length <= 0) {
      setLoadData(true);
      fetchData().then();
    }
    return () => {
      builderData(null);
    };
  }, [isLoadData]);

  const handleSubmit = async (uuid) => {
    await dispatch(deletePerson(uuid));
  };
  return (
    <>
      <Helmet>
        <title>Lista de Pessoas</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenListToolbar
            title="Lista de Pessoas"
            goAddRegisterPath="/admin/pessoa/adicionar"
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.uuid}>
                        {columns.map((column) => {
                          if (column.id === 'actions') {
                            return (
                              <TableCell key={column.id} align="right">
                                <Link to={`/admin/pessoa/visualizar/${row.uuid}`}>
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
                                <Link to={`/admin/pessoa/editar/${row.uuid}`}>
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
                                <Button onClick={handleSubmit(row.uuid)}>
                                  <Tooltip
                                    title="Deletar"
                                    sx={{
                                      marginRight: 1,
                                      marginBottom: 0.3,
                                      marginTop: 0.3,
                                      padding: 2,
                                    }}
                                  >
                                    <Fab color="default" size="small">
                                      <DeleteIcon />
                                    </Fab>
                                  </Tooltip>
                                </Button>
                              </TableCell>
                            );
                          }
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

export default PeopleList;
