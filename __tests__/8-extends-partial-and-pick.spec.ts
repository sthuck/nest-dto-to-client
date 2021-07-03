import { main } from '../src/main';

describe('extends partial types, with nested complex types', () => {
  it('extends partial types, with nested complex types', async () => {
    const result = await main(
      './test/fixtures/8-extends-partial-and-pick/tsconfig.json',
    );
    expect(result).toMatchSnapshot();
  });
});
