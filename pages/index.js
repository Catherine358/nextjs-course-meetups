import MeetupList from "../components/meetups/MeetupList";
import {MongoClient} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";

const HomePage = ({ meetups }) => {
    // useEffect doesn't work wth nextjs, data will be empty -> getStaticProps
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="List of meetups" />
            </Head>
            <MeetupList meetups={meetups} />
        </Fragment>
    );
};

// running on the server during deployment
// wait to page regenerated on every request
// if data changes frequently
// export const getServerSideProps = (context) => {
//     const req = context.req;
//     const res = context.res;
//
//     return {
//       props: {
//           meetups: []
//       }
//     };
// };

// executes during pre-rendering process
export const getStaticProps = async () => {
    const client = await MongoClient.connect('mongodb+srv://katrin_01:1ez6miGswGWedQr2@cluster0.erkrrtc.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
      props: {
          meetups: meetups.map((m) => ({ ...m, id: m._id.toString() }))
      },
        // incrementing static generation
        revalidate: 3600
    };
};

export default HomePage;
