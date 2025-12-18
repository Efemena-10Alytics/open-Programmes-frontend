// types.ts
export interface Quiz {
    id: string;
    question: string;
    moduleId: string;
    answers: QuizAnswer[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface QuizAnswer {
    id: string;
    name: string;
    isCorrect: boolean;
    quizId: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface BlogImage {
  id: string;
  url: string;
  blogId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogModel {
  tags: any;
  id: string;
  title: string;
  content: string;
  images: BlogImage[];
  mins_read: string;
  createdAt: string;
  updatedAt: string;
}