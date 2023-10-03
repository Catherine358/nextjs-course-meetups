import MeetupDetail from "../../components/meetups/MeetupDetail";
import {MongoClient, ObjectId} from "mongodb";
import {Fragment} from "react";
import Head from "next/head";

const MeetupDetails = ({ meetup }) => {
    return (
        <Fragment>
            <Head>
                <title>{meetup.title}</title>
                <meta title="description" content={meetup.description} />
            </Head>
            <MeetupDetail image={meetup.image} title={meetup.title} description={meetup.description} address={meetup.address} />
        </Fragment>
    );
};

export const getStaticPaths = async () => {
    const client = await MongoClient.connect('mongodb+srv://katrin_01:1ez6miGswGWedQr2@cluster0.erkrrtc.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
      paths: meetups.map((m) => ({ params: { meetupId: m._id.toString() } })),
        // true if don't want pregenerate all pages
        // there can be more pages
        fallback: 'blocking'
    };
};

export const getStaticProps = async (context) => {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://katrin_01:1ez6miGswGWedQr2@cluster0.erkrrtc.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
    client.close();

    return {
      props: {
          meetup: { id: selectedMeetup._id.toString(), ...selectedMeetup }
      }
    };
};

export default MeetupDetails;
