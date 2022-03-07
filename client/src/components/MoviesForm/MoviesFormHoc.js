import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
// import { graphql } from 'react-apollo'

// import { addMovieMutation, updateMovieMutation } from './mutation';

import { styles } from './styles';
// import { moviesQuery } from '../MoviesTable/queries';
// import { directorsQuery } from './queries';

// const withGraphqlAdd = graphql(addMovieMutation, {
//     props: ({ mutate }) => ({
//         addMovie: (movie) => mutate({
//             variables: movie,
//             refetchQueries: [{
//                 query: moviesQuery,
//                 variables: { name: '' },
//               }],
//         })
//     })
// });

// const withGraphqlUpdate = graphql(updateMovieMutation, {
//     props: ({ mutate }) => ({
//         updateMovie: (movie) => mutate({
//             variables: movie,
//             refetchQueries: [{
//                 query: moviesQuery,
//                 variables: { name: '' },
//               }],
//         })
//     })
// });

// const withGraphqlQuery = graphql(directorsQuery, {
//     options: ({ name = '' }) => ({
//         variables: { name },
//       }),
// });

export default compose(withStyles(styles));
