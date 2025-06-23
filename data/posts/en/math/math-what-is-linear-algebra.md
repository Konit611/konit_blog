---
title: What is Linear Algebra
date: 2025-06-23 19:53
excerpt: What is Linear Algebra
coverImage: 
categories:
  - Math
tags:
  - Math
  - LinearAlgebra
author: Geunil Park
featured: false
---

## What is Linear Algebra

Linear algebra is a branch of mathematics that focuses on **linear equations** and their representations in **vector spaces** and through **matrices**.

While algebra, in general, deals with equations and unknown variables, linear algebra specifically studies systems of linear equations. A key feature of a linear equation is that the variables are only raised to the **first power**. For example, an equation like $2x+3y=7$ is linear. However, an equation with a term like $x^2$ or $xy$ would be considered non-linear.

## Data Structures in Linear Algebra

In linear algebra, the fundamental data structure is the tensor. However, we use more specific and common names for tensors of different ranks or dimensions

### Scalar

A scalar is a single numerical value. It can be thought of as a 0-dimensional tensor.

### Vector

A vector is an ordered collection of scalars, typically visualized as a row or column, similar to an array in Python.

Geometrically, a vector can be interpreted in two ways:

1. As a point in space: A vector with two values, such as $[x, y]$, defines a point in a 2-dimensional plane. A vector with three values defines a point in 3-dimensional space. and so on.
2. As a magnitude and direction: Alternatively, a vector can represent the magnitude(or length) and direction from the origin to a specific point.

Vectors can be transposed, which converts a row vector into a column vector and vice-versa. This is denoted by a superscript T, as in $v^T$

_(Note: Vectors are typically denoted in a lowercase, italics, bold, such as $v$)_

Before we consider vector types, we should know about Norms.
Norms are functions that quantify the magnitude or length of a vector.
- Several Types of Norm
	- $L^2$ Norm : $||\mathbf{x}||_2 = \sqrt{\sum_{i} x_i^2}$
		- This is most common norm, often called the Euclidean norm. Because it's so widely used, the subscript '2' is frequently omitted: $||x||$
	- $L^1$ Norm : $||x||_1 = \sum_{i}|x_i|$
		- This norm measures the sum of the absolute values of the elements.
	- Squared $L^2$ Norm : $||x||_2^2 = \sum_{i} x_i^2$
		- This norm is computationally cheaper to use than standard $L^2$ norm because this norm equals simply $x^Tx$. (It avoids the square root operation)


- Several Types of Vectors
	- Unit Vector
		- A vector is called a unit vector If its $L^2$ norm is equal to 1. ($||x|| = 1$). 
	- Basis Vector
		- A **basis** is a set of vectors that can be scaled and combined to represent any other vector in a given vector space.
		- A common choice for a basis is the set of unit vectors that point along the axes of the vector space.
	- Orthogonal Vector
		- Two vectors are orthogonal if $x^Ty = 0$
		- Geometrically, this means they are at $90^{\circ}$ angle to each other
		- An n-dimensional space has a maximum of n mutually orthogonal vectors
	- Orthonormal Vector
		- A set of vectors is **orthonormal** if all vectors in the set are mutually orthogonal _and_ are all unit vectors.
		- The standard basis vectors are a perfect example of an orthonormal set.

### Matrix

A matrix is a 2-dimensional array of scalars. It can be thought of as a collection of vectors organized into rows and columns, similar to a 2D array or list of lists in Python.

_(Note: A matrix is typically denoted by an uppercase, bold, italic letter, such as X)_.
