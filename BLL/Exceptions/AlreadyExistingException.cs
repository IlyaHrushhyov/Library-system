namespace LibraryApi.Services.Exceptions
{
    public class AlreadyExistingException : Exception
    {
        public AlreadyExistingException(string message) : base(message)
        {
        }
    }
}
