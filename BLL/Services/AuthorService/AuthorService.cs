using DAL;
using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryApi.Services.Services.AuthorService
{
    public class AuthorService : IAuthorService
    {
        private readonly ApplicationContext _context;
        public AuthorService(ApplicationContext context)
        {
            _context = context;
        }
        public async Task<List<Author>> GetAuthors()
        {
            var authors = await _context.Authors.ToListAsync();

            return authors;
        }
    }
}
