using BLL.Requests.BookController;
using FluentValidation;
using LibraryApi.Services.Infrastructure.Helpers;

namespace LibraryApi.Services.Validators.BookRequests
{
    public class UpdateBookRequestValidator : AbstractValidator<UpdateBookRequest>
    {
        public UpdateBookRequestValidator()
        {
            RuleFor(x => x.Name)
                     .NotNull()
                     .WithMessage(ValidationMessageHelper.Null(nameof(UpdateBookRequest.Name)));

            RuleFor(x => x.Name)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(UpdateBookRequest.Name)))
                    .When(x => x.Name is not null);

            RuleFor(x => x.Year)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(UpdateBookRequest.Year)))
                    .LessThan(p => DateTime.Now)
                    .WithMessage(ValidationMessageHelper.LessThan(nameof(UpdateBookRequest.Year), DateTime.Now));

            RuleFor(x => x.Id)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(UpdateBookRequest.Id)));

            RuleFor(x => x.AuthorId)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(UpdateBookRequest.AuthorId)));

            RuleFor(x => x.GenreId)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(UpdateBookRequest.AuthorId)));
        }
    }
}
