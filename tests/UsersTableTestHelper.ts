/* istanbul ignore file */
import prismaClient from '../src/Infrastructures/database/sql/prismaClient';


const UsersTableTestHelper = {
  async addUser({ username = 'adeiskandarzulkarnaen', password = 'secretpassword', fullname = 'Ade Iskandar Zulkarnaen' }) {
    return prismaClient.user.create({
      data: { username, password, fullname },
      select: { id: true, username: true, fullname: true }
    });
  },

  async findUsersById(id: string) {
    const result = await prismaClient.user.findUnique({
      where: { id },
      select: { id: true, username: true, fullname: true }
    });
    return result;
  },

  async cleanTable(): Promise<void> {
    await prismaClient.user.deleteMany();
  },
};

export default UsersTableTestHelper;
