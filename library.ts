enum ItemStatus {
  evailable = "evailable", //
  issued = "issued", //
  lost = "lost", //
}
interface LibraryItemData {
  id: number;
  title: string;
  year: number;
  status: ItemStatus;
  internalNote: string; //(це для працівників, назовні не віддаємо)
}

type PublicItem = Omit<LibraryItemData, "internalNote">;
type ItemPreview = Pick<LibraryItemData, "id" | "title">;
type ItemUpdate = Partial<Omit<LibraryItemData, "id">>;

const publicItems: PublicItem = {
  id: 1,
  title: "Harry Potter",
  year: 1997,
  status: ItemStatus.evailable,
};

const itemPreview: ItemPreview = {
  id: 1,
  title: "Harry Potter",
};

const itemUpdate: ItemUpdate = {
  title: "Harry Potter and the Chamber of Secrets",
};

abstract class LibraryItem {
  #status: ItemStatus = ItemStatus.evailable;
  constructor(protected title: string, protected year: number) {}
  getStatus(): ItemStatus {
    return this.#status;
  }

  borrow(): void {
    this.#status = ItemStatus.issued;
    console.log(`Item "${this.title}" has been borrowed.`);
  }
  abstract describe(): string;
}

interface Searchable {
  matches(query: string): boolean;
}

class Book extends LibraryItem implements Searchable {
  private author: string;
  constructor(title: string, year: number, author: string) {
    super(title, year);
    this.author = author;
  }
  describe(): string {
    return `Book: ${this.title} (${this.year}), author ${this.author}`;
  }

  // метод повертає true, якщо query міститься в назві або в імені автора
  matches(query: string): boolean {
    if (this.title.includes(query) || this.author.includes(query)) {
      return true;
    }
    return false;
  }
}
class Magazine extends LibraryItem {
  private issueNumber: string;
  constructor(title: string, year: number, issueNumber: string) {
    super(title, year);
    this.issueNumber = issueNumber;
  }
  describe(): string {
    return `Magazine: ${this.title}, Issue Number №${this.issueNumber}`;
  }
}
const book = new Book("Harry Potter", 1997, "J.K. Rowling");
const magazine = new Magazine("National Geographic", 2021, "March");

// const libraryItem = new LibraryItem("Harry Potter", 1997); // Cannot create an instance of an abstract class.

const library: LibraryItem[] = [
  new Book("Harry Potter", 1997, "J.K. Rowling"),
  new Book("The Hobbit", 1937, "J.R.R. Tolkien"),
  new Magazine("National Geographic", 2026, "№1"),
];

library.forEach((item) => {
  console.log(item.describe());
});
