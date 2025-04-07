// import { useDroppable } from '@dnd-kit/core';
// import {
// 	SortableContext,
// 	verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import TodoItem from '../TodoItem/TodoItem';
// import styles from './StatusCard.module.css';

// const StatusCard = ({ status, tasks, handleRemoveTodo }) => {
// 	const { setNodeRef } = useDroppable({
// 		id: status,
// 		data: { status },
// 	});

// 	return (
// 		<div ref={setNodeRef} className={styles.column}>
// 			<h3 className={styles.title}>{status}</h3>
// 			<SortableContext
// 				items={tasks.map((task) => task.id)}
// 				strategy={verticalListSortingStrategy}
// 			>
// 				<div className={styles.items}>
// 					{tasks.map((task) => (
// 						<TodoItem
// 							key={task.id}
// 							task={task}
// 							handleRemoveTodo={handleRemoveTodo}
// 						/>
// 					))}
// 				</div>
// 			</SortableContext>
// 		</div>
// 	);
// };

// export default StatusCard;
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import TodoItem from '../TodoItem/TodoItem';
import styles from './StatusCard.module.css';

const StatusCard = ({ status, tasks, handleRemoveTodo }) => {
	const { setNodeRef } = useDroppable({
		id: status,
		data: { status },
	});
	return (
		<div ref={setNodeRef} className={styles.column}>
			<h3 className={styles.title}>{status}</h3>
			<SortableContext
				items={tasks.map((task) => task.id)}
				strategy={verticalListSortingStrategy}
			>
				<div className={styles.items}>
					{tasks.map((task) => (
						<TodoItem
							key={task.id}
							task={task}
							handleRemoveTodo={handleRemoveTodo}
						/>
					))}
				</div>
			</SortableContext>
		</div>
	);
};

export default StatusCard;
