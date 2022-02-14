const createBlogForm = $('#create-blog-form');

const handleCreateBlog = async (event) => {
  event.preventDefault();

  const title = $('#title').val();
  const contents = $('#contents').val();

  const payload = JSON.stringify({
    title,
    contents,
  });

  const response = await fetch('/api/blogs', {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    window.location.replace('/dashboard');
  } else {
    alert('Failed to create blog');
  }
};

createBlogForm.on('submit', handleCreateBlog);
