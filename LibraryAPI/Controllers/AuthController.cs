using LibraryApi.Services.Requests.AuthController;
using LibraryApi.Services.Services.AuthService;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

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
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest request)
        {
            var protectedUserId = _authService.LoginAsync(request);

            await Response.HttpContext.SignInAsync("cookies", new ClaimsPrincipal(new ClaimsIdentity(
                                   new Claim[]
                                   {
                                        new Claim(ClaimTypes.NameIdentifier, protectedUserId),
                                   },
                                   "cookies"
                                   )
                                   ),
                                   new AuthenticationProperties()
                                   {
                                       IsPersistent = true,
                                   });

            return Created(string.Empty, protectedUserId);
        }
    }
}
