import React, { useEffect, useState } from 'react';
import { Form } from '@formio/react';
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
        onChange={(values) => {
          onFormEvent(values);
        }}
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
