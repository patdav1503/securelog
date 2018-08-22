# securelog-network

> This is a distributed secure error logger.

This business network defines:

**Participants:**
`Member` `System` `Admin`

**Assets:**
`ErrorMessage`

**Transactions:**
`storeErrorMessage` `updateErrorMessageOwner` `updateErrorMessageStatus`

**Events:**
`ErrorMessageCreated` `ErrorMessageOwnerUpdated` `ErrorMessageStatusUpdated`

To test this Business Network Definition using **Composer CLI**

From the top directory with `package.json`, run `npm install` to install network and required packages into `npm`.  Use `npm test` to run the test using `mocha` and `cucumber` as defined in the `package.json` file.  Mocha tests are located in the test subdirectory and are written in Javascript.  Cumcumber tests are located in the features subdirectory and are written in the cucumber format.

To test this Business Network Definition in the **Test** tab:

