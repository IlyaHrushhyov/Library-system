using LibraryApi.Services.Requests.AuthController;

namespace LibraryApi.Services.Services.AuthService
{
    public interface IAuthService
    {
        public Task RegisterAsync(RegisterRequest registerRequest);
        public string LoginAsync(LoginRequest loginRequest);
        public string GetUserInfo(string userID);
    }
}
