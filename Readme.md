# Products and Products owner
- I desided to use one-to-many relationship. One owner can have many products, but one product can have only one owner. I used a 'ownerId' as a foreign key referencing to the userId. Also a user can not be deleted if they has assotiated product


# Design user-settings storage

I can propose three approaches to store user settings

## 1. Store JSON object with all user`s setting in the "users" table, "settings" column

**Advantages:**

- Simple implementation: settings stores at the alongside the user’s other data.
- One query can load the user and their settings.

**Disadvantages:**

- Validation needs extra work: valid JSON does not automatically mean valid settings. The application must check allowed names, types, and values.
- Filtering is more complicated: finding all users with email notifications enabled requires JSON expressions.
- Whole-object updates can lose changes: if two requests read the same object and save different modifications, one can overwrite the other.

**Best fit:** small, flexible preferences mostly loaded for one user at a time.

## 2. Separate relational user_settings table

EAV structure - (Entity (user_id), Attribute (setting_name), Value (setting_value)) 

Resolution: this approach is good if we need to filter user by settings or if we need strict validation for user settings

**Advantages:**

- Clear structure: each setting has a defined column and data type.
- Straightforward validation: types, defaults, NOT NULL, and appropriate constraints can enforce rules.
- Easy filtering and indexing: it is easy to querying users by language or notification preference.
- Separate updates: you can update one setting without replacing the others.
- Database-enforced relationship: a foreign key ensures the user exists; ON DELETE CASCADE can remove settings automatically when that user is deleted.

**Disadvantages:**

- Schema migrations: adding a new setting usually requires adding a column.
- Additional retrieval: loading users with settings requires a join or another query.

**Best fit:** a predictable set of settings that you need to validate, filter, or report on.

## 3. Store settings in MongoDB

Document can contain something similar to:

```json
{
  "userId": 1,
  "settings": {
    "language": "en",
    "theme": "dark",
    "notifications": true,
    "currency": "USD"
  }
}
```

**Advantages:**

- Flexible document structure: suitable for nested objects and settings that vary between users.
- Nested fields can be indexed, and schema validation can enforce selected rules.
- Individual fields can be updated.

**Disadvantages, when users remain in MySQL:**

- Another database to operate: additional connections, monitoring, backups, and deployment work.
- No foreign key to MySQL users: your application must prevent orphaned settings.
- Combining user data and settings requires application coordination.

**Best fit:** an application already using MongoDB, or a settings service with a clear need for independent storage.

## Decision

I chose the first approach — storing user settings as a JSON object in the users table alongside all other user data. It is easy to implement and allows us to get all user data with a single query. The settings object is not large, the application is small, and we are not expected to filter users by settings frequently.

