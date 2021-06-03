import { useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';
import PhotosUploadWidget from '../../photos-upload-widget/photos-upload-widget';
import useFirestoreCollecion from '../../../app/hooks/useFireStoreCollection';
import { getUserPhotos, setMainPhoto } from '../../../app/firebase/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { listenToUserPhotos } from '../../../app/redux/profile/profileActions';
import { deleteFromFirebaseStorage } from '../../../app/firebase/firebaseService';
import { deletePhotoFromCollection } from '../../../app/firebase/firestoreService';
const PhotosTab = ({ profile, isCurrentUser }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const { loading } = useSelector(state => state.async);
  const { photos } = useSelector(state => state.profile);
  const [updating, setUpdating] = useState({ isUpdating: false, target: null });
  const [deleting, setDeleting] = useState({ isDeleting: false, target: null });

  useFirestoreCollecion({
    firestoreQuery: () => getUserPhotos(profile.id),
    data: photos => dispatch(listenToUserPhotos(photos)),
    dependencies: [profile.id, dispatch],
  });

  const handleSetMainPhoto = async (photo, target) => {
    setUpdating({ isUpdating: true, target });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      alert(error.message);
    } finally {
      setUpdating({ isUpdating: false, target });
    }
  };

  async function handleDeletePhoto(photo, target) {
    setDeleting({ isDeleting: true, target });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      alert(error.message);
    } finally {
      setDeleting({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated="left" icon="user" content={`Photos`} />
          {isCurrentUser && (
            <Button
              onClick={() => setEditMode(!editMode)}
              basic
              content={editMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {editMode ? (
            <PhotosUploadWidget setEditMode={setEditMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map(photo => (
                <Card key={photo.id}>
                  <Image src={photo.url} style={{ width: '300px' }} />
                  <Button.Group fluid widths={2}>
                    <Button
                      basic
                      color="green"
                      content="Main"
                      onClick={e => handleSetMainPhoto(photo, e.target.name)}
                      loading={updating.isUpdating && updating.target === photo.id}
                      name={photo.id}
                      disabled={photo.url === profile.photoURL}
                    />
                    <Button
                      color="red"
                      icon="trash"
                      name={photo.name}
                      loading={updating.isUpdating && updating.target === photo.id}
                      onClick={e => handleDeletePhoto(photo, e.target.name)}
                      disabled={photo.url === profile.photoURL}
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default PhotosTab;
