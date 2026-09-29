import * as test from 'node:test';
import { RuleTester } from '@typescript-eslint/rule-tester';

RuleTester.afterAll = test.after;
// node:test runs describe() and it() without awaiting the returned Promises
/* eslint-disable @typescript-eslint/no-misused-promises */
RuleTester.describe = test.describe;
RuleTester.it = test.it;
RuleTester.itOnly = test.it.only;
/* eslint-enable @typescript-eslint/no-misused-promises */
