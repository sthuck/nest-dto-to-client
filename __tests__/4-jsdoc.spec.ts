import { main } from '../src/main';

describe('jsdoc', () => {
  it('supports jsdoc', async () => {
    const result = await main('./test/fixtures/4-jsdoc/tsconfig.json');
    expect(result).toMatchSnapshot();
  });
});
