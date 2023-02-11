using System.Text.Json;

namespace LibraryAPI.Middlewares
{
    public class ExceptionDetails
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public string StackTrace { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
