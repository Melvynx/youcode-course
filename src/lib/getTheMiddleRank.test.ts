import { describe, expect, test } from 'vitest';
import { getTheMiddleRank } from './getTheMiddleRank';

describe('updateRank', () => {
  const testUpsideRank = (upsideRank: string, rank: string) =>
    expect(upsideRank < rank).toBeTruthy();

  const testDownsideRank = (downsideRank: string, rank: string) =>
    expect(downsideRank > rank).toBeTruthy();

  test('updateRank simple', () => {
    const upsideRank = 'aaaaa';
    const downsideRank = 'baaaa';
    const rank = getTheMiddleRank(upsideRank, downsideRank);

    expect(rank).toBe('abaaa');
    testDownsideRank(downsideRank, rank);
    testUpsideRank(upsideRank, rank);
  });

  test('updateRank with the limit throw an error', () => {
    const upsideRank = 'aaaaa';
    const downsideRank = 'aaaab';

    // expect an error
    expect(() => getTheMiddleRank(upsideRank, downsideRank)).toThrow();
  });

  test('updateRank with a space between', () => {
    const upsideRank = 'aabaa';
    const downsideRank = 'aadaa';

    const rank = getTheMiddleRank(upsideRank, downsideRank);

    expect(rank).toBe('aacaa');
    testDownsideRank(downsideRank, rank);
    testUpsideRank(upsideRank, rank);
  });

  test('updateRank with a space between 2', () => {
    const upsideRank = 'zxvkb';
    const downsideRank = 'zxvkd';

    const rank = getTheMiddleRank(upsideRank, downsideRank);

    expect(rank).toBe('zxvkc');
    testDownsideRank(downsideRank, rank);
    testUpsideRank(upsideRank, rank);
  });

  test('updateRank with a space between 3', () => {
    const upsideRank = 'aabaa';
    const downsideRank = 'bbaaa';

    const rank = getTheMiddleRank(upsideRank, downsideRank);

    expect(rank).toBe('abaaa');
    testDownsideRank(downsideRank, rank);
    testUpsideRank(upsideRank, rank);
  });

  test('getTheMiddleRank with no value', () => {
    const rank = getTheMiddleRank();

    expect(rank).toBe('aaaabaaaa');
  });

  test('updateRank with a space between 4', () => {
    const upsideRank = 'abcaa';
    const downsideRank = 'bbaaa';

    const rank = getTheMiddleRank(upsideRank, downsideRank);

    testDownsideRank(downsideRank, rank);
    testUpsideRank(upsideRank, rank);
    expect(rank).toBe('acaaa');
  });

  test('updateRank abaaa', () => {
    const upsideRank = 'aaaaa';
    const downsideRank = 'abaaa';
    const rank = getTheMiddleRank(upsideRank, downsideRank);

    expect(rank).toBe('aabaa');
    testDownsideRank(downsideRank, rank);
    testUpsideRank(upsideRank, rank);
  });

  test('downsideRank abaaa', () => {
    const downsideRank = 'abaaa';
    const rank = getTheMiddleRank(undefined, 'abaaa');

    expect(rank).toBe('`baaa');
    testDownsideRank(downsideRank, rank);
  });

  test('downsideRank aaaaa', () => {
    const downsideRank = 'abaaa';
    const rank = getTheMiddleRank(undefined, 'aaaaa');

    expect(rank).toBe('`aaaa');
    testDownsideRank(downsideRank, rank);
  });

  test('downsideRank ~aaaa', () => {
    const downsideRank = '~aaaa';
    const rank = getTheMiddleRank(undefined, '~aaaa');

    expect(rank).toBe('}aaaa');
    testDownsideRank(downsideRank, rank);
  });

  test('upsideRank aaaaa', () => {
    const upsideRank = 'aaaaa';
    const rank = getTheMiddleRank(upsideRank, undefined);

    expect(rank).toBe('baaaa');
    testUpsideRank(upsideRank, rank);
  });
});
