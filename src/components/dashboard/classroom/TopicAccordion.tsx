import Link from "next/link";

interface TopicAccordionProps {
  topic: any;
  isExpanded: boolean;
  onToggle: () => void;
}

const TopicAccordion: React.FC<TopicAccordionProps> = ({ topic, isExpanded, onToggle }) => {
  const getItemIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return "📝";
      case "material":
        return "📎";
      case "recording":
        return "🎥";
      default:
        return "📄";
    }
  };

  const getItemType = (item: any) => {
    if (item.dueDate) return "assignment";
    if (item.recordingUrl) return "recording";
    if (item.fileUrl) return "material";
    return "material";
  };

  // Combine all subs from different types
  const allSubs = [
    ...(topic.assignments || []).map((a: any) => ({ ...a, type: "assignment" })),
    ...(topic.classMaterials || []).map((m: any) => ({ ...m, type: "material" })),
    ...(topic.classRecordings || []).map((r: any) => ({ ...r, type: "recording" })),
  ].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Topic Header */}
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-lg"
      >
        <div className="flex items-center space-x-3">
          {topic.isPinned && <span className="text-yellow-500">📌</span>}
          <div>
            <h3 className="font-semibold text-gray-900">{topic.title}</h3>
            {topic.description && (
              <p className="text-sm text-gray-600 mt-1">{topic.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            {allSubs.length} {allSubs.length === 1 ? "item" : "items"}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Topic Content */}
      {isExpanded && (
        <div className="px-6 pb-4 border-t border-gray-200">
          <div className="space-y-3 mt-4">
            {allSubs.length === 0 ? (
              <p className="text-gray-500 text-sm py-2">No items in this topic yet.</p>
            ) : (
              allSubs.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                  <span className="text-lg">{getItemIcon(item.type)}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        {item.type === "assignment" ? (
                          <Link
                            href={`/dashboard/assignments/${item.id}`}
                            className="hover:text-red-600"
                          >
                            {item.title}
                          </Link>
                        ) : (
                          <a
                            href={item.fileUrl || item.recordingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-red-600"
                          >
                            {item.title}
                          </a>
                        )}
                      </h4>
                      {item.dueDate && (
                        <span className="text-xs text-gray-500">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicAccordion;