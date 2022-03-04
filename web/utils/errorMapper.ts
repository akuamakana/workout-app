import { Error, ValidationError } from 'types/IError';

export const errorMapper = (errors: { graphQLErrors: Error[] }) => {
  let myErrors: ValidationError[] = [];
  let allErrors = {};
  errors.graphQLErrors.forEach((ge) => ge.extensions.exception.validationErrors.forEach((ve) => myErrors.push(ve)));

  myErrors.forEach((error) => {
    const parseMessage = Object.values(error.constraints)[0].split(' ');
    parseMessage.shift();
    return (allErrors = {
      ...allErrors,
      [error.property]: parseMessage.join(' '),
    });
  });
  return allErrors;
};
