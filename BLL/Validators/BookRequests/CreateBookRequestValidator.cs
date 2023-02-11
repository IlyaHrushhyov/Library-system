using BLL.Requests.BookController;
using FluentValidation;
using LibraryApi.Services.Infrastructure.Helpers;

namespace LibraryApi.Services.Validators.BookController
{
    public class CreateBookRequestValidator : AbstractValidator<CreateBookRequest>
    {
        public CreateBookRequestValidator()
        {
            RuleFor(x => x.Name)
                    .NotNull()
                    .WithMessage(ValidationMessageHelper.Null(nameof(CreateBookRequest.Name)));

            RuleFor(x => x.Name)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(CreateBookRequest.Name)))
                    .When(x => x.Name is not null);

            RuleFor(x => x.Year)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(CreateBookRequest.Year)))
                    .LessThan(p => DateTime.Now)
                    .WithMessage(ValidationMessageHelper.LessThan(nameof(CreateBookRequest.Year), DateTime.Now));

            RuleFor(x => x.AuthorId)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(CreateBookRequest.AuthorId)));

            RuleFor(x => x.GenreId)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(CreateBookRequest.AuthorId)));
        }
    }
}
