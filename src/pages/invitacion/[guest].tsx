import { useEffect, useState } from 'react';
import useSWR from 'swr';

import WeddingLanding from '@/layouts/WeddingLanding';
import WeddingSchedule from '@/layouts/WeddingSchedule';
import request from '@/lib/datocms';
import QUERIES from '@/lib/queries';
import type { TWeddingEvent, TWeddingGuest, TWeddingLanding } from '@/types';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export async function getStaticPaths() {
  const data: { allGuests: TWeddingGuest[] } = await request({
    query: `${QUERIES.GET_GUESTS}`,
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
    });

  return {
    props: { events: data.allEvents, landing: data.landing, guest: data.guest },
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
  const [guestData, setGuestData] = useState(guest);
  const { data: guestRealtimeData } = useSWR(`/api/get-guest/${guest?.id}`, fetcher);

  useEffect(() => {
    setGuestData(guestRealtimeData?.guest);
  }, [guestRealtimeData?.guest]);

  const [isOpenedSchedule, setIsOpenedSchedule] = useState(false);

  return (
    <article>
      <WeddingLanding
        landing={landing}
        guest={guestData ?? guest}
        setIsOpenedSchedule={setIsOpenedSchedule}
      />

      <WeddingSchedule
        events={events}
        guest={guestData ?? guest}
        isOpenedSchedule={isOpenedSchedule}
      />
    </article>
  );
};

export default Wedding;
