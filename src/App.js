import './App.css';
import { Helmet } from 'react-helmet';
import Editor from './components/Editor';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>JSON.Ninja</title>
        <meta name="description" content="The easy, clean JSON linter and formatter. Format and lint you json text enabling you to copy and paste it with ninja-like ease." />
        <meta name="keywords" content="JSON, Json, json, format, formatted, formatter, formatting, lint, linting, linter, linted, easy, ninja, javascript, software, programmer, developer, programming, go, python, react, reactjs, angular, angularjs, node, nodejs, write, copy, paste, converter, convert, java, c, c++" />
      </Helmet>
      <h1 className="title">JSON.Ninja</h1>
      <Editor />
    </div>
  );
}

export default App;
