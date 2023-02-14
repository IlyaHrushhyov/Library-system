using FluentValidation;
using LibraryApi.Services.Infrastructure.Helpers;
using LibraryApi.Services.Requests.AuthController;

namespace LibraryApi.Services.Validators.AuthRequests
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Login)
                     .NotNull()
                     .WithMessage(ValidationMessageHelper.Null(nameof(LoginRequest.Login)));

            RuleFor(x => x.Login)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(LoginRequest.Login)))
                    .When(x => x.Login is not null);

            RuleFor(x => x.Password)
                    .NotNull()
                    .WithMessage(ValidationMessageHelper.Null(nameof(LoginRequest.Password)));

            RuleFor(x => x.Password)
                    .NotEmpty()
                    .WithMessage(ValidationMessageHelper.Empty(nameof(LoginRequest.Password)));
        }
    }
}
