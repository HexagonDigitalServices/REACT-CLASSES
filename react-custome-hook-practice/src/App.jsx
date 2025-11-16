import ToggleFAQ from "./components/ToggleFAQ"
import UsersList from "./components/UsersList"
import ContactForm from "./components/ContactForm"

function App() {

  return (
    <div className="container">
      <h1>Custom Hooks Dashboard</h1>
      <div className="grid">
        <ToggleFAQ/>
        <UsersList/>
        <ContactForm/>
      </div>
    </div>
  )
}

export default App
