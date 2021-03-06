import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from 'src/domain/users/dto';

@Exclude()
export class SignInResponseDto {
    @Expose()
    @Type(() => UserDto)
    user: UserDto;

    @Expose()
    accessToken: string;

    @Expose()
    refreshToken: string;
}
