// components/classroom/StreamTab.tsx
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/api";
import Link from "next/link";

interface StreamTabProps {
  classroomData: any;
}

interface StreamActivity {
  id: string;
  type: "topic" | "assignment" | "material" | "recording" | "announcement";
  title: string;
  description?: string;
  author?: {
    id: string;
    name: string;
    image: string | null;
  };
  createdAt: string;
  metadata?: {
    topicId?: string;
    assignmentId?: string;
    dueDate?: string;
    points?: number;
    fileUrl?: string;
    recordingUrl?: string;
  };
}

const StreamTab: React.FC<StreamTabProps> = ({ classroomData }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  // Fetch stream activities (combining topics, assignments, materials, recordings, and announcements)
  const { data: streamActivities, isLoading } = useQuery<StreamActivity[]>({
    queryKey: ["streamActivities", classroomData.cohortId],
    queryFn: async () => {
      const response = await api.get(`/api/stream/${classroomData.cohortId}/activities`);
      return response.data.activities;
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (postData: { title: string; content: string }) => {
      const response = await api.post(`/api/stream/${classroomData.cohortId}`, {
        ...postData,
        authorId: user?.id,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["streamActivities", classroomData.cohortId] });
      queryClient.invalidateQueries({ queryKey: ["streamPosts", classroomData.cohortId] });
      setNewPost({ title: "", content: "" });
    },
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title.trim() && newPost.content.trim()) {
      createPostMutation.mutate(newPost);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "topic":
        return "📂";
      case "assignment":
        return "📝";
      case "material":
        return "📎";
      case "recording":
        return "🎥";
      case "announcement":
        return "📢";
      default:
        return "📄";
    }
  };

  const getActivityAction = (type: string) => {
    switch (type) {
      case "topic":
        return "created a new topic";
      case "assignment":
        return "posted a new assignment";
      case "material":
        return "added new material";
      case "recording":
        return "added a recording";
      case "announcement":
        return "posted an announcement";
      default:
        return "posted";
    }
  };

  const renderActivityContent = (activity: StreamActivity) => {
    switch (activity.type) {
      case "assignment":
        return (
          <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-blue-900">{activity.title}</span>
              {activity.metadata?.dueDate && (
                <span className="text-sm text-blue-700">
                  Due: {new Date(activity.metadata.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
            {activity.description && (
              <p className="text-sm text-blue-800 mt-1">{activity.description}</p>
            )}
            {activity.metadata?.points && (
              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                {activity.metadata.points} points
              </span>
            )}
          </div>
        );
      
      case "material":
        return (
          <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
            <a
              href={activity.metadata?.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-green-900 hover:underline"
            >
              📎 {activity.title}
            </a>
            {activity.description && (
              <p className="text-sm text-green-800 mt-1">{activity.description}</p>
            )}
          </div>
        );
      
      case "recording":
        return (
          <div className="mt-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
            <a
              href={activity.metadata?.recordingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-purple-900 hover:underline"
            >
              🎥 {activity.title}
            </a>
            {activity.description && (
              <p className="text-sm text-purple-800 mt-1">{activity.description}</p>
            )}
          </div>
        );
      
      case "topic":
        return (
          <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="font-medium text-gray-900">{activity.title}</span>
            {activity.description && (
              <p className="text-sm text-gray-700 mt-1">{activity.description}</p>
            )}
          </div>
        );
      
      default:
        return (
          <div className="mt-2">
            <p className="text-gray-700 whitespace-pre-wrap">{activity.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Announcement (for admins) */}
      {(user?.role === "ADMIN" || user?.role === "COURSE_ADMIN") && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create Announcement</h3>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <textarea
                placeholder="What would you like to share with the class?"
                rows={4}
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createPostMutation.isPending}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {createPostMutation.isPending ? "Posting..." : "Post Announcement"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stream Activities */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">Loading activities...</div>
        ) : streamActivities?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
            <p className="text-gray-600">
              When your instructor posts topics, assignments, or materials, they'll appear here.
            </p>
          </div>
        ) : (
          streamActivities?.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-900">
                        {activity.author?.name || "Instructor"}
                      </span>
                      <span className="text-gray-500 ml-2">
                        {getActivityAction(activity.type)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(activity.createdAt).toLocaleDateString()} at{" "}
                      {new Date(activity.createdAt).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  
                  {renderActivityContent(activity)}

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mt-3 pt-3 border-t border-gray-100">
                    {activity.type === "assignment" && activity.metadata?.assignmentId && (
                      <Link
                        href={`/dashboard/assignments/${activity.metadata.assignmentId}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Assignment
                      </Link>
                    )}
                    
                    {activity.type === "topic" && activity.metadata?.topicId && (
                      <button
                        onClick={() => {
                          // You could implement scrolling to the topic in the Class tab
                          console.log("Navigate to topic:", activity.metadata?.topicId);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Topic
                      </button>
                    )}

                    {(activity.type === "material" || activity.type === "recording") && (
                      <a
                        href={activity.metadata?.fileUrl || activity.metadata?.recordingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Open {activity.type === "material" ? "Material" : "Recording"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StreamTab;