import React from 'react';
import style from '../css/editor.module.css';
import { JSONEditor } from 'react-json-editor-viewer';

const Editor = () => {
	const [data, setData] = React.useState('{"foo":"bar"}');
	const [error, setError] = React.useState(null);
	const [formatError, setFormatError] = React.useState(null);
	const [formatErrorLocation, setFormatErrorLocation] = React.useState(null);
	const [preview, setPreview] = React.useState(data);
	const [formattedData, setFormattedData] = React.useState(null);
	const [mode, setMode] = React.useState('text');
	const dataRef = React.useRef(null);
	const previewRef = React.useRef(null);

	const handleJSONError = (err) => {
		if (!err) return;
		if (err.name !== 'SyntaxError') {
			setError(err.message);
			return;
		}
		const re = /line \d+ column \d+/;
		const match = err.message.match(re);
		if (!match) return;
		const line = parseInt(match[0].split(' ')[1], 10);
		const column = parseInt(match[0].split(' ')[3], 10);
		setFormatErrorLocation({ line, column });
	};
	
	const handleTextareaChange = (e) => {
		setFormatError(null);
		setFormatErrorLocation(null);
		const { value } = e.target;
		setData(value);
	};
	const handleFormat = () => {
		try {
			const obj = JSON.parse(data);
			setData(JSON.stringify(obj, null, 2));
		} catch(err) {
			setFormatError(err.message);
			handleJSONError(err);
		}
	};
	const handleCompress = () => {
		try {
			const obj = JSON.parse(data);
			setData(JSON.stringify(obj));
		} catch(err) {
			setFormatError(err.message);
			handleJSONError(err);
		}
	};
	const handleClipboard = () => {
		navigator.clipboard.writeText(data);
	}

	// format data & track format errors
	React.useEffect(() => {
		try {
			JSON.parse(data)
		} catch(err) {
			const prefix = 'JSON.parse: ';
			const msg = err.message.startsWith(prefix) ? err.message.slice(prefix.length) : err.message;
			setFormatError(msg);
			handleJSONError(err);
		}
	}, [data]);
	// sync preview w/ data
	React.useEffect(() => {
		if (!formatErrorLocation) {
			setPreview(data);
			return;
		}
		const lines = data.split('\n');
		const line = formatErrorLocation.line - 1;
		const column = formatErrorLocation.column - 1;
		const preview = lines.map((l, i) => {
			if (i === line) {
				const chars = l.split('');
				chars[column] = `<span class=${style.warning}>${chars[column]}</span>`;
				return chars.join('');
			}
			return l;
		}).join('\n');
		setPreview(preview);
	}, [data, formatErrorLocation]);
	
	React.useEffect(() => {
		const textareaComponent = dataRef.current;
		const previewComponent = previewRef.current;
		textareaComponent.addEventListener('scroll', () => {
			previewComponent.scrollTop = textareaComponent.scrollTop;
		});
		previewComponent.addEventListener('scroll', () => {
			textareaComponent.scrollTop = previewComponent.scrollTop;
		});
	}, [dataRef, previewRef]);
	
	React.useEffect(() => {
		if (formatError) return;
		try {
			setFormattedData(JSON.parse(data));
		} catch (e) {
			return;
		}
	}, [data, formatError])
	const handleDataChange = (k, v, obj) => {
		setData(JSON.stringify(obj));
	};
	const handleMode = (val) => {
		if (formatError && val === 'json') return;
		setMode(val);
	}

	return (
		<div className={style.editor}>
			{ error ? (<p className={style.error}>Error: {formatError}</p>) : null }
			<p className={style.formatError}>{formatError ? `Format: ${formatError}` : null}</p>
			<div className={style.content}>
				<div>
					<div className={style.label}>
						<span
							className={[style.mode, mode === 'text' ? style.selectedMode : null].join(' ')}
							onClick={() => handleMode('text')}
						>
							Text
						</span>
						<span>/</span>
						<span
							className={[formatError ? '' : style.mode, mode === 'json' ? style.selectedMode : null].join(' ')}
							onClick={() => handleMode('json')}
						>
							Data
						</span>
						<span>&nbsp;(click for mode)</span>
					</div>
					{
						{
							'text': (
									<textarea
										className={style.textarea}
										onChange={handleTextareaChange}
										value={data}
										ref={dataRef}
										wrap="off"
									>
									</textarea>
							),
							'json': (
								<div className={style.jsonEditor}>
									<JSONEditor
										data={formattedData}
										onChange={handleDataChange}
										styles={{
											label: {
												color: '#2ae'
											}
										}}
									/>
								</div>
							)
					}[mode]}
				</div>
				<div>
					<div className={style.previewLabel}>Preview</div>
					<div className={style.preview} ref={previewRef}>
						<pre className={style.pre} dangerouslySetInnerHTML={{ __html: preview }}></pre>
					</div>
				</div>
			</div>
			<div className={style.controls}>
				<button onClick={handleFormat} disabled={!!formatError}>Format</button>
				<button onClick={handleCompress} disabled={!!formatError}>Compress</button>
				<button onClick={handleClipboard}>Copy</button>
			</div>
		</div>
	);
};

export default Editor;