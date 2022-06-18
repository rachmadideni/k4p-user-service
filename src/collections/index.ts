import { Collection, Header } from 'postman-collection';
import { signupRequest, signinRequest } from './auth.request';

// API endpoint
export const baseUrl = 'http://localhost:3001/api/';

const rawHeaderString = 'Authorization:\nContent-Type:application/json\ncache-control:no-cache\n';

// Parsing string to postman compatible format
const rawHeaders = Header.parse(rawHeaderString);

// Generate headers
export const requestHeader = rawHeaders.map((h) => new Header(h));

const userServicesCollection = new Collection({
  info: {
    name: 'user services collection',
  },
  variable: [],
  item: [signupRequest, signinRequest],
});

// TODO
// userServicesCollection.variables.add({
//     id: 'apiBaseUrl',
//     value: baseUrl,
//     type: 'string'
// });

userServicesCollection.items.add(signupRequest);
