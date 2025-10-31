import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@formio/react';
import type { Webform } from '@formio/js';
import '@formio/js/dist/formio.embed.min.css';
import '@formio/js/dist/formio.full.min.css';
import { FormsProvider, useFormsContext } from './FormsProvider';

/**
 *
 * It requires following css imports:
 * - @formio/js/dist/formio.embed.min.css
 * - @formio/js/dist/formio.full.min.css
 *
 * @param props FormRendererProps
 * @returns JSX.Element
 */
const FormRenderer = () => {
  const [loading, setLoading] = useState(false);
  const { stakeholder, form, onFormEvent } = useFormsContext();
  const formInstanceRef = useRef<Webform | null>(null);

  const handleFormReady = useCallback((instance: Webform) => {
    formInstanceRef.current = instance;
    instance.nosubmit = true;
  }, []);

  const handleSubmit = useCallback(
    (submission: any, saved?: boolean) => {
      onFormEvent(submission.data);
      if (!saved) {
        formInstanceRef.current?.emit('submitDone');
      }
    },
    [onFormEvent]
  );

  const handleChange = useCallback(
    (value: any) => {
      if (value?.data) {
        onFormEvent(value.data);
      }
    },
    [onFormEvent]
  );

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [stakeholder]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!form) {
    return null;
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
      />
      <Form
        src={form}
        formReady={handleFormReady}
        onSubmit={handleSubmit}
        onChange={handleChange}
      ></Form>
    </>
  );
};

const FormRendererWrapper = (props: {
  stakeholder: string | null;
  hostElement?: HTMLElement;
}) => {
  return (
    <FormsProvider
      stakeholder={props.stakeholder}
      hostElement={props.hostElement}
    >
      <FormRenderer />
    </FormsProvider>
  );
};

export { FormRendererWrapper };
