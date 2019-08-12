module.exports = {
  ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/');
  },
  forwardAutheticated(req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/user');
  }
};
