'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { activateUser } from '@/lib/api/auth';
import { EActivationStatus } from '@/lib/constants/auth';
import { getActivationConfig } from '@/lib/config/activation';

export default function ActivatePage() {
  const [status, setStatus] = useState<EActivationStatus>(EActivationStatus.LOADING);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  useEffect(() => {
    const fetchActivation = async () => {
      if (!token) return setStatus(EActivationStatus.ERROR);
      try {
        await activateUser(token);
        setStatus(EActivationStatus.SUCCESS);
      } catch {
        setStatus(EActivationStatus.ERROR);
      }
    };
    setTimeout(() => fetchActivation(), 2000);
  }, [token]);

  const { icon, title, description, button, bg } = getActivationConfig(status, router);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card
        className={`shadow-md border border-border/40 ${bg} backdrop-blur-sm text-center p-8 md:p-10 rounded-2xl`}
      >
        <CardHeader className="space-y-4">
          <div className="flex justify-center">{icon}</div>
          <CardTitle className="text-xl font-semibold tracking-tight">{title}</CardTitle>
          <CardDescription className="text-base text-muted-foreground leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">{button}</CardContent>
      </Card>
    </motion.div>
  );
}
