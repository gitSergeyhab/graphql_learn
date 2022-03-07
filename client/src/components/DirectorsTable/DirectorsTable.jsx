import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import DirectorsSearch from '../DirectorsSearch/DirectorsSearch';
import DirectorsDialog from '../DirectorsDialog/DirectorsDialog';
import { directorsQuery } from './queries';
import withHocs from './DirectorsTableHoc';

// const directors = [
//   { id: 1, name: 'Quentin Tarantino', age: 55, movies: [ { name: 'Movie 1' }, { name: 'Movie 2' } ] },
//   { id: 2, name: 'Guy Ritchie', age: 50, movies: [ { name: 'Movie 1' }, { name: 'Movie 2' } ] }
// ];


const DirectorsTable = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDirector, setDirector] = useState({})
  const [name, setName] = useState('');

  const { data, loading, error, fetchMore } = useQuery(directorsQuery);

  if (loading) {
    return <div> Loading... </div>
  }

  if (error) {
    return <div>!!! ERROR !!!</div>
  }

  const { directors } = data;


  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () =>  setOpenDialog(false);

  const handleClick = ({ currentTarget }, currentDirector) => {
    setAnchorEl(currentTarget);
    setDirector(currentDirector);
  };

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    props.onOpen(currentDirector);
    handleClose();
  };

  const handleDelete = () => {
    handleDialogOpen();
    handleClose();
  };

  const handleChange = (evt) => setName(evt.target.value)

  const handleSearch = (evt) => {
    if(evt.charCode === 13) {
      fetchMore({
        variables: { name },
        updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
      });
    }
  };

    const { classes } = props;

    // const {directors = []} = data; 

    return (
      <>
        <Paper>
          <DirectorsSearch name={name} handleChange={handleChange} handleSearch={handleSearch} />
        </Paper>
        <br/>
        <DirectorsDialog open={openDialog} handleClose={handleDialogClose} id={currentDirector.id} />
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Age</TableCell>
                <TableCell>Movies</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {directors.map(director => {
                return (
                  <TableRow key={director.id}>
                    <TableCell component="th" scope="row">{director.name}</TableCell>
                    <TableCell align="right">{director.age}</TableCell>
                    <TableCell>
                      {director.movies.map((movie, key) => <div key={movie.name}>{`${key+1}. `}{movie.name}</div>)}
                    </TableCell>
                    <TableCell align="right">
                      <>
                        <IconButton color="inherit" onClick={(e) => handleClick(e, director)}>
                          <MoreIcon />
                        </IconButton>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                          <MenuItem onClick={() => handleEdit(director)}><CreateIcon /> Edit</MenuItem>
                          <MenuItem onClick={handleDelete}><DeleteIcon /> Delete</MenuItem>
                        </Menu>
                      </>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  
};

export default withHocs(DirectorsTable);
