import { main } from '../src/main';

describe('extends types', () => {
  it('extends types', async () => {
    const result = await main('./test/fixtures/3-extends/tsconfig.json');
    expect(result).toMatchSnapshot();
  });
});
