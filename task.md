# Task Checklist

## 1. Prepare Frontend Types & State
- `[ ]` Define TypeScript interfaces for the nested tree structure.
- `[ ]` Create utility functions to convert from `WorkerForm[]` & `AdministratorForm[]` into the tree structure (for initialization).
- `[ ]` Create utility functions to project the tree's leaf nodes back into `WorkerForm[]` and `AdministratorForm[]` (for submission).

## 2. Build the UI Components
- `[ ]` Implement `MasterTotalInput` for the root `jumlah`.
- `[ ]` Implement `CategorySelector` to add new partition layers (Tipe, Gender, Umur, Pendidikan).
- `[ ]` Implement recursive `TreeNode` component to render the nested inputs based on the selected categories.
- `[ ]` Implement sum validation to ensure children's `jumlah` does not exceed the parent's `jumlah`.

## 3. Integration & Polish
- `[ ]` Replace the existing `workers` and `administrators` sections in `edit.tsx` with the new combined component.
- `[ ]` Ensure form validation errors are mapped correctly to the UI if possible, or handled gracefully.
- `[ ]` Test adding, updating, and removing categories.
