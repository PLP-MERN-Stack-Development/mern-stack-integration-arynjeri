// src/utils/fileUpload.js
export const uploadImage = async (file) => {
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', 'YOUR_CLOUDINARY_PRESET'); // <-- change

  const res = await fetch(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, {
    method: 'POST',
    body: form,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || 'Upload failed');
  return data.secure_url;
};