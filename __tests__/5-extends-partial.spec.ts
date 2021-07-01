import { main } from '../src/main';

describe('extends partial types', () => {
  it('extends partial types', async () => {
    const result = await main(
      './test/fixtures/5-extends-partial/tsconfig.json',
    );
    expect(result).toMatchSnapshot();
  });
});
