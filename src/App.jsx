// import { useState } from 'react';
// import { DndContext, DragOverlay } from '@dnd-kit/core';
// import TodoList from './components/TodoList/TodoList';
// import AddToForm from './components/AddToForm/AddToForm';

// const App = () => {
// 	const [todos, setTodos] = useState([
// 		{ id: '1', task: 'Первая задача', status: 'to-do' },
// 		{ id: '2', task: 'Вторая задача', status: 'in-progress' },
// 		{ id: '3', task: 'Третья задача', status: 'done' },
// 	]);

// 	const [activeTask, setActiveTask] = useState(null);

// 	const handleAddTodo = (taskText) => {
// 		const newTodo = {
// 			id: Date.now().toString(),
// 			task: taskText,
// 			status: 'to-do',
// 		};
// 		setTodos([...todos, newTodo]);
// 	};

// 	const handleRemoveTodo = (taskId) => {
// 		console.log('Removing task with id:', taskId);
// 		console.log('Current todos:', todos);
// 		setTodos((prev) => prev.filter((todo) => todo.id !== taskId));
// 	};

// 	console.log('TodoList render, handleRemoveTodo:', handleRemoveTodo);

// 	const handleDragStart = ({ active }) => {
// 		setActiveTask(todos.find((task) => task.id === active.id));

// 		//console.log('Active:', active);
// 	};

// 	const handleDragEnd = ({ active, over }) => {
// 		//console.log('Over:', over);
// 		if (!over) {
// 			setActiveTask(null);
// 			return;
// 		}

// 		setTodos(
// 			todos.map((task) => {
// 				//console.log('New status:', over?.data?.current?.status);
// 				return task.id === active.id
// 					? { ...task, status: over.data.current?.status || task.status }
// 					: task;
// 			})
// 		);

// 		setActiveTask(null);
// 	};

// 	return (
// 		<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
// 			<div className="app">
// 				<h1>To Do List</h1>
// 				<AddToForm onAdd={handleAddTodo} />
// 				<TodoList
// 					todos={todos}
// 					setTodos={setTodos}
// 					handleRemoveTodo={handleRemoveTodo}
// 				/>
// 			</div>

// 			<DragOverlay>
// 				{activeTask && (
// 					<>
// 						<div className="task-preview">{activeTask.task}</div>
// 						{/* <div>Сейчас перетаскиваем: {JSON.stringify(activeTask)}</div> */}
// 					</>
// 				)}
// 			</DragOverlay>
// 		</DndContext>
// 	);
// };

// export default App;

import { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import AddToForm from './components/AddToForm/AddToForm';
import TodoList from './components/TodoList/TodoList';

const App = () => {
	const [todos, setTodos] = useState([
		{ id: '1', task: 'Первая задача', status: 'to-do' },
		{ id: '2', task: 'Вторая задача', status: 'in-progress' },
		{ id: '3', task: 'Третья задача', status: 'done' },
	]);
	const [activeTask, setActiveTask] = useState(null);

	const handleAddTodo = (taskText) => {
		const newTodo = {
			id: Date.now().toString(),
			task: taskText,
			status: 'to-do',
		};
		setTodos([...todos, newTodo]);
	};

	const handleRemoveTodo = (taskId) => {
		setTodos((todos) => todos.filter((todo) => todo.id !== taskId));
	};

	const handleDragStart = ({ active }) => {
		setActiveTask(todos.find((task) => task.id === active.id));
	};

	const handleDragEnd = ({ active, over }) => {
		console.log('Over:', over);

		if (!over) {
			setActiveTask(null);
			return;
		}

		if (active.id !== over.id) {
			setTodos((prevTodos) => {
				const oldIndex = prevTodos.findIndex((t) => t.id === active.id);
				const newIndex = prevTodos.findIndex((t) => t.id === over.id);

				return arrayMove(prevTodos, oldIndex, newIndex);
			});
		}

		if (over.data?.current?.status) {
			setTodos((prevTodos) =>
				prevTodos.map((task) =>
					task.id === active.id
						? { ...task, status: over.data.current.status }
						: task
				)
			);
		}
		setActiveTask(null);
	};

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			//onDragOver={({ over }) => console.log('Real-time:', over)}
		>
			<div className="app">
				<h1>To Do List</h1>
				<AddToForm onAdd={handleAddTodo} />
				<TodoList
					todos={todos}
					setTodos={setTodos}
					handleRemoveTodo={handleRemoveTodo}
				/>
			</div>

			<DragOverlay>
				{activeTask && (
					<>
						<div className="task-preview">{activeTask.task}</div>
					</>
				)}
			</DragOverlay>
		</DndContext>
	);
};

export default App;
