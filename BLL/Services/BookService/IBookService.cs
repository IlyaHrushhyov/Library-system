using BLL.Requests.BookController;
using LibraryApi.Services.Respons.BookController;

namespace BLL.Services.BookService
{
    public interface IBookService
    {
        public Task CreateBookAsync(CreateBookRequest request);
        public Task<List<UserBookInfo>> GetUserBooksAsync(string request);
        public Task UpdateBookAsync(UpdateBookRequest request);
        public Task DeleteBooksAsync(DeleteBookRequest request);
    }
}
