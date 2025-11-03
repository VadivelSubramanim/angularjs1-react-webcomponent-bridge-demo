import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@formio/react';
import type { Webform } from '@formio/js';
import '@formio/js/dist/formio.embed.min.css';
import '@formio/js/dist/formio.full.min.css';
import { FormsProvider, useFormsContext } from './FormsProvider';

/**
 * It requires following css imports:
 * - @formio/js/dist/formio.embed.min.css
 * - @formio/js/dist/formio.full.min.css
 *
 * @param props FormRendererProps
 * @returns JSX.Element
 */
const FormRenderer = () => {
  const [loading, setLoading] = useState(false);
  const { stakeholder, form, onFormEvent, onFormDirty, isDirty, resetDirty } = useFormsContext();
  const formInstanceRef = useRef<Webform | null>(null);
  const initialDataRef = useRef<any>(null);

  const handleFormReady = useCallback((instance: Webform) => {
    formInstanceRef.current = instance;
    // No initialData set here: Let first onChange (load) handle it to capture defaults
    instance.nosubmit = true;
  }, []);

  const handleSubmit = useCallback(
    (submission: any, saved?: boolean) => {
      onFormEvent(submission.data);
      // Reset dirty state after submit
      resetDirty();
      // Update initial baseline to submitted data (prevents post-submit onChange re-dirty)
      initialDataRef.current = { ...submission.data };
      if (!saved) {
        // formInstanceRef.current?.emit('submitDone');
        // formInstanceRef.current?.element.querySelector('.alert-success')?.remove();
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
      if (value?.data) {
        onFormEvent(value.data);
        if (!initialDataRef.current) {
          // First onChange: Init baseline (load defaults), skip dirty
          initialDataRef.current = { ...value.data };
          return;
        }
        // Only mark dirty on actual change (post-init), and only once
        if (
          !isDirty &&
          JSON.stringify(value.data) !== JSON.stringify(initialDataRef.current)
        ) {
          onFormDirty();
        }
      }
    },
    [onFormEvent, onFormDirty, isDirty]
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