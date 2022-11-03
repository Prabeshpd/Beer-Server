import { Type, Static } from '@sinclair/typebox';

const AppInfoSchema = Type.Object({
  name: Type.String(),
  version: Type.String()
});

export type AppInfoInterface = Static<typeof AppInfoSchema>;

export const AppInfoResponseSchema = {
  response: {
    200: AppInfoSchema
  }
};
