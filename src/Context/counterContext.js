import React, { createContext, useState } from 'react'


export let counterContext= createContext(0)

export default function CounterContextProvider({children}) {
  
  let [counter ,setCounter]= useState(0);
  function counterUp(){
    setCounter(counter+1)
  }

  return (
     <counterContext.Provider value={{counter,counterUp}}>
      {children}
     </counterContext.Provider>
  )
}
