using BLL.Services.BookService;
using DAL;
using Microsoft.EntityFrameworkCore;

namespace LibraryAPI.Extensions
{
    public static class ServicesConfigurations
    {
        public static void ConfigureDataAccess(this IServiceCollection services, string connection)
        {
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
        }

        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IBookService, BookService>();
        }
    }
}
