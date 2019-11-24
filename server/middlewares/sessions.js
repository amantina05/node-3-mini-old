module.exports = function(req, res, next) {
  //inside check if req.session has a user property
  //if it doesnt, add a user property
  //that equals and object with a messages array on it
  //after the if statment call next
  //destructuring from req
  const { session, method } = req;
  if (!session.user) {
    session.user = {
      messages: [],
    };
  }
  next();
};
