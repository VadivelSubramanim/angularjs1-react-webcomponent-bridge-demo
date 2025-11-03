import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@formio/react';
import type { Webform } from '@formio/js';
import '@formio/js/dist/formio.embed.min.css';
import '@formio/js/dist/formio.full.min.css';
import { FormsProvider, useFormsContext } from './FormsProvider';

const FormRenderer = () => {
  const [loading, setLoading] = useState(false);
  const { stakeholder, form, onFormEvent, onFormDirty, isDirty, resetDirty } = useFormsContext();
  const formInstanceRef = useRef<Webform | null>(null);
  const initialDataRef = useRef<any>(null);
  const postSubmitRef = useRef<NodeJS.Timeout | null>(null);
  const isDirtyRef = useRef(isDirty);

  useEffect(() => {
    isDirtyRef.current = isDirty;
  }, [isDirty]);

  const handleFormReady = useCallback((instance: Webform) => {
    formInstanceRef.current = instance;
    instance.nosubmit = true;
  }, []);

  const handleSubmit = useCallback(
    (submission: any, saved?: boolean) => {
      // ONLY dispatch data here, on submit - CRITICAL: No data elsewhere!
      onFormEvent(submission.data);
      resetDirty(); // Uses debounced dispatch
      initialDataRef.current = { ...submission.data };
      // Longer debounce for post-submit noise (Form.io reset/validation)
      if (postSubmitRef.current) clearTimeout(postSubmitRef.current);
      postSubmitRef.current = setTimeout(() => {
        postSubmitRef.current = null;
      }, 300);

      if (!saved) {
        const formEl = formInstanceRef.current?.element;
        setTimeout(() => {
          const spinner = formEl?.querySelector('.formio-loading, .spinner-border, .glyphicon-refresh');
          if (spinner) spinner.remove();
        }, 2000);
      }
    },
    [onFormEvent, resetDirty]
  );

  const handleChange = useCallback(
    (value: any) => {
      // Skip during post-submit debounce
      if (postSubmitRef.current) return;

      if (value?.data) {
        // ABSOLUTELY NO DATA DISPATCH HERE - ONLY ON SUBMIT!
        // (If you see data logs on change, this line is commented out—uncomment below to debug)
        // console.log('handleChange fired, but NO data sent:', value.data); // TEMP DEBUG

        if (!initialDataRef.current) {
          initialDataRef.current = { ...value.data };
          return;
        }

        const dataStr = JSON.stringify(value.data);
        const initialStr = JSON.stringify(initialDataRef.current);
        const hasChanged = dataStr !== initialStr;

        if (hasChanged) {
          if (!isDirtyRef.current) {
            onFormDirty(); // Debounced {true}
          }
        } else {
          if (isDirtyRef.current) {
            resetDirty(); // Debounced {false}
          }
        }
      }
    },
    [onFormDirty, resetDirty]
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
      />
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