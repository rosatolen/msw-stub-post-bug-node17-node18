This repo shows an msw bug when stubbing the response body of a post in node17 and node18.

# How to replicate the bug

1. Ensure you are using node18 or node17. An .nvmrc file has been provided for ease of use.
2. Run `yarn install`
3. Run `yarn test`

The file \_\_tests\_\_/fooRouter.spec.js contains the tests where msw is used. The
file fooRouter.js has comments on where the stubbing issues happen. A working
msw stub is provided in the test to show that stubbing works for other
requests.

This error only happens in node17 and node18. It does not happen in node16.
