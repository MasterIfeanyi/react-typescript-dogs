import {useContext} from 'react'
import DataContext from '../context/DataContext'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Form = () => {

    const {handleSearchChange} = useContext(DataContext)


    const {handleSubmit} = useContext(DataContext)


  return (
    
    <div className="row">
      <form className="col-lg-6 mx-auto mt-2 searchForm row" onSubmit={handleSubmit}>
        
        <div className="input-group">
             
              <input 
              type="text"         
              className="form-control" 
              onChange={handleSearchChange}
              id="search"
              placeholder='Search for any dog breed'
              />

              <button type="button" id="button"  className="search__button">
                  <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                  />
              </button> 
          </div>
      </form>
    </div>

    
    
    
    
    
    // <form className="search row" onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <div className="d-flex justify-content-center align-items-center">
    //         <input 
    //           type="text"              className="search__input form-control" 
    //           onChange={handleSearchChange}
    //           id="search"
    //           placeholder='Search for any movie'
    //           />
    //           <button className="search__button">
    //               <FontAwesomeIcon
    //                   icon={faMagnifyingGlass}
    //               />
    //           </button> 
    //       </div>
    //     </div>
    // </form>
  )
}

export default Form


