using FluentValidation;
using LibraryApi.Services.Infrastructure.Helpers;
using LibraryApi.Services.Requests.AuthController;

namespace LibraryApi.Services.Validators.AuthRequests
{
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        private const int MinPasswordLength = 6;
        private const int MinLoginLength = 6;

        public RegisterRequestValidator()
        {
            RuleFor(x => x.FullName)
                     .NotNull()
                     .WithMessage(ValidationMessageHelper.Null(nameof(RegisterRequest.FullName)));

            RuleFor(x => x.FullName)
                     .NotEmpty()
                     .WithMessage(ValidationMessageHelper.Empty(nameof(RegisterRequest.FullName)));

            RuleFor(x => x.Login)
                     .NotEmpty()
                     .WithMessage(ValidationMessageHelper.Empty(nameof(RegisterRequest.Login)))
                     .MinimumLength(MinLoginLength)
                     .WithMessage(ValidationMessageHelper.MinLength(nameof(RegisterRequest.Login), MinLoginLength))
                     .When(x => x.Login is not null);

            RuleFor(x => x.Login)
                     .NotNull()
                     .WithMessage(ValidationMessageHelper.Null(nameof(RegisterRequest.Login)));

            RuleFor(x => x.Password)
                    .NotNull()
                    .WithMessage(ValidationMessageHelper.Null(nameof(RegisterRequest.Password)));

            RuleFor(x => x.Password)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(RegisterRequest.Password)))
                    .MinimumLength(MinPasswordLength)
                    .WithMessage(ValidationMessageHelper.MinLength(nameof(RegisterRequest.Password), MinPasswordLength));
        }
    }
}
