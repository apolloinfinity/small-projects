exports.dashboard = async (req, res) => {
  res.render('index', {
    pageTitle: 'Dashboard'
  });
};

exports.logout = async (req, res) => {
  req.logout();
  res.redirect('/');
};
