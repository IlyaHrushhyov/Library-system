namespace DAL.Models
{
    public class Book
    {
        public Guid Id { get; set; }

        public int AuthorId { get; set; }

        public int GenreId { get; set; }

        public Guid UserId { get; set; }

        public string Name { get; set; }

        public DateTime Year { get; set; }
    }
}
