import Header from "./components/Header"
import Footer from './components/Footer';
import {useState, useContext, useEffect}  from "react"
import DataContext from './context/DataContext';
import Form from './components/Form';
import Card from './components/Card';
import Error from "./components/Error";


function App() {

  // debounced query
  let {debouncedQuery} = useContext(DataContext)

  // API url
  const API_URL = `https://dog.ceo/api/breeds/list/all`

  // fill the select tag with name of all the breeds
  const [nameOfBreeds, setNameOfBreeds] = useState<string[]>([])

  const [errMsg, setErrMsg] = useState<string>("")


  // set the images of the breed you want
  const [imagesOfABreed, setImagesOfABreed] = useState<string[]>([])

  // choose the breed you want 
  const [breedName, setBreedName] = useState<string>("")

  // handle error
  const [fetchError, setFetchError] = useState<string>("");

  // when component mounts fill the select tag with names of all the breed
  useEffect(() => {
    const start = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        console.log(data.message)
        setNameOfBreeds(data.message)
      } catch (error) {
        const err = error as Error
        console.log(err.message)
      }
    }

    start()

    // eslint-disable-next-line
  }, [])


  // get the images of the breed that is choosen
  const loadByBreed = async (value: string) => {
    
    if(!value) return
    
    
    if(!value && value === "") {
      setFetchError("Please type in a breed name");
      return;
    }
    
    try {
      
      const response = await fetch(`https://dog.ceo/api/breed/${value}/images`)
      const data = await response.json()   
      

      if (data.message === "Breed not found (master breed does not exist)") {
        setFetchError(data.message);
      }

      console.log(data.message)
      setImagesOfABreed(data.message)
      
    } catch (error) {
      const err = error as Error
      console.log(err.message)

      if(err.message.startsWith('No route found')){
        setFetchError("breed name cannot be empty");
      } else {
        setFetchError(err.message);
      }
    }
  }


  useEffect(() => { 
  
    loadByBreed(debouncedQuery);
    
    // eslint-disable-next-line
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

          {/* <Dog
            breedName={breedName}
            imagesOfABreed={imagesOfABreed}
          /> */}


          <div className="row g-4 my-3">
            <>
              { debouncedQuery &&  Array.isArray(imagesOfABreed) && imagesOfABreed?.length ? (imagesOfABreed).map((data) => {
                return (
                  <Card key={data} img={data} />
                )
              }) : (<Error fetchError={fetchError} />)}
            </>
          </div>
          
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default App;
