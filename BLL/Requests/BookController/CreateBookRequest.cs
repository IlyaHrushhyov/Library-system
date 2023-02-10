namespace BLL.Requests.BookController
{
    public class CreateBookRequest
    {
        public string Name { get; set; }

        public DateTime Year { get; set; }

        public Guid UserId { get; set; }

        public int AuthorId { get; set; }

        public int GenreId { get; set; }
    }
}
