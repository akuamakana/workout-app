import InputField from '@components/InputField';
import { Form, Formik } from 'formik';
import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

describe('InputField', () => {
  it('should render', async () => {
    const { getByPlaceholderText } = render(
      <Formik initialValues={{ test: '' }} onSubmit={() => {}}>
        {() => (
          <Form>
            <InputField name="test" placeholder="test" />
          </Form>
        )}
      </Formik>
    );

    const input: HTMLElement & { value?: string } = getByPlaceholderText('test');
    expect(input).toBeInTheDocument();
    await act(async () => {
      fireEvent.change(input, { target: { value: 'jest' } });
    });
    expect(input.value).toBe('jest');
  });
});
