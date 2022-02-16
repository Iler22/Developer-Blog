const createBlogForm = $('#create-blog-form');
const commentBtn = $('#comment-btn');

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

const handleAddComment = async (event) => {
  event.preventDefault();

  const contents = $('#contents').val();

  const payload = JSON.stringify({
    contents,
  });

  const response = await fetch('/api/blogs/:id', {
    method: 'POST',
    body: payload,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    window.location.replace('/');
  } else {
    alert('Failed to add comment');
  }
};

commentBtn.on('click', handleAddComment);
createBlogForm.on('submit', handleCreateBlog);
