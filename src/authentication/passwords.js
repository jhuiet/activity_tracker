var bcrypt = require('bcryptjs');

export class Authenticator {
  static hashPass(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static comparePass(password) {
    return bcrypt.compareSync(pass1, password);
  }
}
