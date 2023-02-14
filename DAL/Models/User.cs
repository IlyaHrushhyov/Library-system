namespace DAL.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string FullName { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }
    }
}
