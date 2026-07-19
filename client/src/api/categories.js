import api from './axios';

export async function listCategories() {
  const res = await api.get('/categories');
  return res.data.categories;
}

export async function createCategory(data) {
  const res = await api.post('/categories', data);
  return res.data.category;
}

export async function updateCategory(id, data) {
  const res = await api.put(`/categories/${id}`, data);
  return res.data.category;
}

export async function deleteCategory(id) {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
}
