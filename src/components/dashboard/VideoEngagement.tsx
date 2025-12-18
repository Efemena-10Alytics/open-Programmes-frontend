import { SetStateAction, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import api from "../../lib/api";
import { format } from "date-fns";
import Loader from "../utilities/Loader";
import { Input } from "./input"; 

interface VideoEngagement {
  id: string;
  title: string;
  duration: string;
  thumbnailUrl: string;
  moduleTitle: string;
  weekTitle: string;
  isCompleted: boolean;
  lastWatched: Date;
}

interface VideoEngagementProps {
  courseId: string;
  studentId: string;
}

export const VideoEngagement = ({
  courseId,
  studentId,
}: VideoEngagementProps) => {
  const [videoEngagement, setVideoEngagement] = useState<VideoEngagement[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoEngagement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideoEngagement = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `/api/engagement/${studentId}/course/${courseId}/videos`
        );
        setVideoEngagement(response.data);
        setFilteredVideos(response.data);
      } catch (error) {
        console.error("Error fetching user's video engagement:", error);
        setError("Failed to load user's video engagement data");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && studentId) {
      fetchVideoEngagement();
    }
  }, [courseId, studentId]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredVideos(videoEngagement);
    } else {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = videoEngagement.filter(
        (video) =>
          video.title.toLowerCase().includes(lowercasedSearch) ||
          video.moduleTitle.toLowerCase().includes(lowercasedSearch) ||
          video.weekTitle.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredVideos(filtered);
    }
  }, [searchTerm, videoEngagement]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!videoEngagement.length) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        No video engagement data found
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Videos Watched by Student</h3>
        <div className="w-64">
          <Input
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableCaption>Detailed view of student's video progress</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Video Title</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Week</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Watched</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <TableRow key={video.id}>
                <TableCell className="font-medium">{video.title}</TableCell>
                <TableCell>{video.moduleTitle}</TableCell>
                <TableCell>{video.weekTitle}</TableCell>
                <TableCell>
                  {video.isCompleted ? (
                    <span className="text-green-500">Completed</span>
                  ) : (
                    <span className="text-yellow-500">In Progress</span>
                  )}
                </TableCell>
                <TableCell>
                  {format(new Date(video.lastWatched), "MMM d, yyyy h:mm a")}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                No videos match your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {filteredVideos.length > 0 && (
        <div className="text-sm text-gray-500 mt-2">
          Showing {filteredVideos.length} of {videoEngagement.length} videos
        </div>
      )}
    </div>
  );
};