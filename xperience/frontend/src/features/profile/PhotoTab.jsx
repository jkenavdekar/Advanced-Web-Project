import React from 'react';
import { Grid, Header, Tab } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/photos/PhotoUploadWidget';


export default function PhotosTab({match}) {

    return (
        <Tab.Pane>
        <Grid>
            <Grid.Column width={16}>
                <Header floated='left' icon='user' content={`Photo`} />
            </Grid.Column>

            <Grid.Column width={16}>
                <PhotoUploadWidget userID={match.params.id} />
            </Grid.Column>
        </Grid>
        </Tab.Pane>
    )
}