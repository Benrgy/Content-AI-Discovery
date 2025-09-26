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
  if (!content) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] overflow-y-auto p-6">
        <ContentDetailView content={content} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ContentDetailModal;