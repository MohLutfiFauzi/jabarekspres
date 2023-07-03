import { GraphQLClient } from "graphql-request";

const graphQLClient = new GraphQLClient('https://rakcer.id/gql');

export const request = async (query, variables = {}) => {
    const data = await graphQLClient.request(query, variables);
    return data;
};