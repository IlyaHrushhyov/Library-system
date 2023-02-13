export default interface UpdateBookRequest {
  id: number;
  name: string;
  year: number;
  authorId: number;
  genreId: number;
}
