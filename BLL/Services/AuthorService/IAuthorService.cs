using DAL.Models;

namespace LibraryApi.Services.Services.AuthorService
{
    public interface IAuthorService
    {
        public Task<List<Author>> GetAuthors();
    }
}