import WeddingLanding from '@/layouts/WeddingLanding';
import request from '@/lib/datocms';
import QUERIES from '@/lib/queries';
import type { TWeddingEvent, TWeddingLanding } from '@/types';

export async function getStaticProps() {
  const data: { landing: TWeddingLanding } = await request({
    query: `${QUERIES.GET_LANDING} ${QUERIES.GET_EVENTS}`,
  });

  return {
    props: { landing: { ...data.landing } },
    revalidate: 10,
  };
}

const Wedding = ({ landing }: { events: TWeddingEvent[]; landing: TWeddingLanding }) => {
  return (
    <article>
      <WeddingLanding landing={landing} />
    </article>
  );
};

export default Wedding;
