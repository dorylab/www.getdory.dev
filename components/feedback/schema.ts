export type PageFeedback = {
  opinion: "good" | "bad";
  url: string;
  message: string;
};

export type ActionResponse = {
  githubUrl?: string;
};
