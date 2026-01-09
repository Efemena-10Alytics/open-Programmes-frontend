import { Suspense } from 'react'
import Courses from '@/components/pages/Courses'

function CoursesFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-white"></div>
        </div>
        <h1 className="text-2xl font-bold text-blue-600 mb-2">Loading...</h1>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<CoursesFallback />}>
      <Courses />
    </Suspense>
  )
}