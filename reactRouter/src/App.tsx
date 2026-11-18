import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "../components/Home"
import About from "../components/About"
import Contact from "../components/Contact"
import Github, { githubInfoLoader } from "../components/Github"
import User from "../components/User"
import Layout from "./Layout"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="user/:userid" element={<User />} />
                    <Route
                        path="github"
                        loader={githubInfoLoader}
                        element={<Github />}
                    />
                </Route>

            </Routes>
        </BrowserRouter>
    )
}

export default App