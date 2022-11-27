import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength, minLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'Nome de usuário, utilizado para login, deve ser único',
    example: 'Victor',
  })
  nickname: string;

  @IsString()
  @ApiProperty({
    description: 'Nome de usuário, apenas para exibição',
    example: 'Victor',
  })
  name: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'Senha do usuário,',
    example: 'abcdeft@412',
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'Confirmação da senha do usuário',
    example: 'abcdeft@412',
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    description: 'Foto do usuário',
    example: 'https://avatars.githubusercontent.com/u/91481122?v=4',
  })
  image: string;
}
