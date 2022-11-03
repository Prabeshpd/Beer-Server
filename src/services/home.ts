import { AppInfoInterface } from '../schemas/home';

/**
 * Returns the application information.
 *
 * @returns {Promise<AppInfoInterface>} fastify
 */
export async function getAppInfo(): Promise<AppInfoInterface> {
  return {
    name: process.env.npm_package_name || '',
    version: process.env.npm_package_version || ''
  };
}
