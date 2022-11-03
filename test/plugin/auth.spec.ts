import { expect } from 'chai';
import sinon from 'sinon';
import { FastifyReply, FastifyRequest } from 'fastify';

import * as jwt from '../../src/utils/jwt';
import LoggedInUser from '../../src/types/user';

import { hook } from '../../src/plugins/auth';
import {} from '../../src/types/request';

describe('resolve config for bootstrapping application', () => {
  let mockFastifyRequest: Partial<FastifyRequest>;
  let mockFastifyReply: Partial<FastifyReply>;

  let token: string;
  let user: LoggedInUser;
  before(async () => {
    mockFastifyRequest = {};
    mockFastifyReply = {};
    user = {
      email: 'prabesh1995@gmail.com',
      createdAt: '2022-10-22',
      isActive: true,
      updatedAt: '2022-10-22',
      id: 1
    };
    token = await jwt.generateAccessToken(user);
  });

  it('should return an error if there is no app id sent in request header', async () => {
    mockFastifyReply.status = sinon.stub().callsFake((statusArg) => {
      return {
        send: sinon.stub().callsFake((replyArg) => {
          return { status: statusArg, body: replyArg };
        })
      };
    });

    hook(mockFastifyRequest as FastifyRequest, mockFastifyReply as FastifyReply).then((data: any) =>
      expect(data).to.deep.equal({
        status: 400,
        body: {
          code: 'SERVER_ERROR',
          msg: 'App id not sent in request header',
          details: []
        }
      })
    );
  });

  it('should return an error if there is no token sent in header', async () => {
    mockFastifyReply.status = sinon.stub().callsFake((statusArg) => {
      return {
        send: sinon.stub().callsFake((replyArg) => {
          return { status: statusArg, body: replyArg };
        })
      };
    });

    hook(mockFastifyRequest as FastifyRequest, mockFastifyReply as FastifyReply).then((data: any) =>
      expect(data).to.deep.equal({
        status: 401,
        body: {
          code: 'UNAUTHORIZED',
          msg: 'No authorization header set',
          details: []
        }
      })
    );
  });

  it('should throw an error if there is no bearer token sent in header', async () => {
    mockFastifyRequest.headers = { authorization: `random_token ${token}` };
    mockFastifyReply.status = sinon.stub().callsFake((statusArg) => {
      return {
        send: sinon.stub().callsFake((replyArg) => {
          return { status: statusArg, body: replyArg };
        })
      };
    });

    hook(mockFastifyRequest as FastifyRequest, mockFastifyReply as FastifyReply).then((data: any) =>
      expect(data).to.deep.equal({
        status: 401,
        body: {
          code: 'UNAUTHORIZED',
          msg: "Authorization header doesn't include a Bearer token",
          details: []
        }
      })
    );
  });

  it('should throw an error if the app id on request is different to that of jwt generation app id', async () => {
    mockFastifyRequest.headers = { authorization: `random_token ${token}` };
    mockFastifyReply.status = sinon.stub().callsFake((statusArg) => {
      return {
        send: sinon.stub().callsFake((replyArg) => {
          return { status: statusArg, body: replyArg };
        })
      };
    });

    hook(mockFastifyRequest as FastifyRequest, mockFastifyReply as FastifyReply).then((data: any) =>
      expect(data).to.deep.equal({
        status: 401,
        body: {
          code: 'UNAUTHORIZED',
          msg: 'Invalid Token',
          details: []
        }
      })
    );
  });

  it('should set the decoded result in user properties of fastify request object', async () => {
    mockFastifyRequest.headers = { authorization: `Bearer ${token}` };
    mockFastifyReply.status = sinon.stub().callsFake((statusArg) => {
      return {
        send: sinon.stub().callsFake((replyArg) => {
          return { status: statusArg, body: replyArg };
        })
      };
    });

    process.env.accessTokenSecret = 'ENTER_ACCESS_TOKEN_SALT_HERE';

    hook(mockFastifyRequest as FastifyRequest, mockFastifyReply as FastifyReply).then((data: any) =>
      expect(mockFastifyRequest.user).to.deep.equal(user)
    );
  });
});
