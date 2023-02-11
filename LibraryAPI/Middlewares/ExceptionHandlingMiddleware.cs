using LibraryApi.Services.Exceptions;
using System.Net;

namespace LibraryAPI.Middlewares
{
    public class ExceptionHandlingMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var exceptionDetails = new ExceptionDetails();
            switch (exception)
            {
                case NotFoundException:
                    exceptionDetails.StatusCode = (int)HttpStatusCode.NotFound;
                    break;

                case AlreadyExistingException:
                    exceptionDetails.StatusCode = (int)HttpStatusCode.BadRequest;
                    break;

                case UnauthorizedException:
                    exceptionDetails.StatusCode = (int)HttpStatusCode.Unauthorized;
                    break;

                default:
                    exceptionDetails.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            exceptionDetails.Message = exception.Message;
            exceptionDetails.StackTrace = exception.StackTrace;

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = exceptionDetails.StatusCode;
            await context.Response.WriteAsync(exceptionDetails.ToString());
        }
    }
}
