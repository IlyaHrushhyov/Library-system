namespace BLL.Requests.BookController
{
    public class CreateBookRequest
    {
        public string Name { get; set; }

        public int Year { get; set; }

        public Guid UserId { get; set; }

        public int AuthorId { get; set; }

        public int GenreId { get; set; }
    }
}
