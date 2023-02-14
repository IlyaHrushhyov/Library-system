using BLL.Requests.BookController;
using FluentValidation;
using LibraryApi.Services.Infrastructure.Helpers;

namespace LibraryApi.Services.Validators.BookController
{
    public class DeleteBookRequestValidator : AbstractValidator<DeleteBookRequest>
    {
        public DeleteBookRequestValidator()
        {
            RuleFor(x => x.Ids)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(DeleteBookRequest.Ids)));
        }
    }
}
