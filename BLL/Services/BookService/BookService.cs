using BLL.Requests.BookController;
using DAL;
using DAL.Models;
using LibraryApi.Services.Exceptions;
using LibraryApi.Services.Infrastructure.Helpers;
using LibraryApi.Services.Requests.BookController;
using LibraryApi.Services.Respons.BookController;
using Microsoft.EntityFrameworkCore;

namespace BLL.Services.BookService
{
    public class BookService : IBookService
    {
        private readonly ApplicationContext _dbContext;

        public BookService(ApplicationContext appContext)
        {
            _dbContext = appContext;
        }

        public async Task CreateBookAsync(CreateBookRequest request)
        {
            var genreExists = _dbContext.Genres.Where(g => g.Id == request.GenreId).Any();
            if (genreExists is not true)
            {
                throw new NotFoundException(ExceptionMessageHelper.NotFound(typeof(Genre), nameof(CreateBookRequest.GenreId), request.GenreId));
            }

            var authorExists = _dbContext.Genres.Where(g => g.Id == request.AuthorId).Any();
            if (authorExists is not true)
            {
                throw new NotFoundException(ExceptionMessageHelper.NotFound(typeof(Author), nameof(CreateBookRequest.AuthorId), request.AuthorId));
            }

            var book = new Book
            {
                AuthorId = request.AuthorId,
                GenreId = request.GenreId,
                Name = request.Name,
                Year = request.Year,
                UserId= request.UserId
            };

            _dbContext.Books.Add(book);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<UserBookInfo>> GetUserBooksAsync(string userId)
        {
            var userExists = _dbContext.Users.Where(u => u.Id == Guid.Parse(userId)).Any();
            if(userExists is not true)
            {
                throw new NotFoundException(ExceptionMessageHelper.NotFound(typeof(User), nameof(GetUserBooksRequest.Id), userId));
            }

            var books = await _dbContext.Books.Where(b => b.UserId == Guid.Parse(userId)).ToListAsync();

            var userBookInfos = books.Join(_dbContext.Authors, b => b.AuthorId, a => a.Id, (b, a) => new UserBookInfo
            {
                AuthorName = a.FullName,
                AuthorId = a.Id,
                Id = b.Id,
                GenreId = b.GenreId,
                UserId = b.UserId,
                Name = b.Name,
                Year = b.Year
            }).ToList();

            return userBookInfos;
        }

        public async Task UpdateBookAsync(UpdateBookRequest request)
        {
            var genreExists = _dbContext.Genres.Where(g => g.Id == request.GenreId).Any();
            if (genreExists is not true)
            {
                throw new NotFoundException(ExceptionMessageHelper.NotFound(typeof(Genre), nameof(UpdateBookRequest.GenreId), request.GenreId));
            }

            var authorExists = _dbContext.Genres.Where(g => g.Id == request.AuthorId).Any();
            if (authorExists is not true)
            {
                throw new NotFoundException(ExceptionMessageHelper.NotFound(typeof(Author), nameof(UpdateBookRequest.AuthorId), request.AuthorId));
            }

            var existingBook = _dbContext.Books.FirstOrDefault(b => b.Id == request.Id);
            if (existingBook is null)
            {
                throw new NotFoundException(ExceptionMessageHelper.NotFound(typeof(Book), nameof(UpdateBookRequest.Id), request.Id));
            }

            existingBook.Name = request.Name;
            existingBook.Year = request.Year;
            existingBook.AuthorId = request.AuthorId;
            existingBook.GenreId = request.GenreId;

            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteBooksAsync(DeleteBookRequest request)
        {
            var existingBooks = await _dbContext.Books.Where(b => request.Ids.Contains(b.Id)).ToListAsync();

            if (existingBooks is null)
            {
                throw new NotFoundException(ExceptionMessageHelper.NotFound(typeof(Book), request.Ids));
            }

            _dbContext.Books.RemoveRange(existingBooks);
            await _dbContext.SaveChangesAsync();
        }
    }
}
