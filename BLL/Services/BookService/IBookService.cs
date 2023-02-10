using BLL.Requests.BookController;
using DAL.Models;
using LibraryApi.Services.Requests.BookController;

namespace BLL.Services.BookService
{
    public interface IBookService
    {
        public Task CreateBookAsync(CreateBookRequest request);
        public Task<List<Book>> GetUserBooksAsync(GetUserBooksRequest request);
        public Task UpdateBookAsync(UpdateBookRequest request);
        public Task DeleteBooksAsync(DeleteBookRequest request);
    }
}
