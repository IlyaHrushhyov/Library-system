export default interface UpdateBookRequest {
  id: string;
  name: string;
  year: number;
  userId: string;
  authorId: string;
  genreId: string;
}
