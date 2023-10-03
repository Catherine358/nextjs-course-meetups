import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import {useRouter} from "next/router";
import {Fragment} from "react";
import Head from "next/head";

const NewMeetupPage = () => {
    const router = useRouter();

    const addMeetupHandler = async (data) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const res = await response.json();
        router.push('/');
    };

    return (
        <Fragment>
            <Head>
                <title>Add a New Meetup</title>
                <meta title="description" content="Adding meetups" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    );
};

export default NewMeetupPage;
