import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score?: number;
  completedAt?: string;
}

interface UserProgress {
  lessonsCompleted: LessonProgress[];
  totalScore: number;
  level: string;
  badges: string[];
}

interface ProgressContextType {
  progress: UserProgress;
  completeLesson: (lessonId: string, score?: number) => void;
  addBadge: (badge: string) => void;
  resetProgress: () => void;
}

const defaultProgress: UserProgress = {
  lessonsCompleted: [],
  totalScore: 0,
  level: "Beginner",
  badges: [],
};

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem("userProgress");
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem("userProgress", JSON.stringify(progress));
  }, [progress]);

  const completeLesson = (lessonId: string, score: number = 100) => {
    setProgress((prev) => {
      const existing = prev.lessonsCompleted.find(
        (l) => l.lessonId === lessonId
      );

      if (existing) {
        // Update existing lesson
        return {
          ...prev,
          lessonsCompleted: prev.lessonsCompleted.map((l) =>
            l.lessonId === lessonId
              ? { ...l, score, completedAt: new Date().toISOString() }
              : l
          ),
          totalScore: prev.totalScore + (score - (existing.score || 0)),
        };
      } else {
        // Add new completed lesson
        return {
          ...prev,
          lessonsCompleted: [
            ...prev.lessonsCompleted,
            {
              lessonId,
              completed: true,
              score,
              completedAt: new Date().toISOString(),
            },
          ],
          totalScore: prev.totalScore + score,
        };
      }
    });
  };

  const addBadge = (badge: string) => {
    setProgress((prev) => {
      if (prev.badges.includes(badge)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badge],
      };
    });
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem("userProgress");
  };

  return (
    <ProgressContext.Provider
      value={{ progress, completeLesson, addBadge, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
