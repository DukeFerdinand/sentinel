import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

interface ApiKeyFormFields {
  keyName: string;
  environment: string;
}

interface ApiKeyFormProps {
  submit: (val: ApiKeyFormFields) => Promise<unknown>;
}

export const NewApiKeyForm: React.FC<ApiKeyFormProps> = ({ submit }) => {
  const [formSubmitting, setSubmitting] = useState(false);

  return (
    <Formik
      initialValues={{
        keyName: '',
        environment: '',
      }}
      onSubmit={async (values, helpers) => {
        setSubmitting(true);
        if (!values.keyName) {
          helpers.setFieldError('keyName', 'Key name required');
          setSubmitting(false);
        }
        if (!values.environment) {
          helpers.setFieldError('environment', 'Environment name required');
          setSubmitting(false);
        }

        if (values.keyName && values.environment) {
          console.info('Ready to submit');
          await submit(values);
        }

        setSubmitting(false);
      }}
    >
      <Form className="border mb-4 p-4 w-full lg:w-1/2 flex flex-col rounded-md">
        <div className="flex flex-row w-full">
          <h3 className="text-xl">Generate a key</h3>

          <button
            type="submit"
            className="rounded border ml-auto p-1 pl-2 flex items-center justify-center hover:bg-gray-100"
            disabled={formSubmitting}
          >
            Add Key
            {formSubmitting ? (
              <i className="fas fa-circle-notch fa-spin text-xs ml-2 mr-1"></i>
            ) : (
              <i className="material-icons text-lg ml-1">add</i>
            )}
          </button>
        </div>
        <div className="flex flex-row w-full items-center mb-4">
          <label htmlFor="keyName" className="mr-4">
            Key Name
          </label>
          <Field
            className="rounded-md"
            type="text"
            name="keyName"
            placeholder="Key Name"
          />
        </div>
        <div className="flex flex-row w-full items-center">
          <label htmlFor="environment" className="mr-4">
            Environment
          </label>
          <Field
            className="rounded-md"
            type="text"
            name="environment"
            placeholder="dev, staging, prod, etc."
          />
        </div>
      </Form>
    </Formik>
  );
};
