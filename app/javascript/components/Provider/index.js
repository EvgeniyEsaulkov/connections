import React from 'react';
import PropTypes from 'prop-types';
import { ApolloProvider, gql, useQuery } from '@apollo/client';
import { createCache, createClient } from '../../utils/apollo';
import Login from '../../forms/login'
import App from "../App";

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ? <App /> : <Login />;
};

const Provider = ({ children }) => (
  <ApolloProvider client={createClient(createCache())}>
    <IsLoggedIn />
  </ApolloProvider>
);

Provider.propTypes = {
  children: PropTypes.node
}

export default Provider;
