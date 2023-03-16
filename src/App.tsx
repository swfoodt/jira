import { ErrorBoundary } from 'components/error-boundary';
import { AuthenticatedApp } from 'authenticated-app';
import { FullPageErrorFallback } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
// import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
// import { ProjectListScreen } from 'screens/project-list';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </ErrorBoundary>
    </div>
  );
}

export default App;
