import { compare } from 'bcryptjs';
import { client } from '../../prisma/client';
import { sign } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken';

dotenv.config();

interface IRequest {
  username: string;
  password: string;
}

class AuthenticateUserUseCase {
  
  async execute({ username, password }: IRequest) {
    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    if(!userAlreadyExists) {
      throw new Error("User or password incorrect");
    }

    const passwordMatch = compare(password, userAlreadyExists.password);

    if(!passwordMatch) throw new Error("User or password incorrect");

    const SECRET = process.env.SECRET || '7a74ab23-dd12-4b8d-8004-69b865e475c6';

    const token = sign({}, SECRET, {
      subject: userAlreadyExists.id,
      expiresIn: '20s'
    });

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(
      userAlreadyExists.id
    );

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
