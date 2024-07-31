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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const config_email_1 = require("../email/config.email");
const template_email_1 = require("../email/template.email");
class EmailService {
    sendEmail(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield template_email_1.transporter.sendMail({
                from: config_email_1.emailData.user,
                to: customerData.email,
                subject: `Bienvenido a mi API E-commerce, ${customerData.name}.`,
                html: this.welcomeTextEmail(customerData)
            });
        });
    }
    welcomeTextEmail(customer) {
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
                      <h1>¡Bienvenido a mi API E-commerce, ${customer.name}!</h1>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; background-color: #ffffff;">
                      <p>Hola ${customer.name},</p>
                      <p>Gracias por registrarte en API E-commerce. Estamos encantados de tenerte con nosotros.</p>
                      <p>A continuación, encontrarás tus detalles de registro:</p>
                      <ul>
                          <li><strong>Email:</strong> ${customer.email}</li>
                          <li><strong>Contraseña:</strong> ${customer.password}</li>
                      </ul>
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
    }
}
exports.EmailService = EmailService;
