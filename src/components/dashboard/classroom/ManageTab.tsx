"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import api from "../../../lib/api";
import CreateTopicModal from "./CreateTopicModal";
import AddSubItemModal from "./AddSubItemModal";
import BatchAddItemModal from "./BatchAddItemModal";
import BatchCreateTopicModal from "./BatchCreateTopicModal";

interface ManageTabProps {
  classroomData: any;
}

const ManageTab: React.FC<ManageTabProps> = ({ classroomData }) => {
  const queryClient = useQueryClient();
  const [showCreateTopic, setShowCreateTopic] = useState(false);
  const [showBatchCreateTopic, setShowBatchCreateTopic] = useState(false);
  const [showAddSubItem, setShowAddSubItem] = useState<string | null>(null);
  const [showBatchAddItem, setShowBatchAddItem] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(classroomData.cohortId);

  const { data: cohorts, isLoading: cohortsLoading } = useQuery({
    queryKey: ["adminCohorts"],
    queryFn: async () => {
      const response = await api.get("/api/cohorts");
      return response.data.data;
    },
  });

  const { data: topics, isLoading: topicsLoading } = useQuery({
    queryKey: ["manageTopics", selectedCohort],
    queryFn: async () => {
      const response = await api.get(`/api/classroom/${selectedCohort}/topics`);
      return response.data.topics;
    },
    enabled: !!selectedCohort,
  });

  const pinTopicMutation = useMutation({
    mutationFn: async ({
      topicId,
      pinned,
    }: {
      topicId: string;
      pinned: boolean;
    }) => {
      const response = await api.patch(`/api/classroom/topics/${topicId}`, {
        isPinned: pinned,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manageTopics", selectedCohort],
      });
    },
  });

  const deleteTopicMutation = useMutation({
    mutationFn: async (topicId: string) => {
      await api.delete(`/api/classroom/topics/${topicId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manageTopics", selectedCohort],
      });
    },
  });

  const deleteSubItemMutation = useMutation({
    mutationFn: async ({ type, id }: { type: string; id: string }) => {
      await api.delete(`/api/classroom/${type}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manageTopics", selectedCohort],
      });
    },
  });

  return (
    <div className="space-y-6">
      {/* Cohort Selector */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Manage Classroom
            </h3>
            <p className="text-gray-600">Select a cohort to manage</p>
          </div>
          <div className="relative">
            {cohortsLoading ? (
              <div className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-500 text-sm">
                  Loading cohorts...
                </span>
              </div>
            ) : (
              <select
                value={selectedCohort}
                onChange={(e) => setSelectedCohort(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {cohorts?.map((cohort: any) => (
                  <option key={cohort.id} value={cohort.id}>
                    {cohort.name} - {cohort.course?.title}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Single Cohort Actions
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowCreateTopic(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                + Create Topic
              </button>
              <button
                onClick={() => {
                  if (topics && topics.length > 0) {
                    setShowAddSubItem(topics[0].id);
                  } else {
                    alert("Create a topic first before adding items");
                  }
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              >
                + Add Item
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">
              Multiple Cohort Actions
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowBatchCreateTopic(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                📋 Create Topic (Multiple)
              </button>
              <button
                onClick={() => setShowBatchAddItem(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                📦 Add Item (Multiple)
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Selected Cohort</p>
              <p className="font-medium text-gray-900">
                {cohorts?.find((c: any) => c.id === selectedCohort)?.name ||
                  "None"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Topics in Cohort</p>
              <p className="font-medium text-gray-900">
                {topicsLoading ? "Loading..." : topics?.length || 0}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Available Cohorts</p>
              <p className="font-medium text-gray-900">
                {cohortsLoading ? "Loading..." : cohorts?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {topicsLoading ? (
          <div className="text-center py-8">
            <div className="inline-block">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-500">Loading topics...</p>
            </div>
          </div>
        ) : topics?.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
            <div className="text-gray-400 mb-3">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No topics yet
            </h3>
            <p className="text-gray-600 mb-4">
              Create your first topic to get started
            </p>
            <button
              onClick={() => setShowCreateTopic(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Create First Topic
            </button>
          </div>
        ) : (
          topics?.map((topic: any) => (
            <div
              key={topic.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {topic.isPinned && (
                      <span
                        className="inline-block text-yellow-500"
                        title="Pinned"
                      >
                        📌
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {topic.title}
                    </h3>
                    {topic.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                        {topic.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center">
                        <span className="mr-1">📝</span>
                        {topic.assignments?.length || 0} assignments
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">📎</span>
                        {topic.classMaterials?.length || 0} materials
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">🎥</span>
                        {topic.classRecordings?.length || 0} recordings
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      pinTopicMutation.mutate({
                        topicId: topic.id,
                        pinned: !topic.isPinned,
                      })
                    }
                    className={`p-2 rounded transition-colors ${
                      topic.isPinned
                        ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    title={topic.isPinned ? "Unpin topic" : "Pin topic"}
                    disabled={pinTopicMutation.isPending}
                  >
                    📌
                  </button>
                  <button
                    onClick={() => setShowAddSubItem(topic.id)}
                    className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-colors"
                    title="Add item to this topic"
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      if (
                        confirm(
                          `Are you sure you want to delete "${topic.title}"? This will also delete all assignments, materials, and recordings in this topic.`
                        )
                      ) {
                        deleteTopicMutation.mutate(topic.id);
                      }
                    }}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                    title="Delete topic"
                    disabled={deleteTopicMutation.isPending}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Sub Items Management */}
              {topic.assignments?.length > 0 ||
              topic.classMaterials?.length > 0 ||
              topic.classRecordings?.length > 0 ? (
                <div className="space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Items in this topic:
                  </h4>
                  <div className="space-y-2">
                    {[
                      ...(topic.assignments?.map((a: any) => ({
                        ...a,
                        type: "assignment",
                      })) || []),
                      ...(topic.classMaterials?.map((m: any) => ({
                        ...m,
                        type: "material",
                      })) || []),
                      ...(topic.classRecordings?.map((r: any) => ({
                        ...r,
                        type: "recording",
                      })) || []),
                    ].map((item: any) => (
                      <div
                        key={item.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                          <span className="text-lg">
                            {item.type === "assignment"
                              ? "📝"
                              : item.type === "material"
                                ? "📎"
                                : "🎥"}
                          </span>
                          <div>
                            <span className="font-medium text-gray-900">
                              {item.title}
                            </span>
                            {item.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* View Submissions Button - Only for assignments */}
                          {item.type === "assignment" && (
                            <Link
                              href={`/dashboard/assignments/${item.id}/submissions`}
                              className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors whitespace-nowrap"
                            >
                              View Submissions
                            </Link>
                          )}
                          <button
                            onClick={() => {
                              if (confirm(`Delete this ${item.type}?`)) {
                                deleteSubItemMutation.mutate({
                                  type:
                                    item.type === "assignment"
                                      ? "assignments"
                                      : item.type === "material"
                                        ? "materials"
                                        : "recordings",
                                  id: item.id,
                                });
                              }
                            }}
                            className="text-red-600 hover:text-red-800 text-sm px-2 py-1 hover:bg-red-50 rounded transition-colors"
                            disabled={deleteSubItemMutation.isPending}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500">
                    No items in this topic yet. Click the + button to add one.
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modals */}
      {showBatchCreateTopic && (
        <BatchCreateTopicModal
          isOpen={showBatchCreateTopic}
          onClose={() => setShowBatchCreateTopic(false)}
          onSuccess={() => {
            setShowBatchCreateTopic(false);
            queryClient.invalidateQueries({
              queryKey: ["manageTopics"],
            });
          }}
          cohorts={cohorts || []}
        />
      )}

      {showBatchAddItem && (
        <BatchAddItemModal
          isOpen={showBatchAddItem}
          onClose={() => setShowBatchAddItem(false)}
          onSuccess={() => {
            setShowBatchAddItem(false);
            queryClient.invalidateQueries({
              queryKey: ["manageTopics"],
            });
          }}
        />
      )}

      {showCreateTopic && (
        <CreateTopicModal
          cohortId={selectedCohort}
          onClose={() => setShowCreateTopic(false)}
          onSuccess={() => {
            setShowCreateTopic(false);
            queryClient.invalidateQueries({
              queryKey: ["manageTopics", selectedCohort],
            });
          }}
        />
      )}

      {showAddSubItem && (
        <AddSubItemModal
          topicId={showAddSubItem}
          cohortCourseId={selectedCohort}
          onClose={() => setShowAddSubItem(null)}
          onSuccess={() => {
            setShowAddSubItem(null);
            queryClient.invalidateQueries({
              queryKey: ["manageTopics", selectedCohort],
            });
          }}
        />
      )}

      {/* Loading States */}
      {(pinTopicMutation.isPending ||
        deleteTopicMutation.isPending ||
        deleteSubItemMutation.isPending) && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Processing...</span>
        </div>
      )}
    </div>
  );
};

export default ManageTab;
