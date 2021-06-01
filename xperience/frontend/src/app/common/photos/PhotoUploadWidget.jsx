import React, { useState } from 'react';
import { Button, Divider, Grid, Header, Item } from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addPhoto } from '../../../features/profile/profileActions';
import { updatePhoto } from '../../../features/events/eventActions';

export default function PhotoUploadWidget({userID}) {

    const [files, setFiles] = useState([]);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [base64data, setBase] = useState(null);
    const dispatch = useDispatch();

    async function handleUploadImage() {
        setLoading(true);
        try {
            var reader = new FileReader();
            reader.readAsDataURL(image); 
            reader.onloadend = function() { 
                setBase(reader.result);
                //console.log(userID);
                //console.log(reader.result);
                localStorage.setItem("userPhoto", reader.result);
                dispatch(addPhoto(userID, reader.result));
                dispatch(updatePhoto(userID, reader.result));
            }
            setLoading(false);
            handleCancelCrop();
            document.location.reload();
        }
        catch(error) {
            toast.error(error.message);
            setLoading(false);
        }
        
    }
    
    function handleCancelCrop() {
        setFiles([]);
        setImage(null);
    }

    return (
        <Grid>
            <Grid.Column width={4}>
            <Item.Image avatar size='small' src={ base64data || '/assets/user.png' } />
                <Header color='teal' sub content='Step 1 - Add Photo' />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />

            <Grid.Column width={4}>
                <Header color='teal' sub content='Step 2 - Resize' />
                    { files.length > 0 && ( <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} /> )}
            </Grid.Column>
            <Grid.Column width={1} />

            <Grid.Column width={4}>
                <Header color='teal' sub content='Step 3 - Preview & upload' />
                { files.length > 0 && 
                    <>
                        <div className='img-preview' style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }} />
                        <Divider />
                        <Button.Group>
                            <Button loading={loading} onClick={handleUploadImage} style={{ width: 100 }} positive icon='check' />
                            <Button disabled={loading} onClick={handleCancelCrop} style={{ width: 100 }} icon='close' />
                        </Button.Group>
                    </>
                }
            </Grid.Column>
        </Grid>
    )
}