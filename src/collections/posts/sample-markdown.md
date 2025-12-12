---
title: Sample Markdown
excerpt: This is a sample markdown file.
tags: [Markdown]
date: 2025-12-12
author: simon
slug: sample-markdown
locale: en
---

# H1 Heading

## H2 Heading

### H3 Heading

#### H4 Heading

##### H5 Heading

### Text Formatting

This is **bold text** and this is _italic text_. You can also use **bold**, _italic_, or **_bold and italic_** together.

~~Strikethrough text~~ and `inline code`.

Superscript: 2^10^ = 1024  
Subscript: H~2~O

### Horizontal Rule

---

## Lists

### Unordered List

- Item one
- Item two
  - Nested item 2.1
  - Nested item 2.2
- Item three

### Ordered List

1. First item
2. Second item
   1. Nested numbered
   2. Another nested
3. Third item

### Task List

- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

## Blockquote

> This is a blockquote with **bold text** and `inline code`.
>
> > Nested blockquote
>
> - List inside blockquote
> - Another item

## Code Blocks with Shiki

### JavaScript

```javascript
// Arrow function with destructuring
const calculateTotal = ({ price, quantity, tax = 0.08 }) => {
	const subtotal = price * quantity;
	return subtotal + subtotal * tax;
};

// Async/await example
async function fetchData(url) {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
}

// Class example
class User {
	constructor(name, email) {
		this.name = name;
		this.email = email;
	}

	getProfile() {
		return `${this.name} <${this.email}>`;
	}
}
```

### Python

```python
def calculate_total(price, quantity, tax=0.08):
  subtotal = price * quantity
  return subtotal + (subtotal * tax)
```
