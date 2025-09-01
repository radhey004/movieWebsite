export interface Movie {
  id: number;
  name: string;        // TVmaze uses "name" instead of "title"
  summary: string;     // Instead of "overview"
  premiered: string;   // Instead of "release_date"
  image: { medium: string; original: string } | null;
  rating: { average: number | null };
}
