import { type PrismaClient } from '@prisma/client';
import InvariantError from '@commons/exceptions/InvariantError';
import AuthenticationRepository from '@domains/authentications/AuthenticationRepository';


export class AuthenticationRepositorySQLPrisma extends AuthenticationRepository {
  constructor(private readonly prismaClient: PrismaClient) {
    super();
  }

  async addToken(token: string): Promise<void> {
    await this.prismaClient.authentication.create({
      data: { refreshToken: token },
    });
  }

  async checkTokenAvailability(token: string): Promise<void> {
    const result = await this.prismaClient.authentication.findFirst({
      where: { refreshToken: token }
    });
    if (!result) throw new InvariantError('refreshToken tidak ditemukan');
  }

  async deleteToken(token: string): Promise<void> {
    await this.prismaClient.authentication.deleteMany({
      where: { refreshToken: token }
    });
  }
};

export default AuthenticationRepositorySQLPrisma;
