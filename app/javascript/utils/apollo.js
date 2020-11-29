// client
import { ApolloClient, InMemoryCache, gql, makeVar } from '@apollo/client';
// links
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';

export const createCache = () => {
  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }
          }
        }
      }
    }
  });
  if (process.env.NODE_ENV === 'development') {
    window.secretVariableToStoreCache = cache;
  }
  return cache;
};

// getToken from meta tags
const getToken = () =>
  document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const token = getToken();
const setTokenForOperation = async operation => {
  // get the auth token from local storage if it exists
  const authToken = localStorage.getItem('authToken');;
  const refreshToken = localStorage.getItem('refreshToken');;

  return operation.setContext({
    headers: {
      'X-CSRF-Token': token,
      ...(authToken && {authorization: authToken}),
      ...(refreshToken && {'RefreshToken': refreshToken}),
    },
  });
};

// link with token
const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(setTokenForOperation)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

const receiveLinkWithTokens = () =>
  new ApolloLink(
    (operation, forward) => {
      return forward(operation).map(response => {
        const context = operation.getContext()
        const {
          response: { headers }
        } = context

        if (headers) {
          const authToken = headers.get('Authorization')
          const refreshToken = headers.get('RefreshToken')
          if (authToken) {
            localStorage.setItem('authToken', authToken)
          }
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken)
          }
        }

        return response
      })
    });

// log erors
const logError = (error) => console.error(error);
// create error link

const createErrorLink = () => onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    logError('GraphQL - Error', {
      errors: graphQLErrors,
      operationName: operation.operationName,
      variables: operation.variables,
    });
  }
  if (networkError) {
    logError('GraphQL - NetworkError', networkError);
  }
});

// http link
const createHttpLink = () => new HttpLink({
  uri: '/graphql',
  credentials: 'include',
});

// client var
const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

// Initializes to true if localStorage includes a 'authToken' key,
// false otherwise
export const isLoggedInVar = makeVar(!!localStorage.getItem("authToken"));

export const createClient = (cache, requestLink) => {
  return new ApolloClient({
    link: ApolloLink.from([
      createErrorLink(),
      createLinkWithToken(),
      receiveLinkWithTokens(),
      createHttpLink(),
    ]),
    cache: cache,
    typeDefs
  });
};
