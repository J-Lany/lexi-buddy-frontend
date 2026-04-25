'use client';

import './landing-page.css';

import { useLandingEffects } from './model/use-landing-effects';
import { CtaSection } from './ui/cta-section/cta-section';
import { FeaturesSection } from './ui/features-section/features-section';
import { FooterSection } from './ui/footer-section/footer-section';
import { HeroSection } from './ui/hero-section/hero-section';
import { HowItWorksSection } from './ui/how-it-works-section/how-it-works-section';
import { LandingHeader } from './ui/landing-header/landing-header';
import { StatsSection } from './ui/stats-section/stats-section';
import { TasksSection } from './ui/tasks-section/tasks-section';
import { TelegramComboSection } from './ui/telegram-combo-section/telegram-combo-section';
import { TestimonialsSection } from './ui/testimonials-section/testimonials-section';

export function LandingPageWidget() {
  useLandingEffects();

  return (
    <main className="landing-page">
      <LandingHeader />
      <HeroSection />
      <TelegramComboSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TasksSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
