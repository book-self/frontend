import tokenReducer, {
  updateToken,
} from './TokenSlice';

describe('token reducer', () => {
  const initialState = {
    value: null,
    status: 'idle',
  };
  it('should handle initial state', () => {
    expect(tokenReducer(undefined, { type: 'unknown' })).toEqual({
      value: null,
      status: 'idle',
    });
  });

  it('should handle update', () => {
    const actual = tokenReducer(initialState, updateToken('12345'));
    expect(actual.value).toEqual('12345');
  });
});
