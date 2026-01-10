"use client";

interface CourseHeaderProps {
  courseTitle: string;
  totalLessons: number;
  completedLessons: number;
  currentModule: string;
}

export default function CourseHeader({
  courseTitle,
  totalLessons,
  completedLessons,
  currentModule,
}: CourseHeaderProps) {
  const progressPercentage = Math.round(
    (completedLessons / totalLessons) * 100
  );

  return (
    <div className="bg-gradient-to-r from-[#1B5E20] to-green-900 text-white px-6 lg:px-8 py-6 border-b border-green-800">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">{courseTitle}</h1>
          <p className="text-green-100 text-sm mb-3">{currentModule}</p>

          {/* Progress Bar */}
          <div className="w-full bg-green-800 rounded-full h-2">
            <div
              className="bg-green-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-xs text-green-100 mt-1">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        {/* Progress Circle */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="rgba(27, 94, 32, 0.2)"
                strokeWidth="4"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                fill="none"
                stroke="#4ade80"
                strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${
                  2 * Math.PI * 36 * (1 - progressPercentage / 100)
                }`}
                className="transition-all duration-300"
              />
            </svg>
            <span className="absolute text-center">
              <span className="text-2xl font-bold">{progressPercentage}%</span>
            </span>
          </div>
          <p className="text-xs text-green-100 text-center">Progress</p>
        </div>
      </div>
    </div>
  );
}
