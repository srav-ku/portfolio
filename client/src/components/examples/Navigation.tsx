import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <Navigation 
      activeSection="home" 
      onSectionChange={(section) => console.log('Section changed to:', section)} 
    />
  );
}