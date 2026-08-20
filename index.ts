// Завдання 1 : Останній елемент
function getLast<T>(value: T[]): T | undefined {
  return value[value.length - 1];
}

const n = getLast([1, 2, 3]); // має бути number | undefined
const s = getLast(["a", "b"]); // має бути string | undefined
const e = getLast([]); // undefined

// Завдання 2 : Обгортка в масив
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const a = wrapInArray(5); // number[]
const b = wrapInArray("hello"); // string[]

// Завдання 3 : Дві комірки
function swap<T, K>(a: T, b: K): [K, T] {
  return [b, a];
}

// const r = swap("Аліна"); // Expected 2 arguments, but got 1.
const r = swap("Аліна", 26);

// Завдання 4 : Полагодьте функцію
function filterAndTransform<T, R>(
  arr: T[],
  predicate: (item: T) => boolean,
  transform: (item: T) => R
): R[] {
  return arr.filter(predicate).map(transform);
}

// Після виправлення це має працювати:
const result = filterAndTransform(
  [1, 2, 3, 4],
  (n) => n % 2 === 0,
  (n) => `Число: ${n}`
);
// result: string[]

// Завдання 5 : Обмеження
function printId<T extends { id: number }>(obj: T): T {
  console.log(obj.id);
  return obj;
}

const user = printId({ id: 1, email: "a@test.com" });
user.email; // має працювати, тип не втрачено

// printId({ name: "Alice" });   // має бути помилка: немає id
// printId({ id: "abc" });       // має бути помилка: id не число
