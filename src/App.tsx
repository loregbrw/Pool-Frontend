import React from "react"
import { Header } from "./components/header"

export const App = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <Header />
      { children }
    </>
  )
}

