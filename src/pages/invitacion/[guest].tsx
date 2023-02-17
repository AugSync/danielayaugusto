import { useState } from 'react';

import WeddingLanding from '@/layouts/WeddingLanding';
import WeddingSchedule from '@/layouts/WeddingSchedule';
import request from '@/lib/datocms';
import QUERIES from '@/lib/queries';
import type { TWeddingEvent, TWeddingGuest, TWeddingLanding } from '@/types';

export async function getStaticPaths() {
  const data: { allGuests: TWeddingGuest[] } = await request({
    query: `${QUERIES.GET_GUESTS}`,
    variables: { limit: 10 },
  });

  const paths = data.allGuests.map(({ invitationUrl }) => ({
    params: { guest: invitationUrl },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: { params: { guest: string } }) {
  const data: { allEvents: TWeddingEvent[]; landing: TWeddingLanding; guest: TWeddingGuest } =
    await request({
      query: `${QUERIES.GET_LANDING} ${QUERIES.GET_EVENTS} ${QUERIES.GET_GUEST(params.guest)}`,
      variables: { limit: 10 },
    });

  return {
    props: { events: data.allEvents, landing: data.landing, guest: data.guest },
    revalidate: 10,
  };
}

const Wedding = ({
  events,
  landing,
  guest,
}: {
  events: TWeddingEvent[];
  landing: TWeddingLanding;
  guest: TWeddingGuest;
}) => {
  const [isOpenedSchedule, setIsOpenedSchedule] = useState(false);

  return (
    <article>
      <WeddingLanding landing={landing} guest={guest} setIsOpenedSchedule={setIsOpenedSchedule} />

      <WeddingSchedule events={events} guest={guest} isOpenedSchedule={isOpenedSchedule} />
    </article>
  );
};

export default Wedding;
