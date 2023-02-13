using DAL.Models;

namespace LibraryApi.Services.Services.GenreService
{
    public interface IGenreService
    {
        public Task<List<Genre>> GetGenres();
    }
}