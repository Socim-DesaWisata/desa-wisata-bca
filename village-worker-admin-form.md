# Enhance Village Worker and Administrator Form

## Overview

The goal is to combine the "Tenaga Kerja" and "Data Pengurus" sections in the village edit form (`resources/js/pages/villages/edit.tsx`). The new UI will allow users to input a single master "Jumlah" (Total Amount), and then dynamically add partitions for:
1. **Tipe Pekerja** (Penuh Waktu, Paruh Waktu)
2. **Gender** (Laki-laki, Perempuan)
3. **Rentang Umur**
4. **Data Pendidikan** (SD, SMP, SMA, etc.)

Each partition's total amount cannot exceed the master "Jumlah". Once a category (e.g., "Gender") is used, it cannot be added again unless deleted.

## 🔴 CRITICAL BLOCKER: Database Structure Mismatch

You specified: *"just manipulate the frontend, not changing database structure"*. 
However, there is a fundamental mismatch between the requested UI and the current database:

Currently, the `village_workers` table expects **permutations**. Each row **requires** a `type` (`full-time` or `part-time`), and includes `gender`, `age_min`, `age_max`, and `amount`.
For example, currently you store: *10 Full-time Male workers aged 18-25*.

If the new frontend collects data independently (e.g., *Total 100 workers -> 60 Full-time, 40 Part-time AND 50 Males, 50 Females*), we cannot save this into the current database without either:
1. Exploding the total sum (saving 60+40+50+50 = 200 workers).
2. Faking the required `type` field for Gender/Age rows, which corrupts the data.

### Open Question: How should we handle saving this data to the backend?
- **Option A:** Allow me to modify the database structure to support independent statistical aggregations.
- **Option B:** Instead of independent partitions, the nested form should still build permutations (e.g. Total -> Tipe -> then for each Tipe, define Gender -> etc).
- **Option C:** Something else?

## Proposed UI Changes (Pending Clarification)

1. **Combine Sections**: Merge "Tenaga Kerja" and "Data Pengurus" into a single section named "Data Tenaga Kerja & Pengurus".
2. **Master Input**: A single `Jumlah Total` input field.
3. **Dynamic Partitions**:
    - A dropdown to "Tambah Kategori" (Tipe Pekerja, Gender, Rentang Umur, Pendidikan).
    - When a category is selected, render a nested form block.
    - Inside each block, validate that the sum of the amounts `(Σ jumlah)` <= `Jumlah Total`.
4. **Category State**: Track selected categories and disable/hide them from the "Tambah Kategori" dropdown.

## Verification Plan (Phase X)

### Automated Tests
- `npm run lint` and `npm run types:check` to ensure frontend types are correct.

### Manual Verification
- Render the `edit.tsx` form.
- Verify adding a Master Jumlah (e.g. 100).
- Verify adding "Gender" allows entering Laki-laki and Perempuan, and prevents their sum from exceeding 100.
- Verify "Gender" disappears from the available categories list.
- Verify deleting "Gender" restores it to the available categories list.
