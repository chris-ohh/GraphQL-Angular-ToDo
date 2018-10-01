/**
 * Server Mutation Query
 */

'use strict';

import gql from 'graphql-tag';

export const Tasks = gql`
  query {
    Tasks{
      id
      name
    }
  }`;

export const Groups = gql`
  query {
    Groups{
      id
      name
    }
  }`;

export const addGroup = gql`
  mutation addGroup($name: String!) {
    addGroup(name: $name) {
      id
      name
    }
  }`;

export const addTask = gql`
  mutation addTask($name: String!) {
    addTask(name: $name) {
      id
      name
    }
  }`;

export const removeGroup = gql`
  mutation removeGroup($id: String!) {
    removeGroup(id: $id) {
      id
      name
    }
  }`;

export const updateTask = gql`
  mutation updateTask($id: String!, $name: String!) {
    updateTask(id: $id, name: $name) {
      tasks{
        id
        name
      }
    }
  }`;

export const updateGroup = gql`
  mutation updateGroup($id: String!, $name: String!) {
    updateGroup(id: $id, name: $name) {
      id
      name
    }
  }`;
