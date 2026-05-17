export interface Slide {
  id: number;
  tag: string;
  headline: string;
  sub: string;
  code: string | null;
  accent: string;
  pros?: string[];
  cons?: string[];
}