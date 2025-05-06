# Suits API Documentation

This document provides information about the available API endpoints for the Suits application.

## Table of Contents
- [Authentication](#authentication)
- [Blogs](#blogs)
- [Categories](#categories)
- [Contacts](#contacts)
- [FAQs](#faqs)
- [Practice](#practice)
- [Tags](#tags)
- [Banners](#banners)
- [Business](#business)
- [Carousel](#carousel)
- [Partners](#partners)
- [Quotes](#quotes)

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new admin user |
| POST | `/api/auth/login` | Login as admin |
| POST | `/api/auth/logout` | Logout admin |

## Blogs

Blog management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/blogs` | Get all blogs |
| POST | `/blogs` | Create a new blog |
| GET | `/blogs/latest` | Get latest blogs |
| GET | `/blogs/{slug}` | Get a blog by slug |
| PUT | `/blogs/{id}` | Update a blog |
| DELETE | `/blogs/{id}` | Delete a blog |

## Categories

Category management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/categories` | Get all categories |
| POST | `/categories` | Create a new category |
| PUT | `/categories/{id}` | Update a category |
| DELETE | `/categories/{id}` | Delete a category |

## Contacts

Contact management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contact` | Get all contacts |
| POST | `/api/contact` | Create a new contact message |
| PUT | `/api/contact/{id}` | Update a contact |
| DELETE | `/api/contact/{id}` | Delete a contact |

## FAQs

FAQ management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/faq` | Get all FAQs |
| POST | `/api/faq` | Create a new FAQ |
| PUT | `/api/faq/{id}` | Update a FAQ |
| DELETE | `/api/faq/{id}` | Delete a FAQ |

## Practice

Practice management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/practice` | Get all practice items |
| POST | `/practice` | Create a new practice item |
| GET | `/practice/{id}` | Get practice by ID |
| PUT | `/practice/{id}` | Update practice by ID |
| DELETE | `/practice/{id}` | Delete practice by ID |

## Tags

Tag management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tags` | Get all tags |
| POST | `/api/tags` | Create a new tag |
| PUT | `/api/tags/{id}` | Update a tag |
| DELETE | `/api/tags/{id}` | Delete a tag |

## Banners

Banner management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/banners` | Get all banner items |
| POST | `/api/banners` | Create a new banner item |
| PUT | `/api/banners/{id}` | Update a banner item |
| DELETE | `/api/banners/{id}` | Delete a banner item |

## Business

Business management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/business` | Get all businesses |
| POST | `/api/business` | Create a new business |
| PUT | `/api/business/{id}` | Update a business |
| DELETE | `/api/business/{id}` | Delete a business |

## Carousel

Carousel management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/carousel` | Get all carousel items |
| POST | `/api/carousel` | Create a new carousel item |
| PUT | `/api/carousel/{id}` | Update a carousel item |
| DELETE | `/api/carousel/{id}` | Delete a carousel item |

## Partners

Partner management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/partner` | Get all partners |
| POST | `/api/partner` | Create a new partner |
| GET | `/api/partner/{id}` | Get a partner by ID |
| PUT | `/api/partner/{id}` | Update a partner |
| DELETE | `/api/partner/{id}` | Delete a partner |

## Quotes

Quote carousel management endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quotes` | Get all quote carousel items |
| POST | `/api/quotes` | Create a new quote carousel item |
| PUT | `/api/quotes/{id}` | Update a quote carousel item |
| DELETE | `/api/quotes/{id}` | Delete a quote carousel item |
