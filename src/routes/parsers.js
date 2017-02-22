function getParam (route, param) {
  return route.split(`${param}=`)[1];
}

function getHash (route) {
  return route.split('?')[0];
}

export { getParam, getHash };
