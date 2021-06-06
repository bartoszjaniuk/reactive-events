import { Field, Form, Formik } from 'formik';
import { Loader } from 'semantic-ui-react';
import { addEventChatComment } from '../../../app/firebase/firebaseService';
import * as Yup from 'yup';

const EventDetailedChatForm = ({ eventId, parentId, closeForm }) => {
  const validationSchema = Yup.object({
    comment: Yup.string().required(),
  });

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId });
          resetForm();
        } catch (error) {
          alert(error.message);
        } finally {
          setSubmitting(false);
          closeForm({ open: false, commentId: null });
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form className="ui form">
          {/* <TextAreaInput name="comment" placeholder="Add comment" rows={2} /> */}
          <Field name="comment">
            {({ field }) => (
              <div style={{ position: 'relative' }}>
                <Loader active={isSubmitting} />
                <textarea
                  rows="2"
                  {...field}
                  placeholder="Enter comment.."
                  onKeyPress={e => {
                    if (e.key === 'Enter' && e.shiftKey) {
                      return;
                    }
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      isValid && handleSubmit();
                    }
                  }}
                ></textarea>
              </div>
            )}
          </Field>
          {/* <Button type="submit" loading={isSubmitting} content="Add reply" icon="edit" primary /> */}
        </Form>
      )}
    </Formik>
  );
};

export default EventDetailedChatForm;
