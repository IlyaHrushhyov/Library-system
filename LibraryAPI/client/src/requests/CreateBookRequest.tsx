export default interface CreateBookRequest {
  name: string;
  year: number;
  userId: string;
  authorId: string;
  genreId: string;
}
