namespace LibraryApi.Services.Requests.AuthController
{
    public class RegisterRequest
    {
        public string FullName { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }
    }
}
