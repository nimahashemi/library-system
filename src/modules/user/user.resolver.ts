import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import { UserCreatetDto } from 'src/dto/user-create.dto';
import { UserUpdatetDto } from 'src/dto/user-update.dto';
import { CustomContext } from 'src/types/custom.context';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('userCreatetDto') userCreatetDto: UserCreatetDto,
    @Context() ctx: CustomContext,
  ) {
    return await this.userService.create(userCreatetDto, ctx.req);
  }

  @Query(() => [User])
  async users(
    @Args('filters', { nullable: true }) filters?: UserCreatetDto,
    @Context() ctx?: CustomContext,
  ) {
    return await this.userService.findAll(filters, ctx.req);
  }

  @Query(() => User)
  async user(
    @Args('_id', { type: () => String }) id: string,
    @Context() ctx?: CustomContext,
  ) {
    return await this.userService.findOne(id, ctx.req);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userCreatetDto') userUpdateDto: UserUpdatetDto,
    @Context() ctx: CustomContext,
  ) {
    return await this.userService.update(
      userUpdateDto._id,
      userUpdateDto,
      ctx.req,
    );
  }

  @Mutation(() => User)
  async removeUser(
    @Args('id', { type: () => String }) id: string,
    @Context() ctx: CustomContext,
  ) {
    return await this.userService.remove(id, ctx.req);
  }
}
