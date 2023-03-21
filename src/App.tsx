import Header from "./components/Header";
import Footer from "./components/Footer";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import Form from "./components/Form";
import Card from "./components/Card";
import Error from "./components/Error";
import axios, { AxiosError } from "axios";

import { useAsyncEffect } from "./hooks/useAsyncEffect";

const App = () => {
  // debounced query
  const { debouncedQuery } = useContext(DataContext);

  // fill the select tag with name of all the breeds
  // const [nameOfBreeds, setNameOfBreeds] = useState<string[]>([])

  // choose the breed you want
  // const [breedName, setBreedName] = useState<string>("")

  // useContext
  const { fetchError, setFetchError, imagesOfABreed, setImagesOfABreed } =
    useContext(DataContext);

  // when component mounts fill the select tag with names of all the breed
  // useEffect(() => {
  //   const start = async () => {
  //     try {
  //       const { data } = await axios.get(API_URL);
  //       console.log(data.message);
  //       // setNameOfBreeds(data.message)
  //     } catch (error) {
  //       const err = error as Error;
  //       console.log(err.message);
  //     }
  //   };
  //
  //   start().then(() => console.log("started app"));
  // }, []);

  // get the images of the breed that is chosen
  useAsyncEffect(
    async () => {
      // if (!nameOfBreeds.includes(value)) {
      //   setFetchError("Breed not found")
      // };

      if (!debouncedQuery && debouncedQuery === "") {
        setFetchError("Please type in a breed name");
        return;
      }

      try {
        const { data } = await axios.get(
          `https://dog.ceo/api/breed/${debouncedQuery.toLowerCase()}/images`
        );

        setImagesOfABreed(data.message);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err);

        setImagesOfABreed([]);

        if (err.code === "ERR_BAD_REQUEST") {
          setFetchError(`No images found for the breed ${debouncedQuery}`);
        } else {
          setFetchError(err.message);
        }
      }
    },
    async () => {},
    [debouncedQuery]
  );

  return (
    <main className="App">
      <Header />
      <section className="section">
        <div className="container">
          <Form />
          <div className="row g-4 my-3">
            <>
              {debouncedQuery &&
              Array.isArray(imagesOfABreed) &&
              imagesOfABreed?.length ? (
                imagesOfABreed.map((image, index) => (
                  <Card key={index} img={image} />
                ))
              ) : (
                <Error fetchError={fetchError} />
              )}
            </>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default App;
