import React from 'react';
import {Segment, Header, Comment } from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';
import { format } from 'date-fns';

export default function EventDetailedChat({event}) {

    //format(comment?.date, new Date())
    //console.log(format(new Date(event.date), 'MMMM d, yyyy h:mm a'));
    
    return(
        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{border: 'none'}}
            >
                <Header>Chat about this event</Header>
            </Segment>

            <Segment attached>
                <Comment.Group>
                    {event.comments.map(comment => (
                        <Comment key={comment?._id} >
                            <Comment.Avatar src="/assets/user.png"/>
                            <Comment.Content>
                                <Comment.Author as="a">{comment?.displayName}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{comment?.date}</div>
                                </Comment.Metadata>
                                <Comment.Text>{comment?.description}</Comment.Text>
                                <Comment.Actions>
                                    <Comment.Action>Reply</Comment.Action>
                                </Comment.Actions>
                            </Comment.Content>
                        </Comment>
                    ))}
                </Comment.Group>

                <EventDetailedChatForm eventId={event._id} />
            </Segment>
        </>
    )
}