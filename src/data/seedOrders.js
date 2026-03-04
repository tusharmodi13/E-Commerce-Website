export const seedOrders = [
  { id: 1001, customer: 'Alice Johnson', email: 'alice@example.com', items: 3, total: 149.97, status: 'Delivered', date: '2026-02-28' },
  { id: 1002, customer: 'Bob Smith', email: 'bob@example.com', items: 1, total: 59.99, status: 'Shipped', date: '2026-03-01' },
  { id: 1003, customer: 'Carol Davis', email: 'carol@example.com', items: 5, total: 234.50, status: 'Processing', date: '2026-03-02' },
  { id: 1004, customer: 'Dan Wilson', email: 'dan@example.com', items: 2, total: 89.98, status: 'Pending', date: '2026-03-03' },
  { id: 1005, customer: 'Eve Brown', email: 'eve@example.com', items: 4, total: 179.96, status: 'Delivered', date: '2026-02-25' },
  { id: 1006, customer: 'Frank Lee', email: 'frank@example.com', items: 1, total: 29.99, status: 'Cancelled', date: '2026-02-20' },
  { id: 1007, customer: 'Grace Kim', email: 'grace@example.com', items: 2, total: 119.98, status: 'Shipped', date: '2026-03-03' },
  { id: 1008, customer: 'Hank Miller', email: 'hank@example.com', items: 3, total: 199.97, status: 'Processing', date: '2026-03-04' },
];

export function getOrders() {
  const stored = localStorage.getItem('admin_orders');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('admin_orders', JSON.stringify(seedOrders));
  return seedOrders;
}

export function saveOrders(orders) {
  localStorage.setItem('admin_orders', JSON.stringify(orders));
}
