using LibraryApi.Services.Requests.AuthController;
using LibraryApi.Services.Services.AuthService;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace LibraryAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterRequest request)
        {
            await _authService.RegisterAsync(request);

            return Created(string.Empty, null);
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(string), (int)HttpStatusCode.Created)]
        public IActionResult LoginAsync([FromBody] LoginRequest request)
        {
            var jwtToken = _authService.LoginAsync(request);

            return Created(string.Empty, jwtToken);
        }
    }
}
