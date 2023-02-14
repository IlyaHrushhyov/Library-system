using DAL.Models;

namespace LibraryApi.Services.Respons.BookController
{
    public class UserBookInfo : Book
    {
        public string AuthorName { get; set; }
    }
}
