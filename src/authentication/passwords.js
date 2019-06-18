var bcrypt = require('bcryptjs');



export class Authenticator {

  static hashPass(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  static comparePass(testingPass, hashedPassword) {
    return bcrypt.compareSync(testingPass, hashedPassword);
  }
}
