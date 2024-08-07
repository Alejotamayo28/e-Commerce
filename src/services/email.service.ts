import { emailData } from "../email/config.email";
import { transporter } from "../email/template.email";
import { Customer } from "../models/customer";

export class EmailService {
  public async sendEmail(customerData: Customer) {
    await transporter.sendMail({
      from: emailData.user,
      to: customerData.email,
      subject: `Bienvenido a mi API E-commerce, ${customerData.name}.`,
      html: this.welcomeTextEmail(customerData)
    })
  }
  public welcomeTextEmail(customer: Customer): string {
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
`
  }
}
