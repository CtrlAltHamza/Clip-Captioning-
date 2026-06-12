import Hero from '../components/Hero';
import Architecture from '../components/Architecture';
import Demo from '../components/Demo';
import Results from '../components/Results';
import Gaps from '../components/Gaps';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <Architecture />
      <Demo />
      <Results />
      <Gaps />
      <Footer />
    </main>
  );
}
