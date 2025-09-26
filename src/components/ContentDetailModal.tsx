"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContentDetailView from "./ContentDetailView";
import { ContentItem } from "@/types/content";

interface ContentDetailModalProps {
  content: ContentItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const ContentDetailModal = ({ content, isOpen, onClose }: ContentDetailModalProps) => {
  console.log("ContentDetailModal: Component rendering");
  
  if (!content) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
        <div className="p-6">
          <ContentDetailView content={content} onClose={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContentDetailModal;