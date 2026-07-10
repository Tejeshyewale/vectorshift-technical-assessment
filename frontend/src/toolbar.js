// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-title">Pipeline Builder</div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='api' label='API Call' />
                <DraggableNode type='timer' label='Delay' />
                <DraggableNode type='conditional' label='Conditional' />
            </div>
        </div>
    );
};
