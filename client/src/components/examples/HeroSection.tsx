import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return <HeroSection onScrollToNext={() => console.log('Scroll to next section')} />;
}