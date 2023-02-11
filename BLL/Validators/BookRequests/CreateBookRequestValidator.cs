using BLL.Requests.BookController;
using FluentValidation;
using LibraryApi.Services.Infrastructure.Helpers;
using LibraryApi.Services.Infrastructure.Providers;

namespace LibraryApi.Services.Validators.BookController
{
    public class CreateBookRequestValidator : AbstractValidator<CreateBookRequest>
    {
        private const int MinYearValue = 1;

        private readonly IDateTimeProvider _dateTimeProvider;
        
        public CreateBookRequestValidator(IDateTimeProvider dateTimeProvider)
        {
            _dateTimeProvider = dateTimeProvider;

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
                    .InclusiveBetween(MinYearValue, _dateTimeProvider.GetUtcNow().Year)
                    .WithMessage(ValidationMessageHelper.Between(nameof(CreateBookRequest.Year), MinYearValue, _dateTimeProvider.GetUtcNow().Year));

            RuleFor(x => x.AuthorId)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(CreateBookRequest.AuthorId)));

            RuleFor(x => x.GenreId)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(CreateBookRequest.AuthorId)));
        }
    }
}
