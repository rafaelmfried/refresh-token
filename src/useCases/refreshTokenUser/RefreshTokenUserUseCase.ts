import { client } from "../../prisma/client";


class RefreshTokenUserUseCase {

  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token
      }
    });

    if(!refreshToken) throw new Error("Refresh Token")
  }
}

export { RefreshTokenUserUseCase };
