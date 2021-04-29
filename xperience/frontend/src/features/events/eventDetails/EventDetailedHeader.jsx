import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Segment, Header, Image, Item, Button} from 'semantic-ui-react';

const eventImageStyle = {
    filter: 'brightness(30%)'
};

const eventImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

export default function EventDetailedHeader({event, isHost, isGoing}) {

    const [load, setLoad] = useState(false);

    async function joinEvent() {
        setLoad(true);
        try {
            //await addAttendee(event);
            setLoad(false);
        }
        catch(error) {
            toast.error(error.message);
            setLoad(false);
        }
    }

    async function cancelEvent() {
        setLoad(true);
        try {
            //await cancelAttendee(event);
            setLoad(false);
        }
        catch(error) {
            toast.error(error.message);
            setLoad(false);
        }
    }

    return(
        <Segment.Group>
            <Segment basic attached="top" style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${event.category}.jpg`} fluid style={eventImageStyle} />

                <Segment style={eventImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={event.title}
                                    style={{color: 'white'}}
                                />
                                <p>{event.date}</p>
                                <p>
                                    Hosted by <strong> {event.hostedBy} </strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>

            <Segment attached="bottom" clearing>
                { !isHost && (
                <>
                { isGoing ? (<Button onClick={cancelEvent} loading={load}>Cancel My Place</Button>) : 
                    (<Button onClick={joinEvent} loading={load} color="teal">JOIN THIS EVENT</Button>) }
                </>)}

                { isHost && (<Button as={Link} to={`/manage/${event.id}`} color="orange" floated="right"> Manage Event </Button>) }

            </Segment>
        </Segment.Group>
    );
}