namespace BLL.Requests.BookController
{
    public class UpdateBookRequest
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public string Name { get; set; }

        public int Year { get; set; }

        public int AuthorId { get; set; }

        public int GenreId { get; set; }
    }
}
