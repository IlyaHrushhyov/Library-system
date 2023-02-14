namespace LibraryApi.Services.Infrastructure.Providers
{
    public interface IDateTimeProvider
    {
        public DateTime GetUtcNow();
    }
}
