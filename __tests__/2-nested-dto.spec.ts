import { main } from '../src/main';

describe('nested dto', () => {
  it('nested dto', async () => {
    const result = await main('./test/fixtures/2-nested-import/tsconfig.json');
    expect(result).toMatchSnapshot();
  });
});
