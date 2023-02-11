namespace LibraryApi.Services.Infrastructure.Helpers
{
    public static class ValidationMessageHelper
    {
        public static string Null(string propertyName)
        {
            return $"{propertyName} should not be null";
        }

        public static string Empty(string propertyName)
        {
            return $"{propertyName} should not be empty";
        }

        public static string Between(string propertyName, int beginValue, int endValue)
        {
            return $"{propertyName} should be inclusively between {beginValue} and {endValue}";
        }

        public static string MinLength(string propertyName, int minLength)
        {
            return $"{propertyName} length should be not less than {minLength}";
        }
    }
}
