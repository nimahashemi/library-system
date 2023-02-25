import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from 'src/schemas/book.schema';
import { BookCreatetDto } from 'src/dto/book-create.dto';
import { BookUpdateDto } from 'src/dto/book-update.dto';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(@Args('bookCreatetDto') bookCreatetDto: BookCreatetDto) {
    return await this.bookService.create(bookCreatetDto);
  }

  @Query(() => [Book])
  async books(@Args('filters', { nullable: true }) filters?: BookCreatetDto) {
    return await this.bookService.findAll(filters);
  }

  @Query(() => Book)
  async book(@Args('_id', { type: () => String }) id: string) {
    return await this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  async updateBook(@Args('bookUpdateDto') bookUpdateDto: BookUpdateDto) {
    return await this.bookService.update(bookUpdateDto._id, bookUpdateDto);
  }

  @Mutation(() => Book)
  async removeBook(@Args('id', { type: () => String }) id: string) {
    return await this.bookService.remove(id);
  }
}
