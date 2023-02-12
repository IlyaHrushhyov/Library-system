using LibraryAPI.Extensions;
using LibraryAPI.Middlewares;
using Serilog;


var logger = new LoggerConfiguration()
    .WriteTo.File("log.txt")
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication("cookies")
    .AddCookie("cookies");

builder.Services.AddAuthorization();

builder.Logging.AddSerilog(logger);

builder.Services.AddControllers(options =>
{
    options.Filters.Add(new ValidationFilter());
});

builder.Services.ConfigureValidators();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureServices();
builder.Services.ConfigureOptions(builder);
builder.Services.ConfigureDataAccess(builder.Configuration.GetConnectionString("LibraryDb"));

var app = builder.Build();



app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowAnyOrigin());
app.ConfigureMiddlewares();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();

    //if (!app.Environment.IsDevelopment())
    //{
    //    endpoints.MapFallbackToFile("index.html");
    //}
});

if (app.Environment.IsDevelopment())
{
    app.UseSpa(spa =>
    {
        spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
    });
}

app.Run();
