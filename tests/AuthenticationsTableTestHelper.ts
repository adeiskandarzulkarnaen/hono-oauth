/* istanbul ignore file */
import prismaClient from '@infrastructures/database/sql/prismaClient';

const AuthenticationsTableTestHelper = {
  async addToken(token: string): Promise<void> {
    await prismaClient.authentication.create({
      data: { refreshToken: token }
    });
  },

  async findToken(token: string): Promise<string | null> {
    const result = await prismaClient.authentication.findFirst({
      where: { refreshToken: token },
    });
    return result?.refreshToken || null;
  },

  async cleanTable(): Promise<void> {
    await prismaClient.authentication.deleteMany();
  }
};

export default AuthenticationsTableTestHelper;
