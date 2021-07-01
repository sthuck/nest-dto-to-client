import { main } from '../src/main';

describe('simple dto', () => {
  it('simple dto', async () => {
    const result = await main('./test/fixtures/1-simple/tsconfig.json');
    expect(result).toMatchSnapshot();
  });
});
