import { main } from '../src/main';

describe('extends partial types', () => {
  it('extends partial types', async () => {
    const result = await main(
      './test/fixtures/6-extends-pick-omit/tsconfig.json',
    );
    // console.log(result);
    expect(result).toMatchSnapshot();
  });
});
