import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <div className="text-8xl font-light text-primary mb-4">404</div>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-2xl font-semibold mb-4">
              Oops! This page got lost in the code.
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Don't worry, even the best developers encounter 404 errors. 
              Let's get you back to exploring the good stuff.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="flex items-center gap-2"
                data-testid="button-go-back"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button
                onClick={() => window.location.href = '/'}
                className="flex items-center gap-2"
                data-testid="button-home"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
          </motion.div>
        </Card>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xs text-muted-foreground mt-6"
        >
          Error 404 - The page you're looking for doesn't exist
        </motion.p>
      </motion.div>
    </div>
  );
}