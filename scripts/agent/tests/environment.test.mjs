import assert from 'node:assert/strict';
import test from 'node:test';
import { isSupportedNodeVersion, supportedNodeRange } from '../environment.mjs';

test('Node prerequisite requires the patched supported release lines', () => {
  assert.equal(supportedNodeRange, '^22.23.4 || ^24.22.1 || >=26.12.1');

  for (const version of ['22.23.4', 'v22.99.1', '24.22.1', '24.23.0', '26.12.1', '27.0.0']) {
    assert.equal(isSupportedNodeVersion(version), true, `${version} should be supported`);
  }

  for (const version of ['20.19.0', '22.13.0', '22.23.3', '23.11.0', '24.20.0', '24.22.0', '25.1.0', '26.12.0', '24.22.1-rc.1', '24.22.1junk', 'invalid']) {
    assert.equal(isSupportedNodeVersion(version), false, `${version} should be rejected`);
  }
});
