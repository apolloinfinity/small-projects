// exports.login = async (req, res) => {
//   res.render('login', {
//     pageTitle: 'Login '
//   });
// };
exports.loginPage = async (req, res) => {
  try {
    res.render('login', {
      pageTitle: 'Login'
    });
  } catch (err) {
    console.error(err);
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  res.redirect('/user');
};

exports.registrationPage = async (req, res) => {
  res.render('register', {
    pageTitle: 'Registration'
  });
};
