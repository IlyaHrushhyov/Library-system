using BLL.Requests.BookController;
using BLL.Services.BookService;
using DAL.Models;
using LibraryApi.Services.Requests.BookController;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookService _bookService;
        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> CreateBookAsync([FromBody] CreateBookRequest request)
        {
            var userId = HttpContext.User.Claims.First(x => x.Type is ClaimTypes.NameIdentifier).Value;
            request.UserId = Guid.Parse(userId);
            await _bookService.CreateBookAsync(request);

            return Created(string.Empty, null);
        }

        [HttpGet("getUserBooks")]
        [ProducesResponseType(typeof(List<Book>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetUserBooksAsync()
        {
            var userId = HttpContext.User.Claims.First(x => x.Type is ClaimTypes.NameIdentifier).Value;
            var books = await _bookService.GetUserBooksAsync(userId);

            return Ok(books);
        }

        [HttpGet("getBook")]
        [ProducesResponseType(typeof(Book), (int)HttpStatusCode.OK)]
        public IActionResult GetBook([FromQuery]GetBookRequest request)
        {
            var book = _bookService.GetBook(request);

            return Ok(book);
        }

        [HttpPut]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        public async Task<IActionResult> UpdateBookAsync([FromBody] UpdateBookRequest request)
        {
            await _bookService.UpdateBookAsync(request);

            return NoContent();
        }

        [HttpDelete]
        [ProducesResponseType((int)HttpStatusCode.NoContent)]
        public async Task<IActionResult> DeleteBookAsync([FromBody] DeleteBookRequest request)
        {
            await _bookService.DeleteBooksAsync(request);

            return NoContent();
        }
    }
}
