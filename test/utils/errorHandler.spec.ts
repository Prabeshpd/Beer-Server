import 'mocha';
import { expect } from 'chai';

import ErrorHandler from '../../src/utils/ErrorHandler';

describe('ErrorHandler', () => {
  it('should return error object with property code and message if code and message is passed', () => {
    const error = new ErrorHandler({ code: 'UNAUTHORIZED', message: 'Incorrect Credentials' }).construct();
    expect(error).to.deep.equal({ error: { code: 'UNAUTHORIZED', message: 'Incorrect Credentials', details: [] } });
  });

  it('should return error object with nested innerError property set through addInnerError method.', () => {
    const error = new ErrorHandler({ code: 'BAD_ARGUMENT', message: 'Previous Password may not be used' })
      .addInnerError({ code: 'PasswordError' })
      .addInnerError({ code: 'PasswordDoesNotMeetPolicy' })
      .addInnerError({ code: 'PasswordReuseNotAllowed', message: 'Previous Password may not be used' })
      .construct();

    expect(error).to.deep.equal({
      error: {
        code: 'BAD_ARGUMENT',
        message: 'Previous Password may not be used',
        innerError: {
          code: 'PasswordError',
          innerError: {
            code: 'PasswordDoesNotMeetPolicy',
            innerError: { code: 'PasswordReuseNotAllowed', message: 'Previous Password may not be used' }
          }
        },
        details: []
      }
    });
  });

  it('should return error object with details of error set through the addDetails method.', () => {
    const error = new ErrorHandler({ code: 'BadArgument', message: 'Errors in contact information data' })
      .addDetails({
        code: 'NullValue',
        target: 'PhoneNumber',
        message: 'Phone number must not be null'
      })
      .addDetails({
        code: 'NullValue',
        target: 'LastName',
        message: 'Last name must not be null'
      })
      .construct();

    expect(error).to.deep.equal({
      error: {
        code: 'BadArgument',
        message: 'Errors in contact information data',
        details: [
          {
            code: 'NullValue',
            target: 'PhoneNumber',
            message: 'Phone number must not be null'
          },
          {
            code: 'NullValue',
            target: 'LastName',
            message: 'Last name must not be null'
          }
        ]
      }
    });
  });
});
