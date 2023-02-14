using DAL;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Services.Services.GenreService
{
    public class GenreService : IGenreService
    {
        private readonly ApplicationContext _context;
        public GenreService(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<List<Genre>> GetGenres()
        {
            var genres = await _context.Genres.ToListAsync();

            return genres;
        }
    }
}
