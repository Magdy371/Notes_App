const noteForm = document.getElementById("noteForm");
const notesDiv = document.getElementById("notes");

async function fetchNotes() {
  const res = await fetch("/api");
  const notes = await res.json();
  notesDiv.innerHTML = notes
    .map(
      (note) => `
      <div class="note">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote('${note._id}')">Delete</button>
      </div>
    `
    )
    .join("");
}

noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  noteForm.reset();
  fetchNotes();
});

async function deleteNote(id) {
  await fetch(`/api/notes/${id}`, { method: "DELETE" });
  fetchNotes();
}

// Initial load
fetchNotes();
