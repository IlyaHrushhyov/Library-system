using BLL.Requests.BookController;
using BLL.Services.BookService;
using DAL.Models;
using LibraryApi.Services.Requests.BookController;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
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
            await _bookService.CreateBookAsync(request);

            return Created(string.Empty, null);
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Book>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetUserBooksAsync(GetUserBooksRequest request)
        {
            var books = await _bookService.GetUserBooksAsync(request);

            return Ok(books);
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
