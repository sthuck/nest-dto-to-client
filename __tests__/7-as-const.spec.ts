import { main } from '../src/main';

describe('extends partial types, with as const syntax', () => {
  it('extends partial with as const syntax', async () => {
    const result = await main('./test/fixtures/7-as-const/tsconfig.json');
    expect(result).toMatchSnapshot();
  });
});
