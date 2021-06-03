import { useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import PhotoWidgetCropper from '../photo-widget-cropper/photo-widget-cropper';
import PhotoWidgetDropzone from '../photo-widget-dropzone/photo-widget-dropzone';
import cuid from 'cuid';
import { getFileExtenstion } from '../../app/util/util';
import { uploadToFirebaseStorage } from '../../app/firebase/firebaseService';
import { updateUserProfilePhoto } from '../../app/firebase/firestoreService';
const PhotosUploadWidget = ({ setEditMode }) => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadImage = () => {
    setLoading(true);
    const filename = cuid() + '.' + getFileExtenstion(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      error => {
        alert(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch(error => {
              alert(error.message);
              setLoading(false);
            });
        });
      }
    );
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="purple" sub content="Step 1 - Add Photo" />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="purple" sub content="Step 2 - Resize" />
        {files.length > 0 && (
          <PhotoWidgetCropper setImage={setImage} imagePreview={files[0].preview} />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color="purple" sub content="Step 3 - Preview & Upload" />
        {files.length > 0 && (
          <>
            <div
              className="img-preview"
              style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
            />
            <Button.Group>
              <Button
                style={{ width: 100 }}
                positive
                icon="check"
                onClick={handleUploadImage}
                loading={loading}
              />
              <Button
                style={{ width: 100 }}
                icon="close"
                onClick={handleCancelCrop}
                disabled={loading}
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid>
  );
};
export default PhotosUploadWidget;
