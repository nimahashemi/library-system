import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth } from 'src/schemas/auth.schema';
import { AuthService } from '../auth/auth.service';
import { LoginInput } from '../../dto/login-input.dto';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth, { nullable: true })
  async login(@Args('loginInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput.email, loginInput.password);
  }
}
