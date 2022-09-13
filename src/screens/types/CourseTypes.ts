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
  role: "STUDENT" | "AMBASSADOR" | "RETHINKER";
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
  courseId?: string;
  lessons?: Lesson[];
  blocked?: boolean;
  completed?: boolean;
}

interface Lesson {
  id: string;
  name: string;
  embedUrl: string;
  description: string;
  moduleId: string;
}

interface CourseResponse {
  id: string;
  name: string;
  description: string;
  workload: number;
  learning: string;
  skills: string;
  trailId: string;
  level: "LOW" | "MEDIUM" | "HIGH";
  courseStyle: "COURSE" | "WORKSHOP" | "TRAINING" | "LECTURE";
  modules?: Module[];
  teacherName: string;
  teacherDescription: string;
  imageTeacher: string;
}

interface UserProgressResponse {
  userName: string;
  userImage: string;
  completedModules: string[];
}
interface CourseProgressResponse {
  id: string;
  name: string;
  modules: ModuleProgressResponse[];
}
interface ModuleProgressResponse {
  id: string;
  courseId: string;
  lessons: [
    {
      id: string;
      moduleId: string;
    }
  ];
}

type Modal = "ADD" | "EDIT" | "DELETE";
type Validation = "SAVE" | "DELETE";

export type {
  UserLessons,
  Modal,
  Validation,
  Profile,
  UserResponse,
  Trail,
  Module,
  Lesson,
  CourseResponse,
  UserProgressResponse,
  CourseProgressResponse,
};
