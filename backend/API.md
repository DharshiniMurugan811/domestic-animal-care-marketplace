# API overview

## Public
- GET `/api/health`
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/animals`
- GET `/api/animals/:id`
- GET `/api/products`
- GET `/api/products/:id`
- GET `/api/reviews/:productId`
- POST `/api/ai/ask`

## Authenticated
- GET `/api/auth/me`
- PUT `/api/auth/profile`
- POST `/api/orders`
- GET `/api/orders/mine`
- POST `/api/reviews/:productId`
- POST `/api/inquiries`

## Admin
- GET `/api/admin/dashboard`
- GET `/api/admin/users`
- GET `/api/admin/inquiries`
- GET `/api/products/admin/all`
- POST/PUT/DELETE `/api/products`
- POST/PUT/DELETE `/api/animals`
- GET `/api/orders/admin/all`
- PUT `/api/orders/:id/status`
- GET `/api/reviews/admin/all`
- PUT `/api/reviews/admin/:id`
