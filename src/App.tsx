import Header from "./components/Header"
import Footer from './components/Footer';
import {useContext, useEffect}  from "react"
import DataContext from './context/DataContext';
import Form from './components/Form';
import Card from './components/Card';
import Error from "./components/Error";


function App() {
 


  // useContext
  const {fetchError, setIsLoading, isLoading, debouncedQuery, setFetchError, imagesOfABreed, setImagesOfABreed} = useContext(DataContext)




  


  useEffect(() => { 

    const controller = new AbortController();

    // get the images of the breed that is choosen
    const loadByBreed = async (value: string) => {
    
    
    if(!value && value === "") {
      setFetchError("Please type in a breed name");
      return;
    }


    try {

      setIsLoading(true);

      const response = await fetch(`https://dog.ceo/api/breed/${value}/images`, { signal: controller.signal })
      const data = await response.json();   

      if (data.message === "Breed not found (master breed does not exist)"  ) {
        setFetchError("Breed not found")
      }

      console.log(data.message)
      setImagesOfABreed(data.message)
      setIsLoading(false);
      
    } catch (error) {
      const err = error as Error
      console.log(err.message);
    }
  }
  
    loadByBreed(debouncedQuery);

    return () => controller.abort();
    
    // eslint-disable-next-line
  }, [debouncedQuery])



  return (
    <main className="App">
      <Header />
      <section className="section">
        <div className="container">

          <Form />


          <div className="row g-4 my-3">
            <>
              {
              isLoading 
                ? <div className="col-12 text-center">
                  <div className="mexican-wave my-5"></div>
                </div>
               : debouncedQuery &&  Array.isArray(imagesOfABreed) && imagesOfABreed?.length ? (imagesOfABreed).map((data) => {
                  return (
                    <Card key={data} img={data} />
                  )
                }) : (<Error fetchError={fetchError} />)
              }
              {/* { debouncedQuery &&  Array.isArray(imagesOfABreed) && imagesOfABreed?.length ? (imagesOfABreed).map((data) => {
                return (
                  <Card key={data} img={data} />
                )
              }) : (<Error fetchError={fetchError} />)} */}
            </>
          </div>
          
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default App;
