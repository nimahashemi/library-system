import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserBookService } from './user-book.service';
import { UserBook } from 'src/schemas/user-book.schema';
import { UserBookCreateDto } from '../../dto/user-book-create.dto';
import { UserBookUpdateDto } from '../../dto/user-book-update.dto';
import { BookLoanDto } from '../../dto/book-loan-dto';

@Resolver(() => UserBook)
export class UserBookResolver {
  constructor(private readonly userBookService: UserBookService) {}

  @Mutation(() => UserBook)
  async createUserBook(
    @Args('bookCreatetDto') userBookCreateDto: UserBookCreateDto,
  ) {
    return await this.userBookService.create(userBookCreateDto);
  }

  @Query(() => [UserBook])
  async userbooks(
    @Args('filters', { nullable: true }) filters?: UserBookCreateDto,
  ) {
    return await this.userBookService.findAll(filters);
  }

  @Query(() => UserBook)
  async userbook(@Args('_id', { type: () => String }) id: string) {
    return await this.userBookService.findOne(id);
  }

  @Mutation(() => UserBook)
  async updateUserBook(
    @Args('bookUpdateDto') userBookUpdateDto: UserBookUpdateDto,
  ) {
    return await this.userBookService.update(
      userBookUpdateDto._id,
      userBookUpdateDto,
    );
  }

  @Mutation(() => UserBook)
  async removeUserBook(@Args('id', { type: () => String }) id: string) {
    return await this.userBookService.remove(id);
  }

  @Query(() => [UserBook])
  async booksStatus(
    @Args('filters', { nullable: true }) filters?: BookLoanDto,
  ) {
    return await this.userBookService.booksStatus(filters);
  }
}
