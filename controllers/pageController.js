const controller = {};

controller.home = (req, res) => {
  res.render('home');
}

controller.pdflive = (req, res) => {
  res.render('pdflive');
}

controller.upload = (req, res) => {
  res.status(200).json({
    status: 'success', url: req.image
  });
}

module.exports = controller;