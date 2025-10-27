import { FormType } from '@formio/react';
import React, { createContext, useEffect, useState } from 'react';

type FormsContextType = {
  updateHostElement: (element: HTMLElement) => void;
  onFormEvent: (data: any) => void;
  setStakeholder: (stakeholder: string | null) => void;
  stakeholder: string | null;
  loading?: boolean;
  form: FormType | null;
};

const FormsContext = createContext<FormsContextType | undefined>(undefined);

// temporary form schema for demonstration purposes
const formSchema: FormType = {
  _id: '57aa1d2a5b7a477b002717fe',
  machineName: 'examples:example',
  modified: '2025-10-14T22:34:11.885Z',
  title: 'Example',
  display: 'form',
  type: 'form',
  name: 'example',
  path: 'example',
  project: '5692b91fd1028f01000407e3',
  created: '2016-08-09T18:12:58.126Z',
  components: [
    {
      input: false,
      html: '<h1><a href="https://form.io">Form.io</a> Example Form</h1>\n\n<p>This is a dynamically rendered JSON form&nbsp;built with <a href="https://form.io">Form.io</a>. Using a simple&nbsp;drag-and-drop form builder, you can create any form that includes e-signatures, wysiwyg editors, date fields, layout components, data grids, surveys, etc.</p>\n',
      type: 'content',
      key: 'content',
      tableView: false,
      label: 'Content',
    },
    {
      input: false,
      columns: [
        {
          components: [
            {
              tabindex: '1',
              input: true,
              tableView: true,
              label: 'First Name',
              key: 'firstName',
              value: "Mirko O'neal",
              placeholder: 'Enter your first name',
              type: 'textfield',
            },
            {
              tabindex: '3',
              input: true,
              tableView: true,
              label: 'Email',
              key: 'email',
              placeholder: 'Enter your email address',
              type: 'email',
            },
          ],
          width: 6,
          offset: 0,
          push: 0,
          pull: 0,
          size: 'md',
        },
        {
          components: [
            {
              tabindex: '2',
              input: true,
              tableView: true,
              label: 'Last Name',
              key: 'lastName',
              placeholder: 'Enter your last name',
              type: 'textfield',
            },
            {
              tabindex: '4',
              input: true,
              tableView: true,
              label: 'Phone Number',
              key: 'phoneNumber',
              placeholder: 'Enter your phone number',
              type: 'phoneNumber',
            },
          ],
          width: 6,
          offset: 0,
          push: 0,
          pull: 0,
          size: 'md',
        },
      ],
      type: 'columns',
      key: 'columns',
      tableView: false,
      label: 'Columns',
    },
    {
      tabindex: '5',
      input: true,
      tableView: true,
      label: 'Survey',
      key: 'survey',
      questions: [
        {
          value: 'howWouldYouRateTheFormIoPlatform',
          label: 'How would you rate the Form.io platform?',
          tooltip: '',
        },
        {
          value: 'howWasCustomerSupport',
          label: 'How was Customer Support?',
          tooltip: '',
        },
        {
          value: 'overallExperience',
          label: 'Overall Experience?',
          tooltip: '',
        },
      ],
      values: [
        {
          value: 'excellent',
          label: 'Excellent',
        },
        {
          value: 'great',
          label: 'Great',
        },
        {
          value: 'good',
          label: 'Good',
        },
        {
          value: 'average',
          label: 'Average',
        },
        {
          value: 'poor',
          label: 'Poor',
        },
      ],
      type: 'survey',
    },
    {
      input: true,
      tableView: true,
      label: 'Signature',
      key: 'signature',
      type: 'signature',
      hideLabel: true,
    },
    {
      tabindex: '6',
      input: true,
      label: 'Submit',
      tableView: false,
      key: 'submit',
      disableOnInvalid: true,
      type: 'button',
    },
  ],
  owner: '554806425867f4ee203ea861',
  submissionAccess: [
    {
      type: 'create_own',
      roles: ['5692b920d1028f01000407e6'],
    },
    {
      type: 'create_all',
      roles: [],
    },
    {
      type: 'read_own',
      roles: [],
    },
    {
      type: 'read_all',
      roles: [],
    },
    {
      type: 'update_own',
      roles: [],
    },
    {
      type: 'update_all',
      roles: [],
    },
    {
      type: 'delete_own',
      roles: [],
    },
    {
      type: 'delete_all',
      roles: [],
    },
    {
      type: 'team_read',
      roles: [],
    },
    {
      type: 'team_write',
      roles: [],
    },
    {
      type: 'team_admin',
      roles: [],
    },
  ],
  access: [
    {
      type: 'create_own',
      roles: [],
    },
    {
      type: 'create_all',
      roles: [],
    },
    {
      type: 'read_own',
      roles: [],
    },
    {
      type: 'read_all',
      roles: [
        '5692b920d1028f01000407e4',
        '5692b920d1028f01000407e5',
        '6556376d043f6ce752e40641',
        '5692b920d1028f01000407e6',
        '000000000000000000000000',
      ],
    },
    {
      type: 'update_own',
      roles: [],
    },
    {
      type: 'update_all',
      roles: [],
    },
    {
      type: 'delete_own',
      roles: [],
    },
    {
      type: 'delete_all',
      roles: [],
    },
    {
      type: 'team_read',
      roles: [],
    },
    {
      type: 'team_write',
      roles: [],
    },
    {
      type: 'team_admin',
      roles: [],
    },
  ],
  tags: [],
  _vid: 0,
  revisions: '',
  settings: { hideTitle: false },
  submissionRevisions: '',
  fieldMatchAccess: {
    read: [
      {
        formFieldPath: '',
        value: '',
        operator: '$eq',
        valueType: 'string',
        roles: [],
      },
    ],
    write: [
      {
        formFieldPath: '',
        value: '',
        operator: '$eq',
        valueType: 'string',
        roles: [],
      },
    ],
    create: [
      {
        formFieldPath: '',
        value: '',
        operator: '$eq',
        valueType: 'string',
        roles: [],
      },
    ],
    admin: [
      {
        formFieldPath: '',
        value: '',
        operator: '$eq',
        valueType: 'string',
        roles: [],
      },
    ],
    delete: [
      {
        formFieldPath: '',
        value: '',
        operator: '$eq',
        valueType: 'string',
        roles: [],
      },
    ],
    update: [
      {
        formFieldPath: '',
        value: '',
        operator: '$eq',
        valueType: 'string',
        roles: [],
      },
    ],
    _id: '68eecf47f50bfcf4173abd30',
  },
};

