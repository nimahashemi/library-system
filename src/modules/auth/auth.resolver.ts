import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth } from 'src/schemas/auth.schema';
import { AuthService } from '../auth/auth.service';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return await this.authService.login(email, password);
  }
}
