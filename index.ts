// Завдання 1 : Дженерик в інтерфейсі
// Опишіть інтерфейс Result<T>, який описує результат операції:

// success булеве
// data значення типу T
// timestamp дата
// Створіть дві змінні: одну типу Result<string>, другу типу Result<number[]>.
interface Result<T> {
  success: boolean;
  data: T;
  timestamp: Date;
}

const stringResult: Result<string> = {
  success: true,
  data: "Some information",
  timestamp: new Date(),
};

const numberResult: Result<number> = {
  success: true,
  data: 3,
  timestamp: new Date(),
};

// Завдання 2 : Відповідь API
interface ApiResponse<T> {
  status: "success" | "error";
  data: T;
}

interface User {
  id: number;
  email: string;
}

interface Post {
  id: number;
  title: string;
}

const userResponse: ApiResponse<User> = {
  status: "success",
  data: {
    id: 1,
    email: "example@gamil.com",
  },
};
const postResponse: ApiResponse<Post> = {
  status: "success",
  data: {
    id: 2,
    title: "Post Ttile",
  },
};

// Завдання 3 : Дженерик у класі

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }
  dequeue(): T | undefined {
    return this.items.shift();
  }
  size(): number {
    return this.items.length;
  }
}

const q = new Queue<string>();

q.enqueue("a");
q.enqueue("b");
q.dequeue(); // "a"
q.size(); // 1

// q.enqueue(42); // Argument of type 'number' is not assignable to parameter of type 'string'

// Завдання 4 : Обгортка, що зберігає тип
async function withLogging<T>(
  name: string,
  callback: () => Promise<T>
): Promise<T> {
  console.log(`Початок ${name}`);
  const result = await callback();
  console.log(`Готово ${name}`);
  return result;
}

async function fetchUser(): Promise<User> {
  return {
    id: 1,
    email: "yana@gmail.com",
  };
}
async function fetchPosts(): Promise<Post[]> {
  return [
    {
      id: 1,
      title: "Title 1",
    },
    {
      id: 2,
      title: "Title 2",
    },
  ];
}

const user = await withLogging("fetchUser", () => fetchUser());
// user має бути типу User

const posts = await withLogging("fetchPosts", () => fetchPosts());
// posts має бути типу Post[]

// Завдання 5 : Знайдіть зайве

// А
function logValue(value: unknown): void {
  console.log(value);
}

// Б
function parseJson(json: string): unknown {
  return JSON.parse(json);
}

const user1 = parseJson('{"id": 1}');
