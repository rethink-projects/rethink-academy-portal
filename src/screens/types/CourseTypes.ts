interface UserLessons {
  completed: boolean;
  id: string;
  lessonsLength: number;
  name: string;
  trail: Trail;
  userLessonsLength: number;
  courseStyle: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
}

interface Profile {
  id: string;
  bio: string;
  avatar: string;
  social: JSON;
  userId: string;
}

interface UserResponse {
  id: string;
  email: string;
  name: string;
  surname: string;
  main: string;
  watched: string[];
  role: "STUDENT" | "EMBASSADOR" | "RETHINKER";
  profile?: Profile;
  course: CourseResponse[];
}

interface Trail {
  id: string;
  name: string;
  description: string;
  weight: number;
  course?: CourseResponse[];
  imageUrl: string;
  main: string;
}

interface Module {
  id: string;
  name: string;
  courseId: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  name: string;
  embedUrl: string;
  order: number;
  description: string;
  moduleId: string;
}

interface CourseResponse {
  id: string;
  name: string;
  description: string;
  level: "LOW" | "MEDIUM" | "HIGH";
  workload: number;
  learning: string;
  skills: string;
  trailId: string;
  modules: Module[];
  teacherName: string;
  teacherDescription: string;
  imageTeacher: string;
  courseStyle: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
}

interface UserProgressResponse {
  userName: string;
  userImage: string;
  completedModules: string[];
}
type CourseProgressResponse = {
  id: string;
  name: string;
  modules: ModuleProgressResponse[];
};
type ModuleProgressResponse = {
  id: string;
  courseId: string;
  lessons: [
    {
      id: string;
      moduleId: string;
    }
  ];
};

export type {
  UserLessons,
  Profile,
  UserResponse,
  Trail,
  Module,
  Lesson,
  CourseResponse,
  UserProgressResponse,
  CourseProgressResponse,
};
