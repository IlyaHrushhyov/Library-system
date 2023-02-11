using FluentValidation;
using LibraryApi.Services.Infrastructure.Helpers;
using LibraryApi.Services.Requests.BookController;

namespace LibraryApi.Services.Validators.BookController
{
    public class GetUserBooksRequestValidator : AbstractValidator<GetUserBooksRequest>
    {
        public GetUserBooksRequestValidator()
        {
            RuleFor(x => x.Id)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(GetUserBooksRequest.Id)));
        }
    }
}
