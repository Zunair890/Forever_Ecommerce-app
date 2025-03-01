import BestSeller from "../components/BestSeller"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import NewsLetter from "../components/NewsLetter"
import OurPolicy from "../components/OurPolicy"


function Home() {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetter/>
      
    </div>
  )
}

export default Home