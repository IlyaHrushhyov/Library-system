using BLL.Services.BookService;
using DAL;
using FluentValidation.AspNetCore;
using LibraryApi.Services.Infrastructure.Providers;
using LibraryApi.Services.Services.AuthService;
using LibraryApi.Services.Validators.AuthRequests;
using LibraryAPI.Middlewares;
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
            services.AddSingleton<ExceptionHandlingMiddleware>();
            services.AddScoped<IBookService, BookService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IDateTimeProvider, DateTimeProvider>();
        }

        public static void ConfigureValidators(this IServiceCollection services)
        {
            services.AddFluentValidation(x => x.RegisterValidatorsFromAssemblyContaining<RegisterRequestValidator>());
        }

        public static void ConfigureMiddlewares(this IApplicationBuilder applicationBuilder)
        {
            applicationBuilder.UseMiddleware<ExceptionHandlingMiddleware>();
        }

        public static void ConfigureOptions(this IServiceCollection services, WebApplicationBuilder builder)
        {
            services.Configure<AuthOptions>(builder.Configuration.GetSection(AuthOptions.Position));
        }
    }
}
