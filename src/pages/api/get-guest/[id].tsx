import { GraphQLClient } from 'graphql-request';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!req.query.id) res.status(405).json({ message: 'Invalid code' });
    else {
      const headers = {
        authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
      };

      const client = new GraphQLClient('https://graphql.datocms.com', { headers });
      const { guest } = await client.request(
        `query MyQuery {
          guest(filter: {id: {eq: "${req.query.id}"}}) {
            name
            numberOfInvites
            share
            photos
            speech
            moon
            invitation
            invitationUrl
            attending
            id
          }
        }`
      );

      res.status(200).json({ guest });
    }
  }
}
