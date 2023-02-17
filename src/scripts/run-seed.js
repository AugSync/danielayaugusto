/* eslint-disable no-console */
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../', `.env.local`),
});
const { buildClient } = require('@datocms/cma-client-node');
const _ = require('lodash');
const { data } = require('./seed-data');

const client = buildClient({ apiToken: process.env.NEXT_DATOCMS_API_TOKEN });

async function seed() {
  Promise.all(
    data.map(async ({ Nombres, Cantidad }) => {
      const record = await client.items.create({
        item_type: { type: 'item_type', id: '1425668' },
        name: Nombres,
        invitation:
          Cantidad > 1
            ? ', nos complace invitarlos a compartir con nosotros este momento especial en nuestras vidas, nuestra boda. Sin ustedes, no sería lo mismo.'
            : ', nos complace invitarte a compartir con nosotros este momento especial en nuestras vidas, nuestra boda. Sin ti, no sería lo mismo.',
        invitation_code: Math.floor(1000 + Math.random() * 9000),
        number_of_invites: Cantidad,
        invitation_url: _.kebabCase(Nombres),
        url_completa: `https://danielayaugusto.vercel.app/invitacion/${_.kebabCase(Nombres)}`,
      });

      console.log({ record });
    })
  ).then(() => {
    console.log('Todos los invitados fueron procesados');
  });
}

seed();
