import React from 'react';
import { Button, Container, Header, Icon, Image, Segment } from 'semantic-ui-react';

export default function HomePage({history}) {

    window.location = 'http://localhost:3000/events'

    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container>

                <div>
                    <Image src="/assets/evento.jpg" style={{marginLeft: 190}} />
                </div>

                <Header as='h1' inverted>
                    <Image size="massive" src="/assets/logo.png" style={{marginBottom: 12}} />
                    Xperince
                </Header>

                <Button onClick={() => history.push('/events')} size='huge' inverted>
                    Get Started
                    <Icon name='right arrow' inverted />
                </Button>
            </Container>
        </Segment>
    )
}

