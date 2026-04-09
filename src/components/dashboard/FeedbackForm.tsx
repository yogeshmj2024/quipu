import React, { useState } from 'react';
import { Star, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface FeedbackFormProps {
  onSubmit: (rating: number, comment: string) => void;
  existingFeedback?: { rating: number; comment: string };
}

export default function FeedbackForm({ onSubmit, existingFeedback }: FeedbackFormProps) {
  const [rating, setRating] = useState(existingFeedback?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(existingFeedback?.comment || '');
  const [isSubmitted, setIsSubmitted] = useState(!!existingFeedback);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit(rating, comment);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-quipu-sage/10 border border-quipu-sage/30 p-8 rounded-3xl text-center space-y-4"
      >
        <div className="w-12 h-12 bg-quipu-sage rounded-full flex items-center justify-center mx-auto text-white">
          <CheckCircle2 size={24} />
        </div>
        <h3 className="text-xl font-bold text-quipu-gold">Thank you for your feedback!</h3>
        <p className="text-quipu-cream/60 text-sm max-w-sm mx-auto">
          Your input helps Quipu evolve into a more intelligent and personalized financial guru.
        </p>
        <div className="pt-4 flex justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={20} 
              className={cn(star <= rating ? "fill-quipu-gold text-quipu-gold" : "text-quipu-cream/20")} 
            />
          ))}
        </div>
        {comment && (
          <p className="text-sm italic text-quipu-cream/40 px-6">"{comment}"</p>
        )}
      </motion.div>
    );
  }

  return (
    <div className="bg-quipu-forest/20 border border-quipu-sage/20 p-8 rounded-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-quipu-gold/10 rounded-lg flex items-center justify-center text-quipu-gold">
          <MessageSquare size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold">Rate this Recommendation</h3>
          <p className="text-xs text-quipu-cream/40 uppercase tracking-wider">Help us improve the AI Guru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-quipu-cream/40">Overall Satisfaction</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={32} 
                  className={cn(
                    "transition-colors",
                    (hoveredRating || rating) >= star 
                      ? "fill-quipu-gold text-quipu-gold" 
                      : "text-quipu-cream/20"
                  )} 
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-quipu-cream/40">Additional Comments</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you think about the AI's suggestions? Was the justification clear?"
            className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors min-h-[100px] text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={rating === 0}
          className="w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-quipu-gold/90 transition-all disabled:opacity-50"
        >
          Submit Feedback
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
