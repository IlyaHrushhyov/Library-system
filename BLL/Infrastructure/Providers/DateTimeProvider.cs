namespace LibraryApi.Services.Infrastructure.Providers
{
    public class DateTimeProvider: IDateTimeProvider
    {
        public DateTime GetUtcNow() => DateTime.UtcNow;
    }
}
