namespace LibraryApi.Services.Infrastructure.Helpers
{
    public static class ExceptionMessageHelper
    {
        public static string NotFound(Type type, string property, int value)
        {
            return $"{type.Name} has been not found by {property} = {value}";
        }

        public static string NotFound(Type type, string property, Guid value)
        {
            return $"{type.Name} has been not found by {property} = {value}";
        }

        public static string NotFound(Type type, string property, string value)
        {
            return $"{type.Name} has been not found by {property} = {value}";
        }

        public static string NotFound(Type type, Guid[] ids)
        {
            var idsValues = string.Join(",", ids.Select(i => i.ToString()).ToArray());
            return $"{type.Name} has been not found by ids = [{idsValues}]";
        }

        public static string Found(Type type, string property, string value)
        {
            return $"{type.Name} with {property} = {value} already exists";
        }

        public static string Unauthorized()
        {
            return $"Login or password is not valid";
        }
    }
}
