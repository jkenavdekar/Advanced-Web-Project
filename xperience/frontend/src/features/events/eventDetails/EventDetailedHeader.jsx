import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Segment, Header, Image, Item, Button} from 'semantic-ui-react';
import { addAttendee, cancelAttendee } from '../eventActions';

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

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    async function joinEvent() {
        setLoad(true);
        try {
            const aj = Array.from([]);
            aj.push(user.result.displayName);
            dispatch(addAttendee(event._id, aj));
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
            const bj = Array.from([]);
            bj.push(user.result.displayName);
            dispatch(cancelAttendee(event._id, bj));
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

                { event.isCancelled && (<Button color='red' content='Event Cancelled'/>)}

                { !isHost && !event.isCancelled && (
                <>
                { isGoing ? (<Button onClick={cancelEvent} loading={load}>Cancel My Place</Button>) : 
                    (<Button onClick={joinEvent} loading={load} color="teal">JOIN THIS EVENT</Button>) }
                </>)}

                { isHost && (<Button as={Link} to={`/manage/${event._id}`} color="orange" floated="right"> Manage Event </Button>)}

            </Segment>
        </Segment.Group>
    );
}