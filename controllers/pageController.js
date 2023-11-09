const controller = {};

controller.home = (req, res) => {
  res.render('home');
}

controller.upload = (req, res) => {
  res.status(200).json({
    status: 'success', url: req.image
  });
}

module.exports = controller;