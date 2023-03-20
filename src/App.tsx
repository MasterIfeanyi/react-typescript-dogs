import './App.css';
import Header from "./components/Header"
import Footer from './components/Footer';
import {useState, useContext, useEffect}  from "react"
import Select from './components/Select';
import Dog from './components/Dog';
import DataContext from './context/DataContext';
import Form from './components/Form';
import Card from './components/Card';

function App() {


  // debounced query
  let {debouncedQuery} = useContext(DataContext)

  // API url
  const API_URL = `https://dog.ceo/api/breeds/list/all`

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
        const response = await fetch(API_URL)
        const data = await response.json()
        console.log(data.message)
        // setNameOfBreeds(data.message)
        setNameOfBreeds(data.message)
      } catch (error) {
        const err = error as Error
        console.log(err.message)
      }
    }

    start()

    // eslint-disable-next-line
  }, [])


  useEffect(() => {
    // get the images of the breed that is choosen
    const loadByBreed = async (value: string) => {
      

    if(!value) {
      setImagesOfABreed([]);
      return;
    }
      
      try {
        const response = await fetch(`https://dog.ceo/api/breed/${value}/images`)
        const data = await response.json()
        console.log(data)
        setImagesOfABreed(data.message)
      } catch (error) {
        const err = error as Error
        console.log(err.message)
      }
    }


    loadByBreed(debouncedQuery);

  }, [debouncedQuery])



  return (
    <main className="App">
      <Header />
      <section className="section">
        <div className="container">

          <Form />

          {/* <Select 
            nameOfBreeds={nameOfBreeds}
            setBreedName={setBreedName}
            loadByBreed={loadByBreed}
          /> */}


          {}

          { imagesOfABreed?.length ? imagesOfABreed.map((data) => {
            return (
              <Card key={data} img={data} />
            )
          }) : <p>Nothing</p>}



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
