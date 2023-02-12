using DAL;
using DAL.Models;
using LibraryApi.Services.Exceptions;
using LibraryApi.Services.Infrastructure.Helpers;
using LibraryApi.Services.Infrastructure.Providers;
using LibraryApi.Services.Requests.AuthController;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace LibraryApi.Services.Services.AuthService
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationContext _dbContext;

        public AuthService(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
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

            return user.Id.ToString();
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

        private string HashPassword(string password)
        {
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: SaltProvider.GetSalt(),
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

            return hashedPassword;
        }
    }
}
