import userReducer, {
  updateUser,
} from './UserSlice';

describe('user reducer', () => {
  const initialState = {
    id: null,
    username: null,
    email: null,
    created: null,
    isFetching: false,
    isSuccess: false,
    isError: false,
    error: null
  };
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      id: null,
      username: null,
      email: null,
      created: null,
      isFetching: false,
      isSuccess: false,
      isError: false,
      error: null
    });
  });

  it('should handle update', () => {
    const actual = userReducer(initialState, updateUser({
      id: 99,
      username: 'testing',
      email: 'test@test.com',
      created: '12-31-2021'
    }));
    expect(actual).toEqual({
      id: 99,
      username: 'testing',
      email: 'test@test.com',
      created: '12-31-2021',
      isFetching: false,
      isSuccess: false,
      isError: false,
      error: null
    });
  });
});
