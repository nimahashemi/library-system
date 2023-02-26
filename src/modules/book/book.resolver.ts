import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from 'src/schemas/book.schema';
import { BookCreatetDto } from 'src/dto/book-create.dto';
import { BookUpdateDto } from 'src/dto/book-update.dto';
import { CustomContext } from 'src/types/custom.context';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(
    @Args('bookCreatetDto') bookCreatetDto: BookCreatetDto,
    @Context() ctx: CustomContext,
  ) {
    return await this.bookService.create(bookCreatetDto, ctx.req);
  }

  @Query(() => [Book])
  async books(
    @Args('filters', { nullable: true }) filters?: BookCreatetDto,
    @Context() ctx?: CustomContext,
  ) {
    return await this.bookService.findAll(filters, ctx.req);
  }

  @Query(() => Book)
  async book(
    @Args('_id', { type: () => String }) id: string,
    @Context() ctx?: CustomContext,
  ) {
    return await this.bookService.findOne(id, ctx.req);
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('bookUpdateDto') bookUpdateDto: BookUpdateDto,
    @Context() ctx: CustomContext,
  ) {
    return await this.bookService.update(
      bookUpdateDto._id,
      bookUpdateDto,
      ctx.req,
    );
  }

  @Mutation(() => Book)
  async removeBook(
    @Args('id', { type: () => String }) id: string,
    @Context() ctx: CustomContext,
  ) {
    return await this.bookService.remove(id, ctx.req);
  }
}
