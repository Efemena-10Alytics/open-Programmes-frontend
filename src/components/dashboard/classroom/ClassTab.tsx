"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/api";
import TopicAccordion from "./TopicAccordion";


interface ClassTabProps {
  classroomData: any;
}

const ClassTab: React.FC<ClassTabProps> = ({ classroomData }) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const { data: topics, isLoading } = useQuery({
    queryKey: ["classroomTopics", classroomData.cohortId],
    queryFn: async () => {
      const response = await api.get(`/api/classroom/${classroomData.cohortId}/topics`);
      return response.data.topics;
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading topics...</div>;
  }

  // Sort topics: pinned first, then by order/date
  const sortedTopics = topics?.sort((a: any, b: any) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedTopics?.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No topics yet. Your instructor will add learning materials soon.
        </div>
      ) : (
        sortedTopics?.map((topic: any) => (
          <TopicAccordion
            key={topic.id}
            topic={topic}
            isExpanded={expandedTopic === topic.id}
            onToggle={() => setExpandedTopic(expandedTopic === topic.id ? null : topic.id)}
          />
        ))
      )}
    </div>
  );
};

export default ClassTab;