import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  SvgIcon,
  Switch,
  TableCell,
  TablePagination,
  TextField,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import { ScreenListToolbar } from '../../components/toolbar/ScreenListToolbar';
import SearchIcon from '@mui/icons-material/Search';
import { Search } from '@mui/icons-material';
import { getAllUser, userDisable, userEnable } from '../../services/UserService';

const columns = [
  { id: 'nome', label: 'NOME', minWidth: 200 },
  { id: 'email', label: 'EMAIL', minWidth: 150 },
  {
    id: 'dataCriacao',
    label: 'DATA CRIAÇÃO',
    minWidth: 100,
    align: 'right',
    format: (value) =>
      value && value.length > 0 ? moment(value).format('DD/MM/YYYY HH:mm:ss') : '',
  },
  { id: 'status', align: 'center', label: 'ATIVO' },
];

const UserList = () => {
  const dispatch = useDispatch();
  const [querySearch, setQuerySearch] = useState({
    pagina: 0,
    tamanhoPagina: 5,
    nome: null,
    email: null,
  });
  const [rows, setRows] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [perfilList, setPerfilList] = useState([]);

  const builderData = (responseUser) => {
    setRows(responseUser?.itens || []);
    setTotalRecords(responseUser?.paginacao?.total || 0);
  };

  const searchUser = async () => {
    const _querySearch = { ...querySearch, pagina: 0 };
    setQuerySearch(_querySearch);
    const responseUser = await dispatch(getAllUser(_querySearch));
    builderData(responseUser);
  };

  const handleChangePage = async (event, newPage) => {
    const _querySearch = { ...querySearch, pagina: newPage };
    setQuerySearch(_querySearch);
    const responseUser = await dispatch(getAllUser(_querySearch));
    builderData(responseUser);
  };

  const handleChangeRowsPerPage = async (event) => {
    const _querySearch = {
      ...querySearch,
      pagina: 0,
      tamanhoPagina: +event.target.value,
    };
    setQuerySearch(_querySearch);
    const responseUser = await dispatch(getAllUser(_querySearch));
    builderData(responseUser);
  };

  const handleChangeEnableDisableUser = async (event, row) => {
    const checked = event.target.checked;
    let result;
    if (checked) {
      result = await dispatch(userEnable(row.id));
    }

    if (!checked) {
      result = await dispatch(userDisable(row.id));
    }

    if (!result) {
      return;
    }

    const updateRows = [...rows];
    row[event.target.name] = checked;
    updateRows[row] = row;
    setRows(updateRows);
  };

  const [isLoadData, setLoadData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await searchUser();

      const responseProfile = await dispatch();
    };

    if (!isLoadData && rows.length <= 0) {
      setLoadData(true);
      fetchData().then();
    }
  });

  return (
    <>
      <Helmet>
        <title>Lista de Usuários</title>
      </Helmet>
      <Container maxWidth={false}>
        <Paper sx={{ width: '100%' }}>
          <ScreenListToolbar
            title="Lista de Usuários"
            goAddRegisterPath="/admin/usuario/adicionar"
          >
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexWrap: 'wrap',
                m: -1,
              }}
            >
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '35ch', p: 1 },
                }}
                noValidate
                autoComplete="off"
              >
                <FormControl fullWidth sx={{ p: 1 }}>
                  <TextField
                    label="Buscar nome do usuário"
                    fullWidth
                    onChange={(e) =>
                      setQuerySearch({ ...querySearch, nome: e.target.value })
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                          </SvgIcon>
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Buscar nome do usuário"
                    variant="outlined"
                  />
                </FormControl>
              </Box>
              <Box sx={{ p: 1, m: 1 }}>
                <Button
                  fullWidth
                  title="Pesquisar"
                  startIcon={<Search fontSize="medium" />}
                  color="primary"
                  variant="contained"
                  onClick={searchUser}
                >
                  PESQUISAR
                </Button>
              </Box>
            </Box>
          </ScreenListToolbar>
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
                          if (column.id === 'perfil') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value.nome}
                              </TableCell>
                            );
                          }
                          if (typeof value === 'boolean') {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <Switch
                                  checked={row[column.id]}
                                  onChange={(e) =>
                                    handleChangeEnableDisableUser(e, row)
                                  }
                                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                                  name={column.id}
                                />
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={totalRecords}
              rowsPerPage={querySearch.tamanhoPagina}
              page={querySearch.pagina}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}–${to} de ${count !== -1 ? count : `mais que ${to}`}`;
              }}
              labelRowsPerPage="Registro por página:"
            />
          </PerfectScrollbar>
        </Paper>
      </Container>
    </>
  );
};

export default UserList;
