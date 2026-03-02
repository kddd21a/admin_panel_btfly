const service = require('./auth.service');

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    const user = await service.register(email, password);
    res.status(201).json(user);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const result = await service.login(email, password);
    res.json(result);
  }
}

module.exports = new AuthController();