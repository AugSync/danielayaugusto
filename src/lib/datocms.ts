import { GraphQLClient } from 'graphql-request';

function request({
  query,
  variables,
  includeDrafts,
  excludeInvalid,
}: {
  query: string;
  variables: { [key: number | string]: number | string };
  includeDrafts?: unknown;
  excludeInvalid?: unknown;
}) {
  const headers = {
    authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
  } as { authorization: string; 'X-Include-Drafts': string; 'X-Exclude-Invalid': string };

  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }
  const client = new GraphQLClient('https://graphql.datocms.com', { headers });
  return client.request(query, variables);
}

export default request;
