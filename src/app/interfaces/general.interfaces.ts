export interface Course {
  title: string;
  description: string;
  dateUploaded: Date;
  url: string;
}

export interface MainCourse extends Course {}
export interface MicroCourse extends Course {}

export interface Badge {
  courseName: string;
  score: number;
  date: Date;
}