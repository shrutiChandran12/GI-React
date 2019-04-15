
/**
 * Function to Fetch specific data from Cookie store
 * @param {*} cname 
 */
export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/**
 * Function to get relevent state of the reducer
 * @param {*} state 
 * @param {*} reducerName 
 */
export function getReleventReduxState(state, reducerName) {
  let extractedState;
  state._root.entries.map(result => {
    if (result[0] === reducerName) {
      extractedState = result[1];
    }
  }
  )
  return extractedState;
}


/**
 * Function to get relevent value of the Sorting
 * @param {*} value 
  0 - Recommended
  3 - Low to High
  4 - High to Low
  5 - New Arrival
 */
export function fetchReleventSortingValue(value) {
console.log('ttttt',value)
  if (value === 'Price Low to High') {
    return 3;
  }
  else if (value === 'Price High to Low') {
    return 4;
  }
  else if (value === 'New Arrival') {
    return 5;
  }
  else { // Recommended
    return 0;
  }
}
