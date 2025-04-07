https://reactpractice.dev/exercise/build-a-drag-and-drop-to-do-list/

https://www.youtube.com/watch?v=Z8RoA_YSGDQ

App.jsx (главный компонент)
└─ TodoList.jsx (список задач)
└─ StatusCard.jsx (колонка)
└─ TodoItem.jsx (карточка задачи)

Если видите предупреждение "Время почти вышло":

Быстро отправьте любое сообщение (например, "продолжаем")

Или скопируйте последний код и вставьте с комментарием "Продолжаем с этого места"

Если захотите улучшить:
Вынести группировку задач в хук

const { groupedTasks } = useTaskGroups(todos, statuses);
Добавить DnD-контекст для колонок
Чтобы можно было перетаскивать не только задачи, но и целые колонки.

Оптимизировать рендеринг
Memoize компоненты через React.memo.

Внедрение @dnd-kit в ваш существующий код можно разбить на 6 четких этапов. Начнём с базовой настройки и постепенно добавим сортировку. Вот пошаговый план:

🔹 Этап 1: Установка библиотеки
npm install @dnd-kit/core @dnd-kit/sortable

🔹 Этап 2: Добавление DndProvider в App.jsx
Оберните TodoList в DndContext (минимальная настройка):

// App.jsx
import { DndContext } from '@dnd-kit/core';

const App = () => {
return (

<div className="app">
<h1>To Do List</h1>
<AddToForm onAdd={handleAddTodo} />
<DndContext> {/_ 👈 Обертка для DnD _/}
<TodoList todos={todos} setTodos={setTodos} />
</DndContext>
</div>
);
};

🔹 Этап 3: Модификация TodoItem (перетаскиваемый элемент)
Используйте useSortable для задач:

// TodoItem.jsx
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const TodoItem = ({ task, onRemove }) => {
const {
attributes,
listeners,
setNodeRef,
transform,
transition,
} = useSortable({ id: task.id });

const style = {
transform: CSS.Transform.toString(transform),
transition,
};

return (

<div
ref={setNodeRef}
style={style}
{...attributes}
className={styles.item} >
<div className={styles.content}>{task.task}</div>
<button
className={styles.dragHandle}
{...listeners} {/_ 👈 Кнопка для захвата _/} >
<BiMenu />
</button>
<button onClick={() => onRemove(task.id)}>×</button>
</div>
);
};

🔹 Этап 4: Настройка SortableContext в TodoList
Оберните колонки в SortableContext:

// TodoList.jsx
import { SortableContext } from '@dnd-kit/sortable';

const TodoList = ({ todos }) => {
const taskIds = todos.map(task => task.id); // 👈 Массив id для SortableContext

return (

<div className={styles.container}>
<SortableContext items={taskIds}> {/_ 👈 Контекст сортировки _/}
<div className={styles.columns}>
{statuses.map((status) => (
<StatusCard
key={status}
status={status}
tasks={groupedTasks[status] || []}
/>
))}
</div>
</SortableContext>
</div>
);
};

🔹 Этап 5: Добавление логики перетаскивания в App.jsx
Обработчики для начала/конца перетаскивания:

// App.jsx
const [activeTask, setActiveTask] = useState(null);

const handleDragStart = ({ active }) => {
setActiveTask(todos.find(task => task.id === active.id));
};

const handleDragEnd = ({ active, over }) => {
if (!over) return;

setTodos(todos.map(task => {
return task.id === active.id
? { ...task, status: over.data.current?.status || task.status }
: task;
}));
};

return (
<DndContext
onDragStart={handleDragStart}
onDragEnd={handleDragEnd}

>

    {/* ... */}
    <DragOverlay>
      {activeTask && (
        <div style={{ background: '#fff', padding: '10px' }}>
          {activeTask.task}
        </div>
      )}
    </DragOverlay>

  </DndContext>
);

🔹 Этап 6: Добавление drop-зон в StatusCard
Сделайте колонки принимающими:

// StatusCard.jsx
import { useDroppable } from '@dnd-kit/core';

const StatusCard = ({ status, tasks }) => {
const { setNodeRef } = useDroppable({
id: status,
data: { status }, // 👈 Важно для определения зоны
});

return (

<div ref={setNodeRef} className={styles.column}>
<h3>{status}</h3>
<div className={styles.items}>
{tasks.map((task) => (
<TodoItem key={task.id} task={task} />
))}
</div>
</div>
);
};

🔹 Дополнительные улучшения (опционально)
Кастомизация курсора:

css
.dragHandle {
cursor: grab;
}
.dragHandle:active {
cursor: grabbing;
}

Анимации:
Добавьте animateLayoutChanges в useSortable для плавной сортировки.

Ограничение осей:

<DndContext modifiers={[restrictToVerticalAxis]}>
Итог: что получилось?
Задачи можно перетаскивать между колонками.

Сортировка работает внутри одной колонки.

Превью при перетаскивании (через DragOverlay).

5. Полная последовательность внедрения DnD
   Добавьте DndContext в App.jsx → общая зона перетаскивания.

Сделайте задачи перетаскиваемыми (useSortable в TodoItem.jsx).

Добавьте SortableContext в TodoList.jsx → для сортировки внутри колонки.

Настройте зоны сброса (useDroppable в StatusCard.jsx) → для перемещения между колонками.

Добавьте обработчики (onDragStart/End в App.jsx).
