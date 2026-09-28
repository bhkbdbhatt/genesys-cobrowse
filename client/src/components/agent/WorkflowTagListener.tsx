import React, { useEffect } from 'react';
import { Tag } from 'lucide-react';

interface WorkflowTagListenerProps {
    tags: string[];
    autoTriggerTag: string;
    onTagMatched: () => void;
}

export const WorkflowTagListener: React.FC<WorkflowTagListenerProps> = ({
    tags,
    autoTriggerTag,
    onTagMatched,
}) => {
    useEffect(() => {
        if (tags.includes(autoTriggerTag)) {
            onTagMatched();
        }
    }, [tags, autoTriggerTag, onTagMatched]);

    return (
        <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-indigo-400" />
            Auto-trigger tag active: <code className="text-indigo-300">{autoTriggerTag}</code>
        </div>
    );
};