import './App.css';
import Header from "./components/Header"
import Footer from './components/Footer';
import {useState, useEffect}  from "react"
import WelcomeNote from './components/WelcomeNote';
import Select from './components/Select';
import Dog from './components/Dog';

function App() {

  // fill the select tag with name of all the breeds
  const [nameOfBreeds, setNameOfBreeds] = useState<string[]>([])
  // set the images of the breed you want
  const [imagesOfABreed, setImagesOfABreed] = useState<string[]>([])
  // choose the breed you want 
  const [breedName, setBreedName] = useState<string>("")

  // when component mounts fill the select tag with names of all the breed
  useEffect(() => {
    const start = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const data = await response.json()
        console.log(data.message)
        setNameOfBreeds(data.message)
      } catch (error) {
        const err = error as Error
        console.log(err.message)
      }
    }

    start()
  }, [])


  // get the images of the breed that is choosen
  const loadByBreed = async (breed: string) => {
    if (breed !== "Choose a dog breed") {
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`)
        const data = await response.json()
        setImagesOfABreed(data.message)
      } catch (error) {
        const err = error as Error
        console.log(err.message)
      }
    }
  }



  return (
    <main className="App">
      <Header />
      <section className="section">
        <div className="container">
          <WelcomeNote />
          <Select 
            nameOfBreeds={nameOfBreeds}
            setBreedName={setBreedName}
            loadByBreed={loadByBreed}
          />
          <Dog
            breedName={breedName}
            imagesOfABreed={imagesOfABreed}
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default App;
