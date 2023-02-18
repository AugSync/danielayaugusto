import { buildClient } from '@datocms/cma-client-node';
import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (!req.body.invitationCode || !req.body.id) res.status(405).json({ message: 'Invalid code' });
    else {
      const headers = {
        authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      };

      const client = new GraphQLClient('https://graphql.datocms.com', { headers });
      const { guest } = await client.request(
        `query MyQuery {
          guest(filter: {id: {eq: "${req.body.id}"}, invitationCode: {eq: "${req.body.invitationCode}"}}) {
            id
          }
        }`
      );

      if (guest) {
        const httpClient = buildClient({ apiToken: `${process.env.NEXT_DATOCMS_API_TOKEN}` });
        const itemId = req.body.id;
        const item = await httpClient.items.update(itemId, {
          // we just pass the field that we want to change
          attending: true,
        });
        // Process a POST request
        res.status(200).json({ item });
      } else {
        res
          .status(400)
          .json({ message: 'Couldt update guest, invalid code or youre using a stole code' });
      }
    }
  }
}
