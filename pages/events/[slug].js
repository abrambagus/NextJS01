import Layout from '@/components/Layout';
// import EventMap from '@/components/EventMap';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import Link from 'next/link';
import Image from 'next/image';
// eslint-disable-next-line no-undef
const qs = require('qs');
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EventPage({ evt }) {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString('en-US')} at{' '}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        <ToastContainer />
        {evt.attributes.image.data ? (
          <div className={styles.image}>
            <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        ) : null}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

        {/* <EventMap evt={evt} /> */}

        <Link href="/events">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();
//   const paths = events.data.map((evt) => ({
//     params: { slug: evt.id.toString() },
//   }));

//   return {
//     paths,
//     fallback: true,
//   };
// }

// export async function getStaticProps({ params: { slug } }) {
//   const query = qs.stringify(
//     {
//       populate: ['image'],
//     },
//     {
//       encodeValuesOnly: true,
//     }
//   );

//   const res = await fetch(`${API_URL}/api/events/${slug}?${query}`);
//   const event = await res.json();

//   return {
//     props: {
//       evt: event.data,
//     },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps({ query: { slug } }) {
  const query = qs.stringify(
    {
      populate: ['image'],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${API_URL}/api/events/${slug}?${query}`);
  const events = await res.json();

  return {
    props: {
      evt: events.data,
    },
  };
}
