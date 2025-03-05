import React from 'react';
import style from '../css/info.module.css';

const Info = () => {
	return (
		<div className={style.info}>
			<h1>Understanding JSON: Linting, Formatting, and Compression</h1>

			<h2>What is JSON?</h2>
			<p>JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for both humans to read and write, as well as for machines to parse and generate. It is commonly used for data storage, configuration files, and APIs because of its simplicity and wide compatibility.</p>

			<pre><code>{`{
	"name": "John Doe",
	"age": 30,
	"email": "johndoe@example.com",
	"isActive": true,
	"skills": ["JavaScript", "Python", "Go"],
	"address": {
		"street": "123 Main St",
		"city": "New York",
		"zip": "10001"
	}
}`}</code></pre>

			<h2>Why Lint, Format, and Compress JSON?</h2>
			<p>When working with JSON, maintaining clean and efficient data is essential. Three key processes that help achieve this are <strong>linting</strong>, <strong>formatting</strong>, and <strong>compressing</strong> JSON.</p>
			
			<h3>1. JSON Linting</h3>
			<p><strong>What is JSON Linting?</strong>Linting JSON refers to checking JSON data for errors such as missing commas, incorrect brackets, or improperly formatted values.</p>
			<p><strong>Benefits of JSON Linting:</strong></p>
			<ul>
				<li>Error Detection</li>
				<li>Ensures Validity</li>
				<li>Prevents Unexpected Bugs</li>
				<li>Improves Collaboration</li>
			</ul>
			
			<h3>2. JSON Formatting (Pretty-Printing)</h3>
			<p><strong>What is JSON Formatting?</strong>Formatting JSON structures it in a readable way by adding indentation and line breaks.</p>
			<p><strong>Benefits of JSON Formatting:</strong></p>
			<ul>
				<li>Improves Readability</li>
				<li>Better Debugging & Logging</li>
				<li>Enhances Collaboration</li>
			</ul>

			<pre><code>{`{"name":"Alice","age":25,"isActive":true,"skills":["JavaScript","Python"]}`}</code></pre>
			<p>Formatted JSON:</p>
			<pre><code>{`{
	"name": "Alice",
	"age": 25,
	"isActive": true,
	"skills": [
		"JavaScript",
		"Python"
	]
}`
			}</code></pre>

			<h3>3. JSON Compression (Minification)</h3>
			<p><strong>What is JSON Compression?</strong>JSON compression removes unnecessary whitespace, indentation, and comments to reduce file size.</p>
			<p><strong>Benefits of JSON Compression:</strong></p>
			<ul>
				<li>Reduces File Size</li>
				<li>Improves API Performance</li>
				<li>Optimizes Storage</li>
			</ul>
			
			<p>Compressed JSON:</p>
			<pre><code>{`{"name":"Alice","age":25,"isActive":true,"skills":["JavaScript","Python"]}`}</code></pre>

			<h2>When to Use Each?</h2>
			<ul>
				<li><strong>Linting:</strong> Always use when writing or modifying JSON.</li>
				<li><strong>Formatting:</strong> Useful when debugging or collaborating.</li>
				<li><strong>Compression:</strong> Ideal for production environments.</li>
			</ul>
			
			<h2>Final Thoughts</h2>
			<p>By <strong>linting, formatting, and compressing JSON</strong>, developers can ensure smooth operations in APIs, web applications, databases, and cloud storage solutions.</p>

		</div>
	);
};

export default Info;
