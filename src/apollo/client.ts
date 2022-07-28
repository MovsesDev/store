import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://api-eu-central-1.hygraph.com/v2/cl5t9fjz621m701tbf5311f3z/master',
    cache: new InMemoryCache()
})

export default client