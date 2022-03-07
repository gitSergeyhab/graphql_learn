import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { directorQuery } from './queries';

import { styles } from './styles';

const withGraphQL = graphql(directorQuery, {
    options: ({ name = '' }) => ({
      variables: { name },
    }),
  });
  
  export default compose(withStyles(styles), withGraphQL);
