import httpStatus from 'http-status-codes';

import UserInfo from '../types/user';
import * as jwt from '../utils/jwt';
import * as userService from './user';
import * as crypt from '../utils/crypt';
import * as object from '../utils/object';
import ErrorFormatter from '../utils/ErrorHandler';
import UserDetail from '../types/user';
import { LoginPayload, LoginResponse, RefreshResponse, RefreshPayload } from '../types/auth';

/**
 * Login user.
 *
 * @param {LoginPayload} payload
 * @param {any} params
 * @return {Promise<LoginResponse>}
 */
export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const user: UserInfo = await userService.findUserByEmail(payload.email);
  if (!user) {
    const error = new ErrorFormatter({
      code: 'BadRequest',
      message: 'username or password does not match'
    }).construct();

    throw { statusCode: httpStatus.BAD_REQUEST, error };
  }

  if (!user.password) {
    const error = new ErrorFormatter({
      code: 'BadRequest',
      message: 'username or password does not match'
    }).construct();

    throw { statusCode: httpStatus.BAD_REQUEST, error };
  }

  const passwordMatches = await crypt.compare(payload.password, user.password);

  if (!passwordMatches) {
    const error = new ErrorFormatter({
      code: 'BadRequest',
      message: 'username or password does not match'
    }).construct();

    throw { statusCode: httpStatus.BAD_REQUEST, error };
  }

  const userInfo = object.withoutAttrs<UserInfo>(user, ['password']);
  const refreshToken = jwt.generateRefreshToken(user);
  const accessToken = jwt.generateAccessToken(user);

  return {
    code: httpStatus.OK,
    message: '',
    data: {
      user: userInfo,
      accessToken: accessToken,
      refreshToken: refreshToken
    }
  };
}

/**
 * Return new access token based on the refresh token.
 *
 * @param {RefreshPayload} payload
 * @returns {Promise<RefreshResponse>}
 */
export async function refresh(payload: RefreshPayload): Promise<RefreshResponse> {
  const refreshPayload = (await verifyRefreshToken(payload.refreshToken)) as UserDetail;

  let user = object.withoutAttrs<UserDetail>(refreshPayload, ['iat', 'exp']);

  const accessToken = await jwt.generateAccessToken(user);

  return {
    code: httpStatus.OK,
    message: 'Access Token generated successfully',
    data: {
      accessToken
    }
  };
}

/**
 * Verify the given refresh token is valid, active and has not expired yet.
 *
 * @param {string} token
 * @param {string} encodedAppId
 */
export async function verifyRefreshToken(token: string) {
  try {
    return jwt.verifyRefreshToken(token);
  } catch (err: any) {
    if (err.name === 'TokenExpiredError') {
      const error = new ErrorFormatter({
        code: 'Unauthorized',
        message: 'Refresh token expired'
      }).construct();

      throw { statusCode: httpStatus.UNAUTHORIZED, error };
    }

    const error = new ErrorFormatter({
      code: 'Unauthorized',
      message: 'Refresh token expired'
    }).construct();

    throw { statusCode: httpStatus.UNAUTHORIZED, error };
  }
}
