namespace LibraryApi.Services.Infrastructure.Providers
{
    public static class SaltProvider
    {
        private static byte[] salt = new byte[] { 102, 146, 158, 219, 242, 18, 228, 229, 202, 223, 31, 42, 137, 232, 48, 145 };

        public static byte[] GetSalt()
        {
            return salt;

        }
    }
}
