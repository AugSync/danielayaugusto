import { remark } from 'remark';
import html from 'remark-html';

import WeddingLanding from '@/layouts/WeddingLanding';
import WeddingSchedule from '@/layouts/WeddingSchedule';
import request from '@/lib/datocms';
import QUERIES from '@/lib/queries';
import type { TWeddingEvent, TWeddingLanding } from '@/types';

export async function getStaticProps() {
  const data: { allEvents: TWeddingEvent[]; landing: TWeddingLanding } = await request({
    query: QUERIES.GET_LANDING_PAGE,
    variables: { limit: 10 },
  });

  const events = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const { title, subtitle, description, order } of data.allEvents) {
    // eslint-disable-next-line no-await-in-loop
    const processedContent = await remark().use(html).process(description);
    const descriptionHtml = processedContent.toString();

    events.push({ title, subtitle, descriptionHtml, order });
  }

  const processedContent = await remark().use(html).process(data.landing.weddingName);
  const weddingNameHTML = processedContent.toString();

  return {
    props: { events, landing: { ...data.landing, weddingName: weddingNameHTML } },
  };
}

const Wedding = ({ events, landing }: { events: TWeddingEvent[]; landing: TWeddingLanding }) => {
  return (
    <article>
      <WeddingLanding landing={landing} />

      <WeddingSchedule events={events} />
    </article>
  );
};

export default Wedding;
