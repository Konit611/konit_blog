---
title: Statistics
date: 2025-06-22 16:48
excerpt: Statistical Test Grade 2 Content_Statistics
coverImage: 
categories:
  - statistics
tags:
  - Statistics
  - Grade-2
author: Geunil Park
featured: false
---
# Summary

There is a set of variable data with sample size n = 9.
Data that takes various numerical values is called variable data.

# One-Variable Data

## Representative Values
What is the value that best represents the data? → What is it in a word?
### Computational Statistics → Calculated using all data values
- Sum
- Mean ($sum(n) / n$)

### Order Statistics → Focus on the rank (order) of data
- Median → Exactly in the middle
	- For odd numbers, take the middle value as is
	- For even numbers, take the average of the two middle-ranked data points
	- Also known as the second quartile.
- Maximum value
- Minimum value
- **First Quartile (Q1)**
	- When data is arranged in ascending order and divided into four parts, it corresponds to the first boundary line from the smaller side
- **Third Quartile (Q3)**
	- When data is arranged in ascending order and divided into four parts, it corresponds to the third boundary line from the smaller side
	- The trick is to first divide the data in half, then divide it in half again → the middle value
	  (Include overlapping values anywhere)
	- There are several methods. We assume it's approximately around this area.
	- Pinpoint questions are not asked.

## Measures of Dispersion
### Computational Statistics
- Sum of Squared Deviations
	- Deviation refers to the difference from the mean
	- Square means raising to the power of 2.
	- It's the sum of squared deviations. Calculation is cumbersome
- Unbiased Variance
	- Sum of squared deviations divided by n-1 (dividing by n is called sample variance)
	- n-1 comes from the concept of degrees of freedom
- Standard Deviation (represents variation)
	- Square root of unbiased variance

### Order Statistics
- Range
	- Maximum value - Minimum value
- Interquartile Range (IQR)
	- Third quartile - First quartile

## Comprehensive
Combining representative values and measures of dispersion
- Coefficient of Variation - How large is the variation of the data relative to the mean
	- Standard deviation / Mean
- Standardized Score
	- Calculated by subtracting the mean from each data point and dividing by the standard deviation.
	- It's calculated so that the data has a mean of 0 and standard deviation of 1.

# Two-Variable Data → Represents relationships.
- Sum of Deviation Products
	- Sum of products (multiplication) of deviations
- Unbiased Covariance
	- Sum of deviation products divided by n-1
- Correlation Coefficient
	- Unbiased covariance / Product of standard deviations
- Regression Coefficient
	- Appears in linear models
	- (Standard deviation of dependent variable y / Standard deviation of independent variable x) * Correlation coefficient

# Exam Points
- Be able to calculate unbiased variance and unbiased covariance
- Think about what happens when data is multiplied by a constant
	- When multiplied by n:
		- Representative values
			- All become n times larger
		- Measures of dispersion
			- Deviation - n times
			- Squared deviation - n^2 times
			- Unbiased variance - n^2 times
			- Standard deviation - n times
			- Range - n times
			- Interquartile range - n times
		- Comprehensive
			- Coefficient of variation - 1 times (unchanged)
			- Standardized score - 1 times (unchanged)
		- Two-variable data
			- When multiplied by n and m respectively
			- Sum of deviation products - n x m times
			- Unbiased covariance - n x m times
			- Correlation coefficient - 1 times (unchanged)
			- Regression coefficient - m / n times 