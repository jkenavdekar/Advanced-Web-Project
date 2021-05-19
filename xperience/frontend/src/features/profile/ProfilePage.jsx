import React, { useState } from 'react';
import { Segment, Grid, Item, Header, Loader, Button, Statistic, Reveal, Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { listenToCurrentUserProfile } from './profileActions';
import { Link } from 'react-router-dom';

export default function ProfilePage({match}) {

    //const { currentUserProfile } = useSelector((state) => state.profile);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { loading, error } = useSelector((state) => state.async);

    const photo = localStorage.getItem("userPhoto");

    //if ((loading && !currentUserProfile) || (!currentUserProfile && !error)) return <Loader content='Loading profile...' />;

    return(
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                <Item.Group>
                    <Item>
                    <Item.Image
                        avatar
                        size='small'
                        src={ user?.result?.photoURL || photo || '/assets/user.png' }
                    />
                    <Item.Content verticalAlign='middle'>
                        <Header
                        as='h1'
                        style={{ display: 'block', marginBottom: 10 }}
                        content={user.result?.displayName}
                        />
                    </Item.Content>
                    </Item>
                </Item.Group>
                    <Button as={Link} to={`/profile/photo/${user.result._id}`} content='Upload Photo' 
                        basic color='red' icon='user' />
                </Grid.Column>

                <Grid.Column width={4}>

                    <Divider hidden />
                    <Statistic.Group>
                        <Statistic label='Followers' value={10} />
                        <Statistic label='Following' value={5} />
                    </Statistic.Group>

                    <Divider />

                    <Reveal animated='move'>

                        <Reveal.Content visible style={{ width: '100%' }}>
                            <Button fluid color='teal' content='Following' />
                        </Reveal.Content>

                        <Reveal.Content hidden style={{ width: '100%' }}>
                            <Button fluid color='red' content='Unfollow' />
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>

            </Grid>
        </Segment>
    )
}