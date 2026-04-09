import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  CreditCard, 
  Fingerprint, 
  Building2, 
  Video, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  Camera,
  Loader2
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface KYCModuleProps {
  onComplete: () => void;
}

type KYCStep = 'PAN' | 'AADHAAR' | 'BANK' | 'VIDEO' | 'SUCCESS';

export default function KYCModule({ onComplete }: KYCModuleProps) {
  const [step, setStep] = useState<KYCStep>('PAN');
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleNext = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);

    if (step === 'PAN') setStep('AADHAAR');
    else if (step === 'AADHAAR') setStep('BANK');
    else if (step === 'BANK') setStep('VIDEO');
    else if (step === 'VIDEO') setStep('SUCCESS');
  };

  const startVideo = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const stopVideo = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-quipu-gold/10 border border-quipu-gold/20 text-quipu-gold text-[10px] font-bold uppercase tracking-widest mb-4">
          <ShieldCheck size={12} />
          SEBI Compliant KYC
        </div>
        <h2 className="text-3xl font-bold mb-2">Investor Verification</h2>
        <p className="text-quipu-cream/40 text-sm">Complete your one-time KYC to start investing across all 40+ AMCs in India.</p>
      </div>

      <div className="bg-quipu-forest/20 border border-quipu-sage/20 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 'PAN' && (
            <motion.div key="pan" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-quipu-gold/10 rounded-xl flex items-center justify-center text-quipu-gold">
                  <CreditCard size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">PAN Verification</h3>
                  <p className="text-xs text-quipu-cream/40">Step 1 of 4</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-quipu-cream/40">PAN Number</label>
                  <input 
                    type="text" 
                    placeholder="ABCDE1234F"
                    className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors uppercase font-mono"
                  />
                </div>
                <div className="p-4 bg-quipu-gold/5 border border-quipu-gold/10 rounded-xl flex gap-3">
                  <AlertCircle className="text-quipu-gold shrink-0" size={18} />
                  <p className="text-[11px] text-quipu-gold/80 leading-relaxed">
                    Your PAN will be verified against Income Tax Department records. Ensure the name matches your bank account.
                  </p>
                </div>
              </div>
              <button onClick={handleNext} disabled={loading} className="w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Verify PAN <ArrowRight size={18} /></>}
              </button>
            </motion.div>
          )}

          {step === 'AADHAAR' && (
            <motion.div key="aadhaar" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-quipu-gold/10 rounded-xl flex items-center justify-center text-quipu-gold">
                  <Fingerprint size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Aadhaar e-KYC</h3>
                  <p className="text-xs text-quipu-cream/40">Step 2 of 4</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-quipu-cream/40">Aadhaar Number</label>
                  <input 
                    type="text" 
                    placeholder="XXXX XXXX XXXX"
                    className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors font-mono"
                  />
                </div>
                <p className="text-[11px] text-quipu-cream/40 text-center">
                  An OTP will be sent to your Aadhaar-linked mobile number.
                </p>
              </div>
              <button onClick={handleNext} disabled={loading} className="w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Send OTP <ArrowRight size={18} /></>}
              </button>
            </motion.div>
          )}

          {step === 'BANK' && (
            <motion.div key="bank" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-quipu-gold/10 rounded-xl flex items-center justify-center text-quipu-gold">
                  <Building2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Bank Account Link</h3>
                  <p className="text-xs text-quipu-cream/40">Step 3 of 4</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-quipu-cream/40">Account Number</label>
                  <input type="text" className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-quipu-cream/40">IFSC Code</label>
                  <input type="text" className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors uppercase" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-quipu-cream/40">Account Type</label>
                  <select className="w-full bg-quipu-deep/50 border border-quipu-sage/30 rounded-xl px-4 py-3 focus:border-quipu-gold outline-none transition-colors">
                    <option>Savings</option>
                    <option>Current</option>
                  </select>
                </div>
              </div>
              <button onClick={handleNext} disabled={loading} className="w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2">
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Verify Account <ArrowRight size={18} /></>}
              </button>
            </motion.div>
          )}

          {step === 'VIDEO' && (
            <motion.div key="video" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-quipu-gold/10 rounded-xl flex items-center justify-center text-quipu-gold">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">In-Person Verification</h3>
                  <p className="text-xs text-quipu-cream/40">Step 4 of 4</p>
                </div>
              </div>
              
              <div className="relative aspect-video bg-quipu-deep rounded-2xl border border-quipu-sage/30 overflow-hidden flex items-center justify-center">
                {stream ? (
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-quipu-sage/20 rounded-full flex items-center justify-center mx-auto text-quipu-gold">
                      <Camera size={32} />
                    </div>
                    <button onClick={startVideo} className="text-xs font-bold text-quipu-gold uppercase tracking-widest hover:underline">Enable Camera</button>
                  </div>
                )}
                {stream && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/80 text-white text-[10px] font-bold rounded-full animate-pulse">
                    RECORDING LIVE
                  </div>
                )}
              </div>

              <div className="p-4 bg-quipu-forest/40 rounded-xl border border-quipu-sage/10">
                <p className="text-[11px] text-quipu-cream/60 leading-relaxed">
                  Please look into the camera and read the following code aloud:
                  <span className="block text-2xl font-bold text-quipu-gold mt-2 tracking-widest">8 4 2 9</span>
                </p>
              </div>

              <button 
                onClick={() => { stopVideo(); handleNext(); }} 
                disabled={loading || !stream} 
                className="w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <>Complete Video KYC <ArrowRight size={18} /></>}
              </button>
            </motion.div>
          )}

          {step === 'SUCCESS' && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-quipu-sage rounded-full flex items-center justify-center mx-auto text-white shadow-lg shadow-quipu-sage/20">
                <CheckCircle2 size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">KYC Verified Successfully</h3>
                <p className="text-quipu-cream/40 text-sm max-w-xs mx-auto">
                  Your profile is now SEBI-compliant. You can start investing in all Indian AMCs immediately.
                </p>
              </div>
              <button 
                onClick={onComplete}
                className="w-full py-4 bg-quipu-gold text-quipu-deep font-bold rounded-xl flex items-center justify-center gap-2"
              >
                Go to Dashboard <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
