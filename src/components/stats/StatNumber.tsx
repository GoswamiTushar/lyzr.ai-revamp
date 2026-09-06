'use client';

import React, { useState, useEffect } from 'react';

interface StatNumberProps {
  value: string;
  isInView: boolean;
}

export const StatNumber: React.FC<StatNumberProps> = ({ value, isInView }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const raw = value.trim();
    if (raw === '1M+') {
      if (!isInView) {
        setDisplayValue('0M+');
        return;
      }
      let start: number | null = null;
      let frameId: number;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / 1100, 1);
        const current = progress < 1 ? (progress * 1).toFixed(1) : '1';
        setDisplayValue(`${current === '1.0' || current === '1' ? '1' : current}M+`);
        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue('1M+');
        }
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }

    if (raw === '300%') {
      if (!isInView) {
        setDisplayValue('0%');
        return;
      }
      let start: number | null = null;
      let frameId: number;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / 1200, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(easeOut * 300);
        setDisplayValue(`${current}%`);
        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue('300%');
        }
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }

    if (raw === '2026') {
      if (!isInView) {
        setDisplayValue('2000');
        return;
      }
      let start: number | null = null;
      let frameId: number;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / 1200, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = 2000 + Math.round(easeOut * 26);
        setDisplayValue(`${current}`);
        if (progress < 1) {
          frameId = requestAnimationFrame(animate);
        } else {
          setDisplayValue('2026');
        }
      };
      frameId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(frameId);
    }

    setDisplayValue(value);
  }, [value, isInView]);

  return <span>{displayValue}</span>;
};
