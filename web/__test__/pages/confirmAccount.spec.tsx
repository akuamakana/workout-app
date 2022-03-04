import Wrapper from '../test_utils/Wrapper';
import ConfirmAccount from '../../pages/confirm-account';
import { render } from '@testing-library/react';
import { fromValue } from 'wonka';
import whenStable from '__test__/test_utils/whenStable';
import logSpy from '__test__/test_utils/logSpy';
const useRouter = jest.spyOn(require('next/router'), 'useRouter');

const mockClient: any = {
  executeMutation: () =>
    fromValue({
      data: {
        confirmEmail: true,
      },
    }),
};

const errorClient: any = {
  executeMutation: () => new Error(),
};



describe('ConfirmAccount', () => {
  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      query: {
        token: '123',
        email: '123@gmail.com',
      },
    }));
  });

  it('should render', () => {
    const { getByText } = render(
      <Wrapper value={mockClient}>
        <ConfirmAccount />
      </Wrapper>
    );

    expect(getByText('Confirm Account')).toBeInTheDocument();
    expect(getByText('Confirmed!')).toBeInTheDocument();
  });

  it('should receive an error', async () => {
    const log = logSpy();
    const { getByText } = render(
      <Wrapper value={errorClient}>
        <ConfirmAccount />
      </Wrapper>
    );
    expect(getByText('Confirm Account')).toBeInTheDocument();
    await whenStable();
    expect(log).toHaveBeenCalled();
  });


});
