using DAL.Models;
using LibraryApi.Services.Services.AuthorService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorService _authorSerivce;
        public AuthorController(IAuthorService authorSerivce)
        {
            _authorSerivce = authorSerivce;
        }

        [HttpGet("getAuthors")]
        [Authorize]
        [ProducesResponseType(typeof(List<Author>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAuthors()
        {
            var authors = await _authorSerivce.GetAuthors();

            return Ok(authors);
        }
    }
}
