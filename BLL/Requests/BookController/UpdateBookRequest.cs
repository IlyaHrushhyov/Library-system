namespace BLL.Requests.BookController
{
    public class UpdateBookRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Year { get; set; }
        public int AuthorId { get; set; }
        public int GenreId { get; set; }
    }
}
