// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { BiMenu } from 'react-icons/bi';

// import styles from './TodoItem.module.css';

// const TodoItem = ({ task, handleRemoveTodo }) => {
// 	const {
// 		attributes,
// 		listeners,
// 		setNodeRef,
// 		transform,
// 		transition,
// 		isDragging,
// 	} = useSortable({
// 		id: task.id,
// 		data: {
// 			type: 'task',
// 			status: task.status,
// 		},
// 	});

// 	const style = {
// 		transform: CSS.Transform.toString(transform),
// 		transition: transition || 'none',
// 		opacity: isDragging ? 0.6 : 1,
// 	};

// 	const handleDeleteClick = (e) => {
// 		e.stopPropagation();
// 		e.preventDefault();
// 		console.log('Delete button clicked');
// 		handleRemoveTodo(task.id);
// 	};

// 	console.log('TodoItem render, handleRemoveTodo:', handleRemoveTodo);

// 	return (
// 		<div className={styles.wrapper}>
// 			<div
// 				ref={setNodeRef}
// 				style={style}
// 				{...attributes}
// 				{...listeners}
// 				className={styles.item}
// 			>
// 				<div className={styles.content}>{task.task}</div>
// 				<div className={styles.dragHandle}>
// 					<BiMenu />
// 				</div>
// 			</div>
// 			<button className={styles.deleteButton} onClick={handleDeleteClick}>
// 				×
// 			</button>
// 		</div>
// 	);
// };

// export default TodoItem;

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BiMenu } from 'react-icons/bi';

import styles from './TodoItem.module.css';

const TodoItem = ({ task, handleRemoveTodo }) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id, data: { type: 'task', status: task.status } });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition: transition || 'none',
		opacity: isDragging ? 0.5 : 1,
	};

	const handleDeleteClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		console.log('Delete button clicked');
		handleRemoveTodo(task.id);
	};
	return (
		<div className={styles.wrapper}>
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				className={styles.item}
			>
				<div className={styles.content}>{task.task}</div>
				<div className={styles.dragHandle}>
					<BiMenu />
				</div>
			</div>
			<button className={styles.deleteButton} onClick={handleDeleteClick}>
				×
			</button>
		</div>
	);
};

export default TodoItem;
