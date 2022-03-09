import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import MoviesDialog from '../MoviesDialog/MoviesDialog';
import MoviesSearch from '../MoviesSearch/MoviesSearch'

import withHocs from './MoviesTableHoc';
import { moviesQuery } from './queries';
import { useQuery, NetworkStatus  } from '@apollo/client';


// const movies = [
//   { id: 1, name: 'Pulp Fiction', genre: 'Crime', rate: 10, director: { name: 'Quentin Tarantino' }, watched: true },
//   { id: 2, name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-comedy', rate: 9, director: { name: 'Guy Ritchie' }, watched: false },
// ];

// class MoviesTable extends React.Component {
//   state = {
//     anchorEl: null,
//     openDialog: false,
//     name: '',
//   };

//   handleDialogOpen = () => { this.setState({ openDialog: true }); };
//   handleDialogClose = () => { this.setState({ openDialog: false }); };

//   handleClick = ({ currentTarget }, data) => {
//     this.setState({
//       anchorEl: currentTarget,
//       data,
//     });
//   };

//   handleClose = () => { this.setState({ anchorEl: null }); };

//   handleEdit = () => {
//     this.props.onOpen(this.state.data);
//     this.handleClose();
//   };

//   handleDelete = () => {
//     this.handleDialogOpen();
//     this.handleClose();
//   };

//   handleChange = name => (event) => {
//     this.setState({ [name]: event.target.value });
//   };

//   handleSearch = (e) => {
//     const { data } = this.props;
//     const { name } = this.state;

//     if(e.charCode === 13) {
//       data.fetchMore({
//         variables: { name },
//         updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
//       });
//     }
//   };

//   render() {
//     const { anchorEl, openDialog, data: activeElem = {}, name } = this.state;

//     const { classes, data = {}} = this.props;

//     console.log(this.props.data);

//     // const { movies = [] } = data;

//     return (
//       <>
//         <Paper>
//           <MoviesSearch name={name} handleChange={this.handleChange} handleSearch={this.handleSearch} />
//         </Paper>
//         <br/>
//         <MoviesDialog open={openDialog} handleClose={this.handleDialogClose} id={activeElem.id} />
//         <Paper className={classes.root}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Genre</TableCell>
//                 <TableCell align="right">Rate</TableCell>
//                 <TableCell>Director</TableCell>
//                 <TableCell>Watched</TableCell>
//                 <TableCell align="right"></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {movies.map(movie => {
//                 return (
//                   <TableRow key={movie.id}>
//                     <TableCell component="th" scope="row">{movie.name}</TableCell>
//                     <TableCell>{movie.genre}</TableCell>
//                     <TableCell align="right">{movie.rate}</TableCell>
//                     <TableCell>{movie.director.name}</TableCell>
//                     <TableCell>
//                       <Checkbox checked={movie.watched} disabled />
//                     </TableCell>
//                     <TableCell align="right">
//                       <>
//                         <IconButton color="inherit" onClick={(e) => this.handleClick(e, movie)}>
//                           <MoreIcon />
//                         </IconButton>
//                         <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
//                           <MenuItem onClick={this.handleEdit}><CreateIcon /> Edit</MenuItem>
//                           <MenuItem onClick={this.handleDelete}><DeleteIcon/> Delete</MenuItem>
//                         </Menu>
//                       </>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </Paper>
//       </>
//     );
//   }
// };

// export default withHocs(MoviesTable);

const MoviesTable = (props) => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)
  const [data1, setData1] = useState({});
  const [name, setName] = useState('');

  // const {data, loading, error, fetchMore} = useQuery(moviesQuery);

  const {data, loading, error, refetch, networkStatus } = useQuery(moviesQuery);

  console.log(networkStatus, NetworkStatus  )



  if (loading) {
    return <div> Loading... </div>
  }

  if (error) {
    console.log(error)
    return <div>!!! ERROR !!!</div>
  }

  const { movies } = data;


  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleClick = ({ currentTarget }, data) => {
    setAnchorEl(currentTarget);
    setData1(data)
  };

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    props.onOpen(data1);
    handleClose();
  };

  const handleDelete = () => {
    handleDialogOpen();
    handleClose();
  };

  const handleChange = (evt) => setName(evt.target.value);
  

  // const handleSearch = (evt) => {
  //   if(evt.charCode === 13) {
  //     fetchMore({
  //       variables: { name },
  //       updateQuery: (previousResult, { fetchMoreResult }) => fetchMoreResult,
  //     });
  //   }
  // };



  const handleSearch = (evt) => {
    if(evt.charCode === 13) {
      console.log('sskjdkj')
      refetch( {name} )
    }
  };
  
  const { classes } = props;


    return (
      <>
        <Paper>
          <MoviesSearch name={name} handleChange={handleChange} handleSearch={handleSearch} />
        </Paper>
        <br/>
        <MoviesDialog open={openDialog} handleClose={handleDialogClose} id={data1.id} />
        <Paper className={classes.root}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell align="right">Rate</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Watched</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map(movie => {
                return (
                  <TableRow key={movie.id}>
                    <TableCell component="th" scope="row">{movie.name}</TableCell>
                    <TableCell>{movie.genre}</TableCell>
                    <TableCell align="right">{movie.rate || ''}</TableCell>
                    <TableCell>{ movie.director ? movie.director.name : ''}</TableCell>
                    <TableCell>
                      <Checkbox checked={movie.watched} disabled />
                    </TableCell>
                    <TableCell align="right">
                      <>
                        <IconButton color="inherit" onClick={(e) => handleClick(e, movie)}>
                          <MoreIcon />
                        </IconButton>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} >
                          <MenuItem onClick={handleEdit}><CreateIcon /> Edit</MenuItem>
                          <MenuItem onClick={handleDelete}><DeleteIcon/> Delete</MenuItem>
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

export default withHocs(MoviesTable);
