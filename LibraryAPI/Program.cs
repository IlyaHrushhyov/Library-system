using LibraryAPI.Extensions;
using LibraryAPI.Middlewares;
using Serilog;

var logger = new LoggerConfiguration()
    .WriteTo.File("log.txt")
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
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

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
app.ConfigureMiddlewares();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.UseHttpsRedirection();

app.Run();
