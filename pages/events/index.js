import Layout from '@/components/Layout';
import EventItem from '@/components/EventItem';
import { API_URL } from '@/config/index';
// eslint-disable-next-line no-undef
const qs = require('qs');

export default function EventsPage({ events }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.lenght === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const query = qs.stringify(
    {
      populate: ['image'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();

  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
