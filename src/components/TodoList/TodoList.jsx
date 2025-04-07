// import StatusCard from '../StatusCard/StatusCard';
// import styles from './TodoList.module.css';

// const statuses = ['to-do', 'in-progress', 'done'];

// const TodoList = ({ todos, handleRemoveTodo }) => {
// 	const groupedTasks = todos.reduce(
// 		(acc, todo) => ({
// 			...acc,
// 			[todo.status]: [...(acc[todo.status] || []), todo],
// 		}),
// 		{}
// 	);

// 	console.log('TodoList render, handleRemoveTodo:', handleRemoveTodo);

// 	return (
// 		<div className={styles.container}>
// 			<div className={styles.columns}>
// 				{statuses.map((status) => (
// 					<StatusCard
// 						key={status}
// 						status={status}
// 						handleRemoveTodo={handleRemoveTodo}
// 						tasks={groupedTasks[status] || []}
// 					/>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default TodoList;

import { SortableContext } from '@dnd-kit/sortable';
import StatusCard from '../StatusCard/StatusCard';
import styles from './TodoList.module.css';

const statuses = ['to-do', 'in-progress', 'done'];

const TodoList = ({ todos, handleRemoveTodo }) => {
	const taskIds = todos.map((task) => task.id);

	const groupedTasks = todos.reduce(
		(acc, todo) => ({
			...acc,
			[todo.status]: [...(acc[todo.status] || []), todo],
		}),
		{}
	);

	return (
		<div className={styles.container}>
			<SortableContext items={taskIds}>
				<div className={styles.columns}>
					{statuses.map((status) => (
						<StatusCard
							key={status}
							status={status}
							tasks={groupedTasks[status] || []}
							handleRemoveTodo={handleRemoveTodo}
						/>
					))}
				</div>
			</SortableContext>
		</div>
	);
};

export default TodoList;
