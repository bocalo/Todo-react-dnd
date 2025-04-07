// import { useState } from 'react';
// import styles from './AddToForm.module.css';

// const AddToForm = ({ onAdd }) => {
// 	const [text, setText] = useState('');

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		if (text.trim()) {
// 			onAdd(text.trim());
// 			setText('');
// 		}
// 	};

// 	return (
// 		<form className={styles.add_todo} onSubmit={handleSubmit}>
// 			<input
// 				value={text}
// 				onChange={(e) => setText(e.target.value)}
// 				type="text"
// 				placeholder="Add new task..."
// 			/>
// 			<button type="submit">Add Task</button>
// 		</form>
// 	);
// };

// export default AddToForm;

import { useState } from 'react';
import styles from './AddToForm.module.css';

const AddToForm = ({ onAdd }) => {
	const [text, setText] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		//e.stopPropagation();
		if (text.trim()) {
			onAdd(text.trim());
			setText('');
		}
	};

	return (
		<form className={styles.add_todo} onSubmit={handleSubmit}>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Add new task..."
			/>
			<button type="submit">Add Task</button>
		</form>
	);
};

export default AddToForm;
