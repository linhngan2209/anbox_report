
import React, { useState, useEffect } from 'react';

export default function ProductForm({ initial, onSave, onCancel }){
  const [form, setForm] = useState({
    name:'', category:'', price:'', stock:'', tags:'', image:''
  });

  useEffect(()=>{ if(initial) setForm(initial)}, [initial]);

  function handleChange(e){
    const {name, value} = e.target;
    setForm(s=>({ ...s, [name]: value }));
  }

  function handleFile(e){
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=> setForm(s=>({...s, image: reader.result}));
    reader.readAsDataURL(file);
  }

  function submit(e){
    e.preventDefault();
    // normalize tags: split by comma and trim
    const payload = { ...form, price: Number(form.price || 0), stock: Number(form.stock || 0) };
    if(typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map(t=>t.trim()).filter(Boolean);
    onSave(payload);
  }

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <label className="block">Tên sản phẩm
        <input name="name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded mt-1" />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">Loại
          <input name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="block">Giá
          <input name="price" value={form.price} onChange={handleChange} type="number" className="w-full p-2 border rounded mt-1" />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">Tồn kho
          <input name="stock" value={form.stock} onChange={handleChange} type="number" className="w-full p-2 border rounded mt-1" />
        </label>
        <label className="block">Thẻ (tags) - phân cách bởi dấu phẩy
          <input name="tags" value={Array.isArray(form.tags)?form.tags.join(', '):form.tags} onChange={handleChange} className="w-full p-2 border rounded mt-1" />
        </label>
      </div>
      <label className="block">Ảnh sản phẩm
        <input type="file" accept="image/*" onChange={handleFile} className="w-full mt-1" />
      </label>
      {form.image && <div className="mt-2"><img src={form.image} alt="preview" className="h-28 object-cover rounded" /></div>}
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Lưu</button>
        <button type="button" onClick={onCancel} className="px-3 py-1 border rounded">Hủy</button>
      </div>
    </form>
  )
}
