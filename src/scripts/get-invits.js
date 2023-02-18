/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../', `.env.local`),
});
const fs = require('fs');
const { buildClient } = require('@datocms/cma-client-node');
const _ = require('lodash');

const client = buildClient({ apiToken: process.env.NEXT_DATOCMS_API_TOKEN });

async function run() {
  fs.unlinkSync(path.resolve(__dirname, '../../', `invits.txt`));

  // this iterates over every page of results:
  for await (const {
    name,
    number_of_invites,
    invitation_code,
    url_completa,
  } of client.items.listPagedIterator()) {
    if (name) {
      console.log({ name, number_of_invites, invitation_code, url_completa });

      fs.appendFileSync(
        path.resolve(__dirname, '../../', `invits.txt`),
        `
    
${_.trim(name)}, ${
          number_of_invites > 1
            ? 'queremos que estén en nuestra boda'
            : 'queremos que estés en nuestra boda'
        }. 

${url_completa?.replace('danielayaugusto.vercel.app', 'augustoydaniela.com')}

Por favor, entre en la URL, presione el botón "Confirme asistencia"
 y confirme su invitación utilizando el siguiente código: ${invitation_code}
    `
      );
    }
  }
}

run();
