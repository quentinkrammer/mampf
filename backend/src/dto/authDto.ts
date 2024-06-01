// This probably should not be a DTO
export class AuthRequestDto {
  user: { sub: string; username: string };
}
