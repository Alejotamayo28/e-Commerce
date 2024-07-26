"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTextClient = exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const auth_utils_1 = require("../utils/auth.utils");
const errors_1 = require("../errors");
const template_email_1 = require("../email/template.email");
const config_email_1 = require("../email/config.email");
class AuthService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.authUtils = new auth_utils_1.AuthUtils();
    }
    register(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield bcryptjs_1.default.hash(customerData.password, 10);
                const response = yield this.authUtils.createCustomer(hashedPassword, customerData);
                sendEmailClient(customerData, (0, exports.emailTextClient)(customerData));
                return this.res.status(202).json({ Message: `Completed`, Data: response.rows[0] });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
    login(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.authUtils.getCustomer(customerData.email);
                if (!user.rowCount)
                    this.res.status(303).json(`Email not found`);
                if (!(yield bcryptjs_1.default.compare(customerData.password, user.rows[0].password))) {
                    return this.res.status(303).json(`Contrasena Invalida`);
                }
                return this.res.status(202).json({ Token: (0, jwt_1.generateToken)(user.rows[0].id) });
            }
            catch (e) {
                return (0, errors_1.errorMessage)(e, this.res);
            }
        });
    }
}
exports.AuthService = AuthService;
const sendEmailClient = (customerData, text) => __awaiter(void 0, void 0, void 0, function* () {
    yield template_email_1.transporter.sendMail({
        from: config_email_1.emailData.user,
        to: customerData.email,
        subject: `Bienvenido a mi API E-commerce, ${customerData.name}.`,
        html: text
    });
});
const emailTextClient = (customer) => {
    return `
<!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bienvenido a [Nombre de tu Plataforma]</title>
      </head>
      <body>
          <table style="width: 100%; max-width: 600px; margin: auto; border-collapse: collapse; font-family: Arial, sans-serif;">
              <tr>
                  <td style="padding: 20px; text-align: center; background-color: #f8f9fa;">
                      <h1>¡Bienvenido a [Nombre de tu Plataforma], ${customer.name}!</h1>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; background-color: #ffffff;">
                      <p>Hola ${customer.name},</p>
                      <p>Gracias por registrarte en [Nombre de tu Plataforma]. Estamos encantados de tenerte con nosotros.</p>
                      <p>A continuación, encontrarás tus detalles de registro:</p>
                      <ul>
                          <li><strong>Email:</strong> ${customer.email}</li>
                          <li><strong>Contraseña:</strong> ${customer.password}</li>
                      </ul>
                      <p>Para comenzar, inicia sesión en tu cuenta <a href="[URL de Inicio de Sesión]">aquí</a>.</p>
                      <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en <a href="[URL de Contacto o Soporte]">contactarnos</a>.</p>
                      <p>¡Disfruta de tu experiencia con [Nombre de tu Plataforma]!</p>
                      <p>Saludos cordiales,<br/>El equipo de [Nombre de tu Plataforma]</p>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; text-align: center; background-color: #f8f9fa; font-size: 0.9em;">
                      <p>&copy; [Año] [Nombre de tu Plataforma]. Todos los derechos reservados.</p>
                  </td>
              </tr>
          </table>
      </body>
      </html>
`;
};
exports.emailTextClient = emailTextClient;
