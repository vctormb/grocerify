const jwt = require('jsonwebtoken');

function isLoggedIn(ctx) {
  const Authorization = ctx.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET);

    return true;
  }

  return false;
}

module.exports = isLoggedIn;
