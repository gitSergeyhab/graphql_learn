import {gql} from '@apollo/client'

export const addMovieMutation = gql`
mutation addMovie ($name: String!, $genre: String!, $rate: Int, $watched: Boolean!, $directorId: ID) {
    addMovie(name: $name, genre: $genre, rate: $rate, watched: $watched, directorId: $directorId) {
        name
    }
}
`;


export const updateMovieMutation = gql`
    mutation updateMovie($id: ID, $name: String!, $genre: String!, $rate: Int, $watched: Boolean!, $directorId: ID) {
        updateMovie(id: $id, name: $name, genre: $genre, rate: $rate, watched: $watched, directorId: $directorId) {
            name
            id
        }
    }
    `;