/**
 * Provider component that supplies form-related utilities via FormsContext.
 *
 * The provider maintains an internal reference to a host DOM element that can
 * be registered by descendants using `registerHostElement`. When `onFormEvent`
 * is invoked, the provider creates and dispatches a `CustomEvent` with the
 * supplied name and detail on the registered host element. If no host element
 * has been registered, `onFormEvent` is a no-op.
 *
 * This component accepts React children and renders them while exposing the
 * following utilities through `FormsContext`:
 *
 * - `registerHostElement(element: HTMLElement)`: Registers the DOM element that
 *   will receive dispatched `CustomEvent`s.
 * - `onFormEvent(eventName: string, detail: any)`: Dispatches a `CustomEvent`
 *   with the provided name and detail on the registered host element.
 *
 * @param props.children - React nodes to be rendered inside the provider.
 *
 * @returns A React element that provides `registerHostElement` and `onFormEvent`
 *          to descendant components via `FormsContext`.
 */
export const FormsProvider: React.FC<
  React.PropsWithChildren<{
    hostElement?: HTMLElement | null;
    stakeholder?: string | null;
  }>
> = (props) => {
  const [hostElement, setHostElement] = useState<HTMLElement | null>(
    props.hostElement || null
  );
  const [stakeholder, setStakeholder] = useState<string | null>(
    props.stakeholder || null
  );
  const [loading, setLoading] = useState(false);

  const onFormEvent = (data: any) => {
    // eslint-disable-next-line no-console
    console.log('onFormEvent called with data:', data);
    
    if (hostElement) {
      
      const event = new CustomEvent('onDataLoaded', {
        bubbles: true,
        composed: true,
        detail: data, // i tuoi dati
      });

      // 2. Lo "spara"
      hostElement.dispatchEvent(event);
    }
  };

  useEffect(() => {
    // TODO: Load new form schema based on stakeholder change
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [stakeholder]);

  return (
    <FormsContext.Provider
      value={{
        updateHostElement: setHostElement,
        onFormEvent,
        setStakeholder,
        stakeholder,
        loading,
        form: formSchema,
      }}
    >
      {props.children}
    </FormsContext.Provider>
  );
};

export const useFormsContext = (): FormsContextType => {
  const context = React.useContext(FormsContext);
  if (!context) {
    throw new Error('useFormsContext must be used within a FormsProvider');
  }
  return context;
};
