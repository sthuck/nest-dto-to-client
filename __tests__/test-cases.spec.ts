import { main } from '../src/main';
import fs from 'fs';

const cases = fs.readdirSync('./test/fixtures');

describe('testCases', () => {});
cases.forEach((testCase) => {
  it(testCase, async () => {
    const result = await main(`./test/fixtures/${testCase}/tsconfig.json`);
    expect(result).toMatchSnapshot();
  });
});
