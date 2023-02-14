using DAL.Models;
using LibraryApi.Services.Services.GenreService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly IGenreService _genreService;
        public GenreController(IGenreService genreService)
        {
            _genreService = genreService;
        }

        [HttpGet("getGenres")]
        [ProducesResponseType(typeof(List<Genre>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _genreService.GetGenres();

            return Ok(genres);
        }
    }
}
