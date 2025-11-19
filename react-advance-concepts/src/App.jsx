// import Fragment from "./Fragment"
// import Modal from "./Modal"


// import React, {Suspense,lazy} from "react"

// import without lazy loading
// import LazyLoading from "./LazyLoading"

// const LazyLoadingComponent = lazy(()=>import("./LazyLoading"))
// const LazyLoading2Component = lazy(()=>import("./LazyLoading2"))

// import LazyLoading from "./LazyLoading"
// import LazyLoading2 from "./LazyLoading2"

// import UseRefExample from "./useRefExample"

import UseReducer from "./UseReducer"

function App() {

  return (
    //  <Fragment/>
    // <>
    //   <h1>Main App</h1>
    //   <Modal>
    //     <h2>I am inside a Portal</h2>
    //   </Modal>
    // </>
    
    // without lazy loading
  // <LazyLoading/>

  // <Suspense fallback={<h3>Loading....</h3>}>
  //   <LazyLoadingComponent/>
  //   <LazyLoading2Component/>
  // </Suspense>

  // <UseRefExample/>

  <UseReducer/>
  )
}

export default App
