import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Auth } from 'aws-amplify';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Dialog
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from '@reach/router';
import EditIdeaModal from '../ideas/EditIdeaModal';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/ducks/snackbar';

function descendingComparator(a, b, orderBy) {
  let value = 0;
  if (a[orderBy] === null || b[orderBy === null]) {
    return 1;
  } else {
    value = a[orderBy].localeCompare(b[orderBy], 'en', { numeric: true });
    return value;
  }
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'title',
    numeric: false,
    disablePadding: true,
    label: 'Title'
  },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description'
  },
  { id: 'cost', numeric: false, disablePadding: false, label: 'Cost' },
  {
    id: 'indoor_outdoor',
    numeric: false,
    disablePadding: false,
    label: 'Indoor/Outdoor'
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category'
  },
  {
    id: 'weather',
    numeric: false,
    disablePadding: false,
    label: 'Weather'
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: false,
    label: 'URL'
  }
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all ideas' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%'
  },
  backBtn: {
    backgroundColor: '#EC795D'
  },
  backBtnText: { color: '#fff' }
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    numSelected,
    signedInUser,
    selectedId,
    setSelected,
    getData,
    ideaToEdit,
    setIdeaToEdit
  } = props;
  console.log('props', props);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setIdeaToEdit({});
    setSelected([]);
    getData(signedInUser.username, signedInUser.token);
    setOpen(false);
  };

  const handleEditIdea = async (e) => {
    e.preventDefault();

    setOpen(true);
  };

  const deletePictureFromS3 = async (e) => {
    try {
      const res = await axios({
        method: 'delete',
        url: `http://localhost:4000/idea/pic`,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email: signedInUser.username,
          token: signedInUser.token,
          uuid: ideaToEdit.picture
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteIdea = async (e) => {
    e.preventDefault();
    deletePictureFromS3();

    if (signedInUser.token) {
      try {
        const res = await axios({
          method: 'delete',
          url: `http://localhost:4000/user/idea`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            email: signedInUser.username,
            token: signedInUser.token,
            id: selectedId
          }
        });
        dispatch(setSnackbar(true, 'success', 'Idea deleted'));
        getData(signedInUser.username, signedInUser.token);
        setSelected([]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const renderButton = () => {
    if (numSelected === 1) {
      return (
        <>
          <IconButton
            aria-label='edit list'
            title='Edit Idea'
            onClick={handleEditIdea}
            open={open}
          >
            <EditIcon />
          </IconButton>

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='edit-idea'
            maxWidth='xl'
          >
            <EditIdeaModal
              ideaToEdit={ideaToEdit}
              setIdeaToEdit={setIdeaToEdit}
              handleClose={handleClose}
              signedInUser={signedInUser}
            />
          </Dialog>

          <Tooltip title='Delete'>
            <IconButton aria-label='delete' onClick={handleDeleteIdea}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div className={classes.titleContainer}>
          <Typography variant='h5' id='tableTitle' component='div'>
            Edit your ideas
          </Typography>
          <Button className={classes.backBtn}>
            <Link to='/' className={classes.backBtnText}>
              Back
            </Link>
          </Button>
        </div>
      )}

      {numSelected > 1 ? (
        <Tooltip title='Delete Idea'>
          <IconButton aria-label='delete Idea' onClick={handleDeleteIdea}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        renderButton()
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};

// DASHBOARD
const Dashboard = () => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('title');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  console.log(rows);
  const [selectedId, setSelectedId] = useState([]);
  const [signedInUser, setSignedInUser] = useState({
    token: '',
    email: ''
  });

  const [ideaToEdit, setIdeaToEdit] = useState({});

  useEffect(() => {
    (async () => {
      const fullInfo = await Auth.currentAuthenticatedUser();
      const token = await fullInfo.signInUserSession.idToken.jwtToken;
      const username = await fullInfo.username;
      setSignedInUser({ token, username });

      if (token) getData(username, token);
    })();
  }, []);

  const getData = async (username, token) => {
    try {
      // GET all of the user's ideas
      const res = await axios({
        method: 'get',
        url: `http://localhost:4000/user/ideas`,
        params: {
          email: username,
          token: token
        }
      });
      // console.log('res.data.message', res.data.message);
      const ideaArr = res.data.message;
      setRows(ideaArr);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desccmc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      console.log(rows);

      const newSelecteds = rows.map((n) => n.title);
      const newSelectedIds = rows.map((n) => n.id);
      setSelectedId(newSelectedIds);
      setSelected(newSelecteds);
      return;
    }
    setSelectedId([]);
    setSelected([]);
  };

  const handleClick = (event, row) => {
    const selectedIndex = selected.indexOf(row.title);
    let newSelected = [];
    let newSelectedId = [];

    // console.log('row', row);

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.title);
      newSelectedId = newSelectedId.concat(selectedId, row.id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newSelectedId = newSelectedId.concat(selectedId.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newSelectedId = newSelectedId.concat(selectedId.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      newSelectedId = newSelectedId.concat(
        selectedId.slice(0, selectedIndex),
        selectedId.slice(selectedIndex + 1)
      );
    }
    setSelectedId(newSelectedId);
    setSelected(newSelected);
    setIdeaToEdit(row);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (title) => selected.indexOf(title) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          signedInUser={signedInUser}
          selectedId={selectedId}
          setSelected={setSelected}
          getData={getData}
          ideaToEdit={ideaToEdit}
          setIdeaToEdit={setIdeaToEdit}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.title);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role='checkbox'
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.title}
                      selected={isItemSelected}
                    >
                      <TableCell padding='checkbox'>
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.title}
                      </TableCell>
                      <TableCell align='left'>{row.location}</TableCell>
                      <TableCell align='left'>{row.description}</TableCell>
                      <TableCell align='left'>{row.cost}</TableCell>
                      <TableCell align='left'>{row.indoor_outdoor}</TableCell>
                      <TableCell align='left'>{row.category}</TableCell>
                      <TableCell align='left'>{row.weather}</TableCell>
                      <TableCell align='left'>{row.url}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

export default Dashboard;
