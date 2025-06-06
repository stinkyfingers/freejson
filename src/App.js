import React from 'react';
import './App.css';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Editor from './components/Editor';
import Info from './components/Info';

function App() {
  const [info, setInfo] = React.useState(null);
  return (
    <HelmetProvider>
      <div className="App">
        <Helmet>
          <title>JSON.Ninja | Free Online JSON Formatter and Validator</title>
          <meta name="description" content="The easy, clean, free JSON linter and formatter. Format, validate and lint your json text enabling you to copy and paste it with ninja-like ease." />
          <meta name="keywords" content="JSON, Json, json, format, formatted, formatter, formatting, lint, linting, linter, linted, easy, ninja, javascript, software, programmer, developer, programming, go, python, react, reactjs, angular, angularjs, node, nodejs, write, copy, paste, converter, convert, java, c, c++" />
          <meta property="og:title" content="JSON Ninja - Free Online JSON Formatter" />
          <meta property="og:description" content="Paste JSON and beautify, correct, and validate instantly." />
          <meta property="og:url" content="https://json.ninja" />
          <meta name="twitter:card" content="summary" />
        </Helmet>
        <h1 className="pageHeader">JSON linter - formatter - compresser - checker</h1>
        <h1 className="title">JSON.Ninja</h1>
        <h5 onClick={() => setInfo(!info)} className="infoButton">{info ? "(Close) " : null }About JSON</h5>
        <div className={ info ? "" : "hidden" }><Info /></div>
        <Editor />
      </div>
    </HelmetProvider>
  );
}

export default App;
