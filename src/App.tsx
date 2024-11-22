// Importing necessary components and libraries
import RouteComponent from './RouteComponent'; // Main routing component for the application
import { BrowserRouter as Router } from 'react-router-dom'; // Router for handling routing
import { Provider } from 'react-redux'; // Provider component for Redux store
import Footer from './components/Footer/Footer'; // Footer component for the app layout
import { PersistGate } from 'redux-persist/integration/react'; // Component to manage persistence of Redux state
import { persistor, store } from './redux/store'; // Importing the Redux store and persistor

// Functional component definition for App
function App() {
  return (
    // Providing the Redux store to the app
    <Provider store={store}>
      {/* PersistGate delays the rendering of children until the persisted state has been retrieved */}
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          {/* Setting up the Router for the application */}
          <Router>
            {/* RouteComponent handles the routing logic of the app */}
            <RouteComponent />
          </Router>
          {/* Footer displayed at the bottom of the app */}
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}

// Exporting the App component as the default export
export default App;