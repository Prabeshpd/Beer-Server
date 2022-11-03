import dotenv from 'dotenv';

export interface VaultConfiguration {
  sentry?: {
    dsn?: string;
  };
  auth: {
    accessTokenSecret: string;
  };
}

interface Configuration {
  env: string;
  port: string | number;
  secret: string;
  cors: {
    whitelist: string[];
  };
  logger: {
    prettyPrint: boolean;
  };
  swagger: {
    swagger: {
      info: {
        title: string;
        description: string;
        version: string;
      };
      externalDocs?: {
        url: string;
        description: string;
      };
      host: string;
      schemes: string[];
      consumes: string[];
      produces: string[];
    };
    exposeRoute: boolean;
    hideUntagged: boolean;
  };
  auth: {
    saltRounds: string;
    refreshTokenSecret: string;
    refreshTokenDuration: string;
    accessTokenDuration: string;
    accessTokenSecret: string;
  };
}

dotenv.config();

const config: Configuration = {
  secret: process.env.SECRET_KEY || '',
  env: process.env.ENV || 'local',
  port: process.env.BEER_PORT || '3000',
  cors: {
    whitelist: ['/^localhost$/']
  },
  logger: {
    prettyPrint: process.env.ENV !== 'production'
  },
  swagger: {
    swagger: {
      info: {
        title: process.env.npm_package_name || '',
        description: process.env.npm_package_description || '',
        version: process.env.npm_package_version || ''
      },
      host: process.env.BEER_SWAGGER_HOST || 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true,
    hideUntagged: true
  },
  auth: {
    saltRounds: '11',
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET || 'ENTER_ACCESS_TOKEN_SALT_HERE',
    refreshTokenSecret: process.env.AUTH_REFRESH_TOKEN_SECRET || 'ENTER_REFRESH_TOKEN_SALT_HERE',
    accessTokenDuration: process.env.AUTH_ACCESS_TOKEN_DURATION || '300000',
    refreshTokenDuration: process.env.AUTH_REFRESH_TOKEN_DURATION || '86400000'
  }
};

export default config;
