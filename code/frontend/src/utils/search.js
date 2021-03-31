import axios from 'axios';

/**
 * This module returns a function for performing live search queries from the database.
 * For example, this function can be used for searching for products based on product code.
 * On quick consecutive requests, the previous requests are cancelled to prevent unecessary
 * requests.
 * 
 * The code is adjusted from: https://www.digitalocean.com/community/tutorials/react-live-search-with-axios
 */
const makeRequestCreator = () => {
  let token;

  return async (query) => {
    // Check if we made a request
    if (token) {
      // Cancel the previous request before making a new request
      token.cancel();
    }
    // Create a new CancelToken
    token = axios.CancelToken.source()
    try {
      const response = await axios(query, { cancelToken: token.token })
      const result = response.data;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Cancel the request
        return;
      } else {
        // Handle usual errors
        console.log("There was an error performing a live search query");
      }
    }
  }
}

export const search = makeRequestCreator()