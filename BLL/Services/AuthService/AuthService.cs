using DAL;
using DAL.Models;
using LibraryApi.Services.Exceptions;
using LibraryApi.Services.Infrastructure.Helpers;
using LibraryApi.Services.Infrastructure.Providers;
using LibraryApi.Services.Requests.AuthController;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;


namespace LibraryApi.Services.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationContext _dbContext;
        private readonly AuthOptions _options;
        private readonly IDateTimeProvider _dateTimeProvider;

        public AuthService(ApplicationContext dbContext, IOptions<AuthOptions> options, IDateTimeProvider dateTimeProvider)
        {
            _dbContext = dbContext;
            _options = options.Value;
            _dateTimeProvider = dateTimeProvider;
        }

        public string LoginAsync(LoginRequest request)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Login == request.Login);

            if (user is null)
            {
                throw new UnauthorizedException(ExceptionMessageHelper.Unauthorized());
            }

            var hashedRequestPassword = HashPassword(request.Password);

            if (hashedRequestPassword != user.Password)
            {
                throw new UnauthorizedException(ExceptionMessageHelper.Unauthorized());
            }
             
            string jwtToken = CreateToken(user);

            return jwtToken;
        }

        public async Task RegisterAsync(RegisterRequest request)
        {
            var existingUser = _dbContext.Users.Where(u => u.Login == request.Login).Any();
            if (existingUser is true)
            {
                throw new AlreadyExistingException(ExceptionMessageHelper.Found(typeof(User), nameof(LoginRequest.Login), request.Login));
            }

            var hashedPassword = HashPassword(request.Password);

            var userForCreation = new User
            {
                FullName = request.FullName,
                Login = request.Login,
                Password = hashedPassword
            };

            _dbContext.Users.Add(userForCreation);
            await _dbContext.SaveChangesAsync();
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim> 
            {
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Secret));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken
            (
                claims: claims,
                expires: _dateTimeProvider.GetUtcNow().AddDays(1),
                signingCredentials: creds
            );

            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            return jwtToken;
        }

        private string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(128 / 8);

            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hashedPassword;
        }
    }
}
