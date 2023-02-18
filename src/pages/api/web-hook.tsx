/* eslint-disable no-console */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const auth = {
    login: process.env.HOOK_LOGIN,
    password: process.env.HOOK_PASSWORD,
  }; // change this

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');

  // Verify login and password are set and correct
  if (login && password && login === auth.login && password === auth.password) {
    // Access granted...
    if (!req.body?.previous_entity.attributes.attending && req.body?.entity.attributes.attending) {
      await fetch(
        'https://api.telegram.org/bot6012018939:AAEOB6Jm4GroUgZ-f6to6lz4vSuiSoJoYwM/sendMessage',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: process.env.CHAT_DANIELA,
            text: `<b>${req.body.entity.attributes.name}</b> ha confirmado la invitación
          
<b>Numero de invitados:</b> ${req.body.entity.attributes.number_of_invites}
<b>Discurso biblico:</b> ${req.body.entity.attributes.speech ? 'Sí asistirá' : 'No asistirá'}
<b>Sesion de fotos:</b> ${req.body.entity.attributes.photos ? 'Sí asistirá' : 'No asistirá'}
<b>Compartir:</b> ${req.body.entity.attributes.share ? 'Sí asistirá' : 'No asistirá'}`,
            parse_mode: 'HTML',
          }),
        }
      );
      const rawResponse = await fetch(
        'https://api.telegram.org/bot6012018939:AAEOB6Jm4GroUgZ-f6to6lz4vSuiSoJoYwM/sendMessage',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: process.env.CHAT_AUGUSTO,
            text: `<b>${req.body.entity.attributes.name}</b> ha confirmado la invitación
          
<b>Numero de invitados:</b> ${req.body.entity.attributes.number_of_invites}
<b>Discurso biblico:</b> ${req.body.entity.attributes.speech ? 'Sí asistirá' : 'No asistirá'}
<b>Sesion de fotos:</b> ${req.body.entity.attributes.photos ? 'Sí asistirá' : 'No asistirá'}
<b>Compartir:</b> ${req.body.entity.attributes.share ? 'Sí asistirá' : 'No asistirá'}`,
            parse_mode: 'HTML',
          }),
        }
      );
      const content = await rawResponse.json();

      res.status(200).json({ body: content });
    } else res.status(200).json({ body: req.body });
  } else res.status(400).json({ message: 'Get out of here' });
}
