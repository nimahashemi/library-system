import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UserBookService } from './user-book.service';
import { UserBook } from 'src/schemas/user-book.schema';
import { UserBookCreateDto } from '../../dto/user-book-create.dto';
import { UserBookUpdateDto } from '../../dto/user-book-update.dto';
import { BookLoanDto } from '../../dto/book-loan-dto';
import { CustomContext } from 'src/types/custom.context';

@Resolver(() => UserBook)
export class UserBookResolver {
  constructor(private readonly userBookService: UserBookService) {}

  @Mutation(() => UserBook)
  async createUserBook(
    @Args('bookCreatetDto') userBookCreateDto: UserBookCreateDto,
    @Context() ctx: CustomContext,
  ) {
    return await this.userBookService.create(userBookCreateDto, ctx.req);
  }

  @Query(() => [UserBook])
  async userbooks(
    @Args('filters', { nullable: true }) filters?: UserBookCreateDto,
    @Context() ctx?: CustomContext,
  ) {
    return await this.userBookService.findAll(filters, ctx.req);
  }

  @Query(() => UserBook)
  async userbook(
    @Args('_id', { type: () => String }) id: string,
    @Context() ctx?: CustomContext,
  ) {
    return await this.userBookService.findOne(id, ctx.req);
  }

  @Mutation(() => UserBook)
  async updateUserBook(
    @Args('bookUpdateDto') userBookUpdateDto: UserBookUpdateDto,
    @Context() ctx: CustomContext,
  ) {
    return await this.userBookService.update(
      userBookUpdateDto._id,
      userBookUpdateDto,
      ctx.req,
    );
  }

  @Mutation(() => UserBook)
  async removeUserBook(
    @Args('id', { type: () => String }) id: string,
    @Context() ctx: CustomContext,
  ) {
    return await this.userBookService.remove(id, ctx.req);
  }

  @Query(() => [UserBook])
  async booksStatus(
    @Args('filters', { nullable: true }) filters?: BookLoanDto,
    @Context() ctx?: CustomContext,
  ) {
    return await this.userBookService.booksStatus(filters, ctx.req);
  }
}
