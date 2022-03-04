import '@testing-library/jest-dom/extend-expect';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
