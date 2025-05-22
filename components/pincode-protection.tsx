'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';

const CORRECT_PINCODE = '555556';

interface PincodeProtectionProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function PincodeProtection({ 
  children, 
  title = 'Access Required',
  description = 'Please enter the access code to continue.'
}: PincodeProtectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [pincode, setPincode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user already authenticated this session
    const isAuth = sessionStorage.getItem('pincode-authenticated') === 'true';
    if (isAuth) {
      setIsAuthenticated(true);
      setIsOpen(false);
    }
  }, []);

  const handleSubmit = () => {
    if (pincode === CORRECT_PINCODE) {
      setIsAuthenticated(true);
      setIsOpen(false);
      setError('');
      sessionStorage.setItem('pincode-authenticated', 'true');
    } else {
      setError('Incorrect access code. Please try again.');
      setPincode('');
    }
  };

  const handlePincodeChange = (value: string) => {
    setPincode(value);
    setError('');
    
    // Auto-submit when 6 digits are entered
    if (value.length === 6) {
      setTimeout(() => {
        if (value === CORRECT_PINCODE) {
          setIsAuthenticated(true);
          setIsOpen(false);
          setError('');
          sessionStorage.setItem('pincode-authenticated', 'true');
        } else {
          setError('Incorrect access code. Please try again.');
          setPincode('');
        }
      }, 100);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4">
            <InputOTP
              maxLength={6}
              value={pincode}
              onChange={handlePincodeChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}
            
            <Button 
              onClick={handleSubmit}
              disabled={pincode.length !== 6}
              className="w-full"
            >
              Access
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Blocked content placeholder */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h1>
          <p className="text-gray-600">Please enter the access code to continue.</p>
        </div>
      </div>
    </>
  );
}