const card = document.querySelector('.insertCardDiv');
const form = document.querySelector('#notesForm');
const error = document.querySelector('.error');

// date-fns

const getNotes = async () => {
  const response = await fetch('http://localhost:4000/api/notes');
  const data = await response.json();

  if (!response.ok) {
    error.innerHTML = 'Error Connecting to API';
  }

  if (response.ok) {
    data.forEach((item) => {
      const html = `
            <div class="card mx-2 my-2" style="width: 18rem">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.description}</p>
                <p>${new Date(item.createdAt).toDateString()}</p>
                <span class="material-symbols-outlined pointer delete-note" data-note-id=${
                  item._id
                }>delete</span>
              </div>
            </div>
      `;
      card.insertAdjacentHTML('beforeend', html);
    });
  }

  document.addEventListener('click', async (e) => {
    try {
      if (e.target.classList.contains('delete-note')) {
        const card = e.target.dataset.noteId;

        const response = await fetch(
          `http://localhost:4000/api/notes/${card}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          error.innerHTML = 'Deletion failed';
        }

        if (response.ok) {
          // Remove the deleted note from the DOM.
          e.target.closest('.card').remove();
        }
      }
    } catch (err) {
      error.innerHTML = 'Deletion failed';
    }
  });
};

getNotes();

const renderCreatedNote = (item) => {
  const html = `
            <div class="card mx-2 my-2" style="width: 18rem">
              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.description}</p>
                <p>${new Date(item.createdAt).toDateString()}</p>
                <span class="material-symbols-outlined pointer delete-note" data-note-id=${
                  item._id
                } >delete</span>
              </div>
            </div>
      `;
  card.insertAdjacentHTML('beforeend', html);
};

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;

  const note = { title, description };

  const response = await fetch('http://localhost:4000/api/notes', {
    method: 'POST',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const json = await response.json();

  if (!response.ok) {
    error.innerHTML = 'Error Adding New Document';
  }

  if (response.ok) {
    renderCreatedNote(json);
    // Clear the input fields
    document.querySelector('#title').value = '';
    document.querySelector('#description').value = '';
  }
});
