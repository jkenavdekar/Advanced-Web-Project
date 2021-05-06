import React from 'react';
import { Segment, Grid, Item, Header } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { listenToCurrentUserProfile } from './profileActions';

export default function ProfilePage({match}) {

    const dispatch = useDispatch();
    const { currentUserProfile } = useSelector((state) => state.profile);
    //const { currentUser } = useSelector((state) => state.auth);
    const { loading, error } = useSelector((state) => state.async);
    console.log(match.params.id);



    return(
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                <Item.Group>
                    <Item>
                    <Item.Image
                        avatar
                        size='small'
                        src={'/assets/user.png'}
                    />
                    <Item.Content verticalAlign='middle'>
                        <Header
                        as='h1'
                        style={{ display: 'block', marginBottom: 10 }}
                        content={currentUserProfile?.displayName}
                        />
                    </Item.Content>
                    </Item>
                </Item.Group>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}