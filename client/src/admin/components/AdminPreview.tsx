import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminPreview() {
  return (
    <div className="w-1/2 border-l border-border bg-muted/20 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Live Preview</h3>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => window.open('/', '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            Open Full Site
          </Button>
        </div>
      </div>
      
      <div className="flex-1 bg-white dark:bg-gray-900 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <iframe
            src="/"
            className="w-full h-full border-0"
            title="Portfolio Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </motion.div>
        
        {/* Preview overlay for mobile responsiveness testing */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/10 backdrop-blur-sm border border-white/20 text-white hover:bg-black/20"
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.style.width = '375px'; // Mobile width
                iframe.style.height = '100%';
                iframe.style.margin = '0 auto';
              }
            }}
          >
            📱
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/10 backdrop-blur-sm border border-white/20 text-white hover:bg-black/20"
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.style.width = '768px'; // Tablet width
                iframe.style.height = '100%';
                iframe.style.margin = '0 auto';
              }
            }}
          >
            📄
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-black/10 backdrop-blur-sm border border-white/20 text-white hover:bg-black/20"
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.style.width = '100%'; // Desktop width
                iframe.style.height = '100%';
                iframe.style.margin = '0';
              }
            }}
          >
            💻
          </Button>
        </div>
      </div>
    </div>
  );
